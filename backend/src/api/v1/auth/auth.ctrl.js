import * as response from '../../../lib/http/response';
import * as  validation from '../../../lib/validateion';
import * as log from '../../../lib/log';
import * as tokenLib from '../../../lib/token';
import models from '../../../model';

/**
 * @description 로그인
 */
export const login = async (req, res) => {
  const { body } = req;

  const validateError = await validation.validateLogin(body);
  if (validateError) {
    log.yellow('[AUTH-LOGIN] 검증 오류.', validateError);
    response.BAD_REQUEST(res,
      '검증 오류.');
    return;
  }

  try {
    // 존재하는 회원인지 확인
    const user = await models.User.findOne({
      where: {
        id: body.id,
        pw: body.pw,
      },
    });

    if (!user) {
      log.yellow('[AUTH-LOGIN] 계정 없음.');
      response.UNAUTHORIZED(res,
        '계정 없음.');
      return;
    }

    const token = await tokenLib.createToken(body.id);
    const data = {
      'x-access-token': token,
    };

    log.green('[AUTH-LOGIN] 로그인 성공.');
    response.OK(res,
      '로그인 성공.',
      data);
  } catch (err) {
    log.red('[AUTH-LOGIN] 서버 오류.', err);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};

/**
 * @description 회원가입
 */
export const register = async (req, res) => {
  const { body } = req;

  const validateError = await validation.validateRegister(body);
  if (validateError) {
    log.yellow('[AUTH-REGISTER] 검증 오류.', validateError);
    response.BAD_REQUEST(res,
      '검증 오류.');
    return;
  }

  try {
    // 이미 존재하는 회원인지 확인
    const user = await models.User.findOne({
      where: {
        id: body.id
      }
    });

    if (user) {
      log.yellow('[AUTH-REGISTER] 이미 존재하는 회원.');
      response.CONFLICT(res,
        '이미 존재하는 회원.');
      return;
    }

    // 회원 생성
    await models.User.create(body);
    log.green('[AUTH-REGISTER] 회원가입 성공.');
    response.CREATED(res,
      '회원가입 성공.');
  } catch (err) {
    log.red('[AUTH-REGISTER] 회원가입 실패.', err);
    response.INTERNAL_SERVER_ERROR(res,
      '회원가입 실패.');
  }
};
