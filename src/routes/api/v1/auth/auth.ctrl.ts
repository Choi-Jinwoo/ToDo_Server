import { getRepository } from 'typeorm';
import { validateLogin } from '../../../../lib/validation/auth';
import logger from '../../../../lib/logger';
import User from '../../../../entities/User';
import { createToken } from '../../../../lib/token';

export const login = async (req, res) => {
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
