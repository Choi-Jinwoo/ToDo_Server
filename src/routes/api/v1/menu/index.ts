import { Router } from 'express';
import * as menuCtrl from './menu.ctrl';
import authMiddleware from '../../../../lib/middleware/auth';

const routes = Router();

routes.get('/', authMiddleware, menuCtrl.getMenus);
routes.post('/', authMiddleware, menuCtrl.createMenu);
routes.put('/:idx', authMiddleware, menuCtrl.modifyMenu);

export default routes;
