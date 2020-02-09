
import { Request, Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreateMenu } from '../../../../lib/validation/menu';
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

export const createMenu = async (req: AuthRequest, res: Response) => {
  if (!validateCreateMenu(req, res)) return;

  type RequestBody = {
    name: string;
  };
  const user: User = req.user;
  const { name }: RequestBody = req.body;

  try {
    const menuRepo = getRepository(Menu);
    const menu = new Menu();
    menu.name = name;
    menu.user_id = user.id;
    menuRepo.save(menu);

    logger.green('메뉴 생성 성공.');
    res.status(200).json({
      message: '메뉴 생성 성공',
    });
  } catch (err) {
    logger.red('메뉴 생성 서버 오류.');
    res.status(500).json({
      message: '서버 오류',
    });
  }
};
