import bcrypt from 'bcrypt';
import User from '../models/User';
import { AppError } from '../middleware/error.middleware';
import { generateToken, generateRefreshToken } from '../utils/jwt';
import { sendWelcomeEmail } from './email.service';

const validatePassword = (password: string): void => {
  if (!password || password.length < 8) {
    throw new AppError('Password must be at least 8 characters long', 400);
  }
};

export const register = async (email: string, password: string, name: string, phone?: string) => {
  validatePassword(password);

  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    passwordHash,
    name,
    phone
  });

  const token = generateToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  // Send welcome email (non-blocking)
  sendWelcomeEmail(user.email, user.name).catch(err => console.error('Email send error:', err));

  return {
    user: {
      id: user._id,
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
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    user: {
      id: user._id,
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
  const user = await User.findById(userId).select('-passwordHash');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    subscriptionTier: user.subscriptionTier,
    subscriptionExpiresAt: user.subscriptionExpiresAt,
    createdAt: user.createdAt
  };
};
