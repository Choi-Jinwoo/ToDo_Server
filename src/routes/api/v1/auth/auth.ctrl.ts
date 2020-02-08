import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateLogin, validateRegister } from '../../../../lib/validation/auth';
import logger from '../../../../lib/logger';
import User from '../../../../entities/User';
import { createToken } from '../../../../lib/token';

export const login = async (req: Request, res: Response) => {
  if (!validateLogin(req, res)) return;

  type RequestBody = {
    id: string;
    pw: string;
  };
  const { id, pw }: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        id,
        pw,
      },
    });

    if (!user) {
      logger.yellow('로그인 인증 실패.');
      res.status(401).json({
        message: '인증 실패.',
      });
      return;
    }

    const token = await createToken(id);
    res.status(200).json({
      message: '로그인 성공.',
      data: {
        'x-access-token': token,
      },
    });
  } catch (err) {
    logger.red('로그인 서버 오류.', err);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}

export const register = async (req: Request, res: Response) => {
  if (!validateRegister(req, res)) return;

  type RequestBody = {
    id: string;
    pw: string;
    name: string;
  }
  const data: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);
    const exist: User = await userRepo.findOne({
      where: {
        id: data.id,
      },
    });

    if (exist) {
      logger.yellow('이미 존재하는 회원.');
      res.status(409).json({
        message: '이미 존재하는 회원',
      });
      return;
    }

    await userRepo.save(data);
    logger.green('회원 가입 성공.');
    res.status(200).json({
      messages: '회원 가입 성공',
    });
  } catch (err) {
    logger.red('회원가입 서버 오류.', err.message);
    res.status(500).json({
      status: 500,
      messages: '서버 오류.',
    });
  }
};
