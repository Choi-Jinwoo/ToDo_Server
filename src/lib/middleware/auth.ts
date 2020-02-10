import { Response, NextFunction } from 'express';
import AuthRequest from '../../type/AuthRequest';
import { verifyToken } from '../token';
import logger from '../logger';
import User from '../../entity/User';
import { getRepository } from 'typeorm';

export default async (req: AuthRequest, res: Response, next: NextFunction) => {
  const reqToken: string | string[] = req.headers['x-access-token'];
  if (Array.isArray(reqToken)) {
    res.status(400).json({
      status: '배열 타입 토큰',
    });
    return;
  }

  const token = reqToken;
  try {
    const decoded = await verifyToken(token);

    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      res.status(404).json({
        message: '회원 없음',
      });
      return;
    }

    req.user = user;

    next();
  } catch (err) {
    switch (err.message) {
      case 'jwt must be provided':
        res.status(400).json({
          message: '토큰 없음',
        });
        return;
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        res.status(401).json({
          message: '토큰 위조',
        });
        return;
      case 'jwt expired':
        res.status(410).json({
          message: '토큰 만료',
        });
        return;
      default:
        logger.red('토큰 검증 서버 오류.', err.message);
        res.status(500).json({
          message: '서버 오류',
        });
    }
  }
};
