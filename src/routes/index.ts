import { Router } from 'express';
import api from './api';

const routes = Router();

routes.use(api);

export default routes;
