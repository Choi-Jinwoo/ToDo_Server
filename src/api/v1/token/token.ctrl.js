import * as response from '../../../lib/http/response';
import * as log from '../../../lib/log';
import * as tokenLib from '../../../lib/token';

/**
 * @description 토큰 검증
 */
export const validateToken = (req, res) => {
  const token = req["x-access-token"];

  try {
    tokenLib.verifyToken(token);

    log.green('[TOKEN] 토큰 검증 성공.');
    response.OK(res,
      '정상 토큰.');
  } catch (err) {
    log.yellow('[TOKEN] 비 정상 토큰.', err);
    response.BAD_REQUEST(res,
      err.message);
  }
}