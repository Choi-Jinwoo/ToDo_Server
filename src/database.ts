import {
  // eslint-disable-next-line no-unused-vars
  Connection,
  createConnection,
} from 'typeorm';
import logger from './lib/logger';

export const getConnection = async (): Promise<Connection> => {
  try {
    const connection = createConnection();
    return connection;
  } catch (err) {
    logger.red('[DB] Connection Error', err.message);
  }
};
