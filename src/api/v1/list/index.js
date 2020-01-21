import * as express from 'express'
import * as listCtrl from './list.ctrl';
import authMiddleware from '../../../middleware/auth';
const list = express.Router();

list.get('/check/:idx', authMiddleware, listCtrl.checkList);
list.get('/uncheck/:idx', authMiddleware, listCtrl.uncheckList);

list.get('/:idx', authMiddleware, listCtrl.getListByMenu);
list.post('/', authMiddleware, listCtrl.createList);
list.put('/:idx', authMiddleware, listCtrl.modifyList);
list.delete('/:idx', authMiddleware, listCtrl.deleteList);

export default list;
