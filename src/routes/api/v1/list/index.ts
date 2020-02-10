import { Router } from 'express';
import * as listCtrl from './list.ctrl';
import authMiddleware from '../../../../lib/middleware/auth';

const routes = Router();

routes.get('/check/:idx', authMiddleware, listCtrl.checkList);
routes.get('/uncheck/:idx', authMiddleware, listCtrl.uncheckList);

routes.get('/:idx', authMiddleware, listCtrl.getListByMenu);
routes.post('/', authMiddleware, listCtrl.createList);
routes.delete('/:idx', authMiddleware, listCtrl.deleteList);

export default routes;
