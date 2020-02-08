import tokenConfig from '../../config/token.json';
import jwt, { SignOptions } from 'jsonwebtoken';

const { secret, issuer } = tokenConfig;

export const createToken = async (id: string): Promise<string> => {
  const payload = {
    id,
  };

  const options: SignOptions = {
    issuer,
    expiresIn: '7d',
  }

  return jwt.sign(payload, secret, options);
}

export const verifyToken = async (token: string): Promise<any> => jwt.verify(token, secret); 
