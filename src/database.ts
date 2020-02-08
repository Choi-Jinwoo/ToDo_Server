import {
  Connection,
  createConnection,
} from 'typeorm';
import logger from './lib/logger';

export const getConnection = async (): Promise<Connection> => {
  try {
    const connection = createConnection();
    logger.green('[DB] connected');
    return connection;
  } catch (err) {
    logger.red('[DB] Connection Error', err.message);
  }
};
