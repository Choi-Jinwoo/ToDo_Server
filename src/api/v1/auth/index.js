import * as express from 'express'
import * as authCtrl from './auth.ctrl';
const auth = express.Router();

// 로그인 API
auth.post('/login', authCtrl.login);

// 회원가입 API
auth.post('/register', authCtrl.register);

export default auth;
