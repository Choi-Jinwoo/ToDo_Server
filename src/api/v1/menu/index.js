import * as express from 'express'
import * as menuCtrl from './menu.ctrl';
import authMiddleware from '../../../middleware/auth';
const menu = express.Router();

// 회원가입 API
menu.get('/', authMiddleware, menuCtrl.getMenus);
menu.post('/', authMiddleware, menuCtrl.createMenu);
menu.put('/:idx', authMiddleware, menuCtrl.modifyMenu);
menu.delete('/:idx', authMiddleware, menuCtrl.deleteMenu);

export default menu;
