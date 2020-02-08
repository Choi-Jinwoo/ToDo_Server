import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

export default app;
