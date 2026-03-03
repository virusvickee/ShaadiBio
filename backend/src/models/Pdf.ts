import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPdf extends Document {
  biodataId: Types.ObjectId;
  url: string;
  hasWatermark: boolean;
  downloadCount: number;
  generatedAt: Date;
}

const pdfSchema = new Schema<IPdf>({
  biodataId: { type: Schema.Types.ObjectId, ref: 'Biodata', required: true },
  url: { type: String, required: true },
  hasWatermark: { type: Boolean, default: true },
  downloadCount: { type: Number, default: 0 },
  generatedAt: { type: Date, default: Date.now }
}, {
  timestamps: false
});

pdfSchema.index({ biodataId: 1 });

export default mongoose.model<IPdf>('Pdf', pdfSchema);
