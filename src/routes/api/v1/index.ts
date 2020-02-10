import { Router } from 'express';
import auth from './auth';
import menu from './menu';
import list from './list';

const routes = Router();

routes.use('/auth', auth);
routes.use('/menu', menu);
routes.use('/list', list);

export default routes;
