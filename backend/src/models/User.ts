import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  subscriptionTier: 'FREE' | 'PREMIUM' | 'CUSTOM';
  subscriptionExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  subscriptionTier: { type: String, enum: ['FREE', 'PREMIUM', 'CUSTOM'], default: 'FREE' },
  subscriptionExpiresAt: { type: Date }
}, {
  timestamps: true
});

userSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', userSchema);
