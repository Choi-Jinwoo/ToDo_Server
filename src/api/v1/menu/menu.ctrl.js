import * as response from '../../../lib/http/response';
import * as  validation from '../../../lib/validateion';
import * as log from '../../../lib/log';
import models from '../../../model';

/**
 * @description 본인 메뉴 조회
 */
export const getMenus = async (req, res) => {
  const { user } = req;

  try {
    const menus = await models.Menu.findAll({
      where: {
        userId: user.id,
      },
    });

    const data = {
      menus,
    };

    log.green('[MENU-GET] 본인 메뉴 조회 성공.')
    response.OK(res,
      '본인 메뉴 조회 성공.',
      data);
  } catch (error) {
    log.red('[MENU-GET] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};

/**
 * @description 메뉴 생성
 */
export const createMenu = async (req, res) => {
  const { user, body } = req;

  const validateError = await validation.validateMenu(body);

  if (validateError) {
    log.yellow('[MENU-CREATE] 검증 오류.', validateError);
    response.BAD_REQUEST(res,
      '검증 오류.');
    return;
  }

  try {
    body.userId = user.id;
    await models.Menu.create(body);

    log.green('[MENU-CREATE] 메뉴 생성 성공.')
    response.CREATED(res,
      '메뉴 생성 성공.');
  } catch (error) {
    log.red('[MENU-CREATE] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};

/**
 * @description 메뉴 수정
 */
export const modifyMenu = async (req, res) => {
  const { user, body } = req;
  const { idx } = req.params;

  const validateError = await validation.validateMenu(body);
  if (validateError) {
    log.yellow('[MENU-CREATE] 검증 오류.', validateError);
    response.BAD_REQUEST(res,
      '검증 오류.');
    return;
  }

  try {
    const menu = await models.Menu.findOne({
      where: {
        idx,
        userId: user.id,
      },
    });

    if (!menu) {
      log.yellow('[MENU-MODIFY] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    await models.Menu.update(body, {
      where: {
        idx,
      },
    });

    log.green('[MENU-MODIFY] 메뉴 수정 성공.')
    response.OK(res,
      '메뉴 수정 성공.');
  } catch (error) {
    log.red('[MENU-MODIFY] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};

/**
 * 메뉴 삭제
 */
export const deleteMenu = async (req, res) => {
  const { user } = req;
  const { idx } = req.params;

  try {
    const menu = await models.Menu.findOne({
      where: {
        idx,
        userId: user.id,
      },
    });

    if (!menu) {
      log.yellow('[MENU-DELETE] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    await models.Menu.destroy({
      where: {
        idx,
      },
    });

    log.green('[MENU-DELETE] 메뉴 삭제 성공.')
    response.OK(res,
      '메뉴 삭제 성공.');
  } catch (error) {
    log.red('[MENU-DELETE] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};