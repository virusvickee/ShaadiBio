import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBiodata extends Document {
  userId: Types.ObjectId;
  title: string;
  templateType: 'TRADITIONAL' | 'MODERN' | 'MINIMALIST';
  formData: Record<string, any>;
  customization: Record<string, any>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const biodataSchema = new Schema<IBiodata>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  templateType: { type: String, enum: ['TRADITIONAL', 'MODERN', 'MINIMALIST'], required: true },
  formData: { type: Schema.Types.Mixed, required: true, default: {} },
  customization: { type: Schema.Types.Mixed, default: {} },
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true
});

biodataSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IBiodata>('Biodata', biodataSchema);
