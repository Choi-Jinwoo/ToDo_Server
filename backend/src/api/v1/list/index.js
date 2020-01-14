import * as express from 'express'
import * as listCtrl from './list.ctrl';
import authMiddleware from '../../../middleware/auth';
const list = express.Router();

list.get('/:idx', authMiddleware, listCtrl.getListByMenu);
list.post('/', authMiddleware, listCtrl.createList);
list.put('/:idx', authMiddleware, listCtrl.modifyList);
list.delete('/:idx', authMiddleware, listCtrl.deleteList);

export default list;
