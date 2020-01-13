import models from '../model';
import * as log from '../lib/log';
import * as tokenLib from '../lib/token';
import * as response from '../lib/http/response';

export default async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    response.BAD_REQUEST(res,
      '토큰이 전송되지 않았습니다.');
    return;
  }

  try {
    const decoded = await tokenLib.verifyToken(token);

    // sub가 token이 아닐경우
    if (decoded.sub !== 'token') {
      response.UNAUTHORIZED(res,
        '잘못된 토큰입니다.');
      return;
    }

    // 토큰에 해당하는 회원이 없을 경우
    const member = await models.Member.getMember(decoded.id);
    if (!member) {
      response.NOT_FOUND(res,
        '회원이 존재하지 않습니다.');
      return;
    }

    req.member = member;

    if (!next) {
      return;
    }
    next();
  } catch (err) {
    switch (err.message) {
      case 'jwt must be provided':
        response.BAD_REQUEST(res,
          '토큰이 전송되지 않았습니다.');
        return;
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        response.UNAUTHORIZED(res,
          '위조된 토큰입니다.');
        return;
      case 'jwt expired':
        response.GONE(res,
          '토큰이 만료되었습니다.');
        return;
      default:
        log.red(err.message);
        response.INTERNAL_SERVER_ERROR(res,
          '토큰 검증에 실패하였습니다.');
    }
  }
};
