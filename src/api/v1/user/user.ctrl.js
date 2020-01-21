import * as response from '../../../lib/http/response';
import * as log from '../../../lib/log';
import models from '../../../model';

/**
 * @description 본인 정보 조회
 */
export const getUserByToken = async (req, res) => {
  const { user } = req;

  try {
    const userData = await models.User.findOne({
      attributes: [
        'id',
        'name',
      ],
      where: {
        id: user.id,
      },
    });

    const data = {
      user: userData,
    };

    log.green('[USER-GET] 본인 정보 조회 성공.')
    response.OK(res,
      '본인 정보 조회 성공.',
      data);
  } catch (error) {
    log.red('[USER-GET] 서버 오류.', error);
    response.INTERNAL_SERVER_ERROR(res,
      '서버 오류.');
  }
};
