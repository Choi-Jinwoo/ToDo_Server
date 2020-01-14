import * as express from 'express'
const api = express.Router();

import v1 from './v1'

api.use('/v1', v1);

export default api;
