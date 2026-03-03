import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPayment extends Document {
  userId: Types.ObjectId;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentGatewayId?: string;
  planType: 'PREMIUM' | 'CUSTOM';
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'], default: 'PENDING' },
  paymentGatewayId: { type: String, unique: true, sparse: true },
  planType: { type: String, enum: ['PREMIUM', 'CUSTOM'], required: true }
}, {
  timestamps: true
});

paymentSchema.index({ userId: 1 });
paymentSchema.index({ paymentGatewayId: 1 });

export default mongoose.model<IPayment>('Payment', paymentSchema);
