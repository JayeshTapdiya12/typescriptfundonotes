import mongoose, { Schema, model } from 'mongoose';
import { INotes } from '../interfaces/notes.interface';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    isTrashed: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    label: [
      {
        type: String,
        required: false
      }
    ],
    collaborators: [
      {
        type: String,
        required: false
      }
    ],
    reminder: {
      type: Object,
      required: false
    }
  },
  {
    collection: 'notes',
    timestamps: true
  }
);
export default model<INotes>('Notes', notesSchema);
