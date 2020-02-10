import { Router } from 'express';
import * as listCtrl from './list.ctrl';
import authMiddleware from '../../../../lib/middleware/auth';

const routes = Router();

routes.get('/:idx', authMiddleware, listCtrl.getListByMenu);
routes.post('/', authMiddleware, listCtrl.createList);
routes.delete('/:idx', authMiddleware, listCtrl.deleteList);

export default routes;
