import { Router } from 'express';
import auth from './auth';
import menu from './menu';

const routes = Router();

routes.use('/auth', auth);
routes.use('/menu', menu);

export default routes;
