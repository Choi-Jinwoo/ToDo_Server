import * as express from 'express'
const v1 = express.Router();

import auth from './auth'
import menu from './menu'
import list from './list'
import user from './user';

v1.use('/auth', auth);
v1.use('/menu', menu);
v1.use('/list', list);
v1.use('/list', list);
v1.use('/user', user);

export default v1;
