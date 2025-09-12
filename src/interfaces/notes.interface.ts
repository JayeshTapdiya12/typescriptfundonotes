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

export interface INotesSuccess {
  code: number;
  message: string;
  success: boolean;
  data: object;
}

export interface INoteNotFound {
  code: number;
  message: string;
  success: boolean;
}

export interface INoteError {
  code: number;
  message: string;
  success: boolean;
  error: string;
}
