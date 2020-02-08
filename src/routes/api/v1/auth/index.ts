import { Router } from 'express';
import * as authCtrl from './auth.ctrl';

const routes = Router();

routes.post('/login', authCtrl.login);
routes.post('/register', authCtrl.register);

export default routes;
