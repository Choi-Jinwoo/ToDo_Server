import * as response from '../../../lib/http/response';
import * as  validation from '../../../lib/validateion';
import * as log from '../../../lib/log';
import models from '../../../model';

/**
 * @description 메뉴별 목록 조회
 */
export const getListByMenu = async (req, res) => {
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
      log.yellow('[LIST-GET] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    const lists = await models.List.findAll({
      where: {
        menuIdx: idx,
      },
    });

    const data = {
      lists,
    };

    log.green('[LIST-GET] 메뉴별 목록 조회 성공.')
    response.OK(res,
      '메뉴별 목록 조회 성공.',
      data);
  } catch (error) {
    log.red('[LIST-GET] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};

/**
 * @description 목록 생성
 */
export const createList = async (req, res) => {
  const { user, body } = req;

  const validateError = await validation.validateList(body);
  if (validateError) {
    log.yellow('[LIST-CREATE] 검증 오류.', validateError);
    response.BAD_REQUEST(res,
      '검증 오류.');
    return;
  }

  try {
    const menu = await models.Menu.findOne({
      where: {
        idx: body.menu_idx,
        userId: user.id,
      }
    });

    if (!menu) {
      log.yellow('[LIST-CREATE] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    const data = {
      userId: user.id,
      content: body.content,
      menuIdx: body.menu_idx,
    };

    const list = await models.List.create(data);
    const resData = {
      list,
    };

    log.green('[LIST-CREATE] 목록 생성 성공.')
    response.OK(res,
      '목록 생성 성공.',
      resData,
    );
  } catch (error) {
    log.red('[LIST-CREATE] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};

/**
 * @description 목록 수정
 */
export const modifyList = async (req, res) => {
  const { user, body } = req;
  const { idx } = req.params;
  const validateError = await validation.validateListModify(body);
  if (validateError) {
    log.yellow('[LIST-MODIFY] 검증 오류.', validateError);
    response.BAD_REQUEST(res,
      '검증 오류.');
    return;
  }

  try {
    const list = await models.List.findOne({
      where: {
        idx,
      },
    });

    if (!list) {
      log.yellow('[LIST-MODIFY] 없는 목록.');
      response.NOT_FOUND(res,
        '없는 목록.');
      return;
    }

    const listMenu = await models.Menu.findOne({
      where: {
        idx: list.menuIdx,
        userId: user.id,
      }
    });

    if (!listMenu) {
      log.yellow('[LIST-MODIFY] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    if (body.hasOwnProperty('menu_idx')) {
      const menu = await models.Menu.findOne({
        where: {
          idx: body.menu_idx,
          userId: user.id,
        }
      });

      if (!menu) {
        log.yellow('[LIST-MODIFY] 없는 메뉴.');
        response.NOT_FOUND(res,
          '없는 메뉴.');
        return;
      }

      body.menuIdx = body.menu_idx;
      delete body.menu_idx;
    }

    await models.List.update(body, {
      where: {
        idx,
      }
    });

    log.green('[LIST-MODIFY] 목록 수정 성공.')
    response.OK(res,
      '목록 수정 성공.');
  } catch (error) {
    log.red('[LIST-MODIFY] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
}

export const deleteList = async (req, res) => {
  const { user } = req;
  const { idx } = req.params;

  try {
    const list = await models.List.findOne({
      where: {
        idx,
      },
    });

    if (!list) {
      log.yellow('[LIST-DELETE] 없는 목록.');
      response.NOT_FOUND(res,
        '없는 목록.');
      return;
    }

    const listMenu = await models.Menu.findOne({
      where: {
        idx: list.menuIdx,
        userId: user.id,
      }
    });

    if (!listMenu) {
      log.yellow('[LIST-DELETE] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    await models.List.destroy({
      where: {
        idx,
      },
    });

    log.green('[LIST-DELETE] 목록 삭제 성공.');
    response.OK(res,
      '목록 삭제 성공.');
  } catch (err) {
    log.red('[LIST-DELETE] 서버 오류.', err);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
}

/**
 * @description 목록 확인
 */
export const checkList = async (req, res) => {
  const { user } = req;
  const { idx } = req.params;

  try {
    const list = await models.List.findOne({
      where: {
        idx,
      },
    });

    if (!list) {
      log.yellow('[LIST-DELETE] 없는 목록.');
      response.NOT_FOUND(res,
        '없는 목록.');
      return;
    }

    const listMenu = await models.Menu.findOne({
      where: {
        idx: list.menuIdx,
        userId: user.id,
      }
    });

    if (!listMenu) {
      log.yellow('[LIST-DELETE] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    await models.List.update({
      isChecked: true,
    }, {
      where: {
        idx,
      },
    });

    log.green('[LIST-CHECK] 목록 확인 성공.');
    response.OK(res,
      '목록 확인 성공.');
  } catch (err) {
    log.red('[LIST-CHECK] 서버 오류.', err);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
}

export const uncheckList = async (req, res) => {
  const { user } = req;
  const { idx } = req.params;

  try {
    const list = await models.List.findOne({
      where: {
        idx,
      },
    });

    if (!list) {
      log.yellow('[LIST-DELETE] 없는 목록.');
      response.NOT_FOUND(res,
        '없는 목록.');
      return;
    }

    const listMenu = await models.Menu.findOne({
      where: {
        idx: list.menuIdx,
        userId: user.id,
      }
    });

    if (!listMenu) {
      log.yellow('[LIST-DELETE] 없는 메뉴.');
      response.NOT_FOUND(res,
        '없는 메뉴.');
      return;
    }

    await models.List.update({
      isChecked: false,
    }, {
      where: {
        idx,
      },
    });

    log.green('[LIST-CHECK] 목록 확인 취소 성공.');
    response.OK(res,
      '목록 확인 취소 성공.');
  } catch (err) {
    log.red('[LIST-CHECK] 서버 오류.', err);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
}