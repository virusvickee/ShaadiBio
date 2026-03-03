import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPhoto extends Document {
  biodataId: Types.ObjectId;
  url: string;
  cropData?: Record<string, any>;
  fileSize: number;
  uploadedAt: Date;
}

const photoSchema = new Schema<IPhoto>({
  biodataId: { type: Schema.Types.ObjectId, ref: 'Biodata', required: true },
  url: { type: String, required: true },
  cropData: { type: Schema.Types.Mixed },
  fileSize: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now }
}, {
  timestamps: false
});

photoSchema.index({ biodataId: 1 });

export default mongoose.model<IPhoto>('Photo', photoSchema);
