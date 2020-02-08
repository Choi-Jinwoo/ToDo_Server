import { Router } from 'express';
import * as menuCtrl from './menu.ctrl';
import authMiddleware from '../../../../lib/middleware/auth';

const routes = Router();

routes.post('/', authMiddleware, menuCtrl.getMenus);

export default routes;
