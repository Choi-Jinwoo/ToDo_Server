require('dotenv');
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';

import * as log from './lib/log';
import api from './api';

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api);

app.listen(PORT || 3000, () => {
  log.green(`Server is running at PORT ${PORT}`);
});
