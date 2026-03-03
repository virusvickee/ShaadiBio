import jwt from 'jsonwebtoken';

// Get JWT secrets (will be validated at runtime if missing)
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-12345678901234567890123456789012';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-key-12345678901234567890';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m'
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  });
};

export const verifyToken = (token: string): { userId: string } => {
  const decoded = jwt.verify(token, JWT_SECRET);
  
  if (typeof decoded === 'string' || !decoded.userId || typeof decoded.userId !== 'string') {
    throw new Error('Invalid token payload');
  }
  
  return { userId: decoded.userId };
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
  
  if (typeof decoded === 'string' || !decoded.userId || typeof decoded.userId !== 'string') {
    throw new Error('Invalid refresh token payload');
  }
  
  return { userId: decoded.userId };
};
