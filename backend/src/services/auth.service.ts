import bcrypt from 'bcrypt';
import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { generateToken, generateRefreshToken } from '../utils/jwt';

export const register = async (email: string, password: string, name: string, phone?: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      phone
    }
  });

  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      subscriptionTier: user.subscriptionTier
    },
    token,
    refreshToken
  };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      subscriptionTier: user.subscriptionTier
    },
    token,
    refreshToken
  };
};

export const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      subscriptionTier: true,
      subscriptionExpiresAt: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};
