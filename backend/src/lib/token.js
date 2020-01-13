import jwt from 'jsonwebtoken'
import * as config from '../../config/config.json';

const JWT_SECRET = config.JWT.SECRET;

export const createToken = async (id) => {
  const payload = {
    id,
  };

  const options = {
    expiresIn: '12h',
    issuer: 'JINwOO',
    subject: 'token',
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = async (token) => jwt.verify(token, JWT_SECRET);
