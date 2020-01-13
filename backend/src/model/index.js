import Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import * as config from '../../config/config.json';
import * as log from '../lib/log';

const DB_ENV = config.DB;
const sequelize = new Sequelize(DB_ENV.DB_NAME, DB_ENV.USER, DB_ENV.PASSWORD, {
  host: DB_ENV.HOST,
  dialect: 'mysql',
  logging: false,

  define: {
    timestamps: false,
  },
});

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const extName = path.extname(path.join(__dirname, file));
    const baseName = path.basename(path.join(__dirname, file), extName);
    const model = sequelize.import(path.join(__dirname, file));
    models[baseName] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize.sync().then(() => {
  log.green('[Model] DB sync');
}).catch((err) => {
  log.red('[Model] DB sync error', err);
});

export default models;
