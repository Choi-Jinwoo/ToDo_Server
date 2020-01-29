import * as express from 'express'
import * as menuCtrl from './menu.ctrl';
import authMiddleware from '../../../middleware/auth';
const menu = express.Router();

menu.get('/', authMiddleware, menuCtrl.getMenus);
menu.post('/', authMiddleware, menuCtrl.createMenu);
menu.put('/:idx', authMiddleware, menuCtrl.modifyMenu);
menu.delete('/:idx', authMiddleware, menuCtrl.deleteMenu);

export default menu;
