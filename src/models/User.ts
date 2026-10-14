import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserPersona } from '@/types/governance';

export type UserDocument = UserPersona & Document;

const UserSchema = new Schema<UserDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['Data Scientist', 'Compliance Officer', 'MLOps Engineer', 'Auditor'],
      required: true,
    },
    department: String,
    avatar: String,
    email: String,
  },
  { timestamps: true }
);

const User: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', UserSchema, 'users');

export default User;
