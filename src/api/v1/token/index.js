import * as express from 'express'
import * as tokenCtrl from './token.ctrl';
const token = express.Router();

// 토큰 검증 API
token.get('/', tokenCtrl.validateToken);

export default token;
