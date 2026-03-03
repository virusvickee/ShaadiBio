import jwt from 'jsonwebtoken';

// Validate JWT secrets at module load
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be set in environment variables');
}

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
