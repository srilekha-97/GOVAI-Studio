import mongoose, { Schema, Model, Document } from 'mongoose';
import { AuditLogEntry } from '@/types/governance';

export type AuditLogDocument = AuditLogEntry & Document;

const AuditLogSchema = new Schema<AuditLogDocument>(
  {
    id: { type: String, required: true, unique: true },
    timestamp: { type: String, required: true },
    userRole: {
      type: String,
      enum: ['Data Scientist', 'Compliance Officer', 'MLOps Engineer', 'Auditor'],
      required: true,
    },
    userName: { type: String, required: true },
    action: {
      type: String,
      enum: [
        'Model Registered',
        'Version Activated',
        'Submitted for Review',
        'Model Approved',
        'Model Rejected',
        'Performance Check',
        'Fairness Calibrated',
        'Compliance Updated',
        'User Login',
      ],
      required: true,
    },
    modelName: String,
    version: String,
    details: String,
  },
  { timestamps: true }
);

const AuditLog: Model<AuditLogDocument> =
  (mongoose.models.AuditLog as Model<AuditLogDocument>) ||
  mongoose.model<AuditLogDocument>('AuditLog', AuditLogSchema, 'auditlogs');

export default AuditLog;
