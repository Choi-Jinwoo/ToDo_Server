import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
// import { validateCreateList } from '../../../../lib/validation/list';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Menu from '../../../../entity/Menu';
import List from '../../../../entity/List';

export const getListByMenu = async (req: AuthRequest, res: Response) => {
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
        user_id: user.id,
      },
    });

    if (!menu) {
      logger.yellow('없는 메뉴.');
      res.status(404).json({
        message: '없는 메뉴',
      });
      return;
    }

    const listRepo = getRepository(List);
    const lists: List[] = await listRepo.find({
      where: {
        menu_idx: idx,
      },
    });

    logger.green('메뉴별 목록 조회 성공.');
    res.status(200).json({
      message: '메뉴별 목록 조회 성공',
      data: {
        lists,
      },
    });
  } catch (err) {
    logger.red('목록 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류',
    });
  }
};
