import * as express from 'express'
import * as userCtrl from './user.ctrl';
import authMiddleware from '../../../middleware/auth';
const user = express.Router();

// 본인 정보 확인 API
user.get('/', authMiddleware, userCtrl.getUserByToken);

export default user;
