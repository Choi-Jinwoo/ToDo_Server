/**
 * @description Http Response 생성
 * @author 최진우 <dgsw@kakao.com>
 */
export default (res, status, message, data) => {
  if (data === null) {
    res.status(status).json({
      status,
      message,
    });
  } else {
    res.status(status).json({
      status,
      message,
      data,
    });
  }
};
