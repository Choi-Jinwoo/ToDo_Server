import { Router } from 'express';
import * as authCtrl from './auth.ctrl';

const routes = Router();

routes.post('/login', authCtrl.login);

export default routes;
