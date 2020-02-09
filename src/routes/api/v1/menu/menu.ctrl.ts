
import { Request, Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreateMenu, validateModifyMenu } from '../../../../lib/validation/menu';
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

export const modifyMenu = async (req: AuthRequest, res: Response) => {
  if (!validateModifyMenu(req, res)) return;

  type RequestBody = {
    name: string;
  };
  const user: User = req.user;
  const idx: number = Number(req.params.idx);
  const { name }: RequestBody = req.body;

  if (isNaN(idx)) {
    logger.yellow('검증 오류.', 'idx is NaN');
    res.status(400).json({
      message: '검증 오류',
    });
    return;
  }

  try {
    const menuRepo = getRepository(Menu);
    const menu: Menu = await menuRepo.findOne({
      where: {
        idx,
        user_id: user.id
      }
    });

    if (!menu) {
      logger.yellow('메뉴 없음.');
      res.status(404).json({
        message: '메뉴 없음',
      });
      return;
    }

    if (menu.user_id !== user.id) {
      logger.yellow('권한 없음')
      res.status(403).json({
        message: '권한 없음',
      });
    }

    menu.name = name;
    menuRepo.save(menu);
    logger.green('메뉴 수정 성공.');
    res.status(200).json({
      message: '메뉴 수정 성공.',
    });
  } catch (err) {
    logger.red('메뉴 수정 서버 오류.', err);
    res.status(500).json({
      messages: '서버 오류.',
    });
  }
};

export const deleteMenu = async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow('검증 오류.', 'idx is NaN');
    res.status(400).json({
      message: '검증 오류',
    });
    return;
  }

  try {
    const menuRepo = getRepository(Menu);
    const menu: Menu = await menuRepo.findOne({
      where: {
        idx,
      }
    });

    if (!menu) {
      logger.yellow('메뉴 없음.');
      res.status(404).json({
        message: '메뉴 없음'
      });
      return;
    }

    if (menu.user_id !== user.id) {
      logger.yellow('권한 없음.');
      res.status(403).json({
        message: '권한 없음',
      });
      return;
    }

    await menuRepo.delete(menu);
    logger.green('메뉴 삭제 성공.');
    res.status(200).json({
      message: '메뉴 삭제 성공',
    });
  } catch (err) {
    logger.red('메뉴 삭제 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류',
    });
  }
};
