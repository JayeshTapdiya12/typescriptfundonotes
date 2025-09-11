import mongoose, { Document } from 'mongoose';

export interface INotes extends Document {
  title?: string;
  description?: string;
  color?: string;
  isArchived: boolean;
  isTrashed: boolean;
  createdBy: mongoose.Types.ObjectId;
  label?: string[];
  collaborators?: string[];
  reminder?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
