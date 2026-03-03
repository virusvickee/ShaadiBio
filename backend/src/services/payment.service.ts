import Razorpay from 'razorpay';
import Payment from '../models/Payment';
import User from '../models/User';
import { AppError } from '../middleware/error.middleware';
import { sendPaymentSuccessEmail } from './email.service';

const razorpay = process.env.RAZORPAY_KEY_ID ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
}) : null;

const PLAN_PRICES = {
  PREMIUM: 99900, // ₹999 in paise
  CUSTOM: 299900   // ₹2999 in paise
};

export const createPaymentOrder = async (
  userId: string,
  planType: 'PREMIUM' | 'CUSTOM'
) => {
  if (!razorpay) {
    throw new AppError('Payment gateway not configured', 500);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const amount = PLAN_PRICES[planType];

  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: `order_${userId}_${Date.now()}`,
    notes: {
      userId,
      planType
    }
  });

  // Save payment record
  const payment = await Payment.create({
    userId,
    amount: amount / 100,
    currency: 'INR',
    status: 'PENDING',
    planType
  });

  return {
    orderId: order.id,
    amount,
    currency: 'INR',
    paymentId: payment._id,
    keyId: process.env.RAZORPAY_KEY_ID
  };
};

export const verifyPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
) => {
  if (!razorpay) {
    throw new AppError('Payment gateway not configured', 500);
  }

  const crypto = require('crypto');
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== signature) {
    throw new AppError('Invalid payment signature', 400);
  }

  // Update payment status
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  payment.status = 'COMPLETED';
  payment.paymentGatewayId = paymentId;
  await payment.save();

  // Update user subscription
  const user = await User.findById(payment.userId);
  if (user) {
    user.subscriptionTier = payment.planType;
    user.subscriptionExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
    await user.save();

    // Send success email
    await sendPaymentSuccessEmail(user.email, user.name, payment.planType);
  }

  return payment;
};

export const getPaymentHistory = async (userId: string) => {
  return await Payment.find({ userId }).sort({ createdAt: -1 });
};
