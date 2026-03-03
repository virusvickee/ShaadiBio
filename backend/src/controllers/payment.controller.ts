import { Response, NextFunction } from 'express';
import * as paymentService from '../services/payment.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const createPaymentOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { planType } = req.body;

    if (!planType || !['PREMIUM', 'CUSTOM'].includes(planType)) {
      return res.status(400).json({ message: 'Invalid planType' });
    }

    const order = await paymentService.createPaymentOrder(req.userId, planType);

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { paymentId, orderId, signature } = req.body;

    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    const payment = await paymentService.verifyPayment(paymentId, orderId, signature);

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const payments = await paymentService.getPaymentHistory(req.userId);

    res.json({
      success: true,
      data: payments
    });
  } catch (error) {
    next(error);
  }
};
