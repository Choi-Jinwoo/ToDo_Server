
import { Request, Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
// import { validateLogin, validateRegister } from '../../../../lib/validation/menu';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Menu from '../../../../entity/Menu';

export const getMenus = async (req: AuthRequest, res: Response) => {
  const user: User = req.user;

  const menuRepo = getRepository(Menu);
  try {
    const menus: Menu[] = await menuRepo.find({
      where: {
        user_id: user.id,
      },
    });

    menus.forEach((e: Menu) => {
      delete e.user;
    });

    logger.green('메뉴 조회 성공.');
    res.status(200).json({
      message: '메뉴 조회 성공',
      data: {
        menus,
      },
    });
  } catch (err) {
    logger.red('메뉴 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류',
    });
  }
}
