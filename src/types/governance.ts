export type RiskLevel = 'High Risk' | 'Moderate Risk' | 'Low Risk';

export type ModelStatus = 
  | 'Draft' 
  | 'Under Review' 
  | 'Approved' 
  | 'Deployed (Active)' 
  | 'Rejected' 
  | 'Archived';

export type UserRole = 
  | 'Data Scientist' 
  | 'Compliance Officer' 
  | 'MLOps Engineer' 
  | 'Auditor';

export interface UserPersona {
  id: string;
  role: UserRole;
  name: string;
  department: string;
  avatar: string;
  email: string;
}

export interface ModelVersion {
  id: string;
  version: string;
  releaseDate: string;
  author: string;
  isActive: boolean;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latencyMs: number;
  errorRatePercent: number;
  disparateImpactRatio: number;
  changesSummary: string;
  datasetName: string;
  datasetSize: string;
  framework: string;
}

export interface ApprovalRecord {
  id: string;
  modelId: string;
  version: string;
  submittedBy: string;
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  reviewComments?: string;
  targetDeploymentEnv: 'Production' | 'Staging';
}

export interface DemographicSlice {
  groupName: string;
  subGroup: string;
  sampleSize: number;
  positiveRate: number;
  disparateImpactRatio: number;
  isBiasConcern: boolean;
}

export interface ComplianceCheckItem {
  id: string;
  title: string;
  category: 'Data Governance' | 'Transparency' | 'Human Oversight' | 'Security';
  description: string;
  isCompliant: boolean;
  notes: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userRole: UserRole;
  userName: string;
  action: 
    | 'Model Registered' 
    | 'Version Activated' 
    | 'Submitted for Review' 
    | 'Model Approved' 
    | 'Model Rejected' 
    | 'Performance Check' 
    | 'Fairness Calibrated' 
    | 'Compliance Updated'
    | 'User Login';
  modelName: string;
  version: string;
  details: string;
}

export interface RegisteredModel {
  id: string;
  name: string;
  category: string;
  description: string;
  owner: string;
  createdDate: string;
  lastUpdated: string;
  framework: string;
  datasetName: string;
  datasetSize: string;
  intendedUse: string;
  riskLevel: RiskLevel;
  
  // Active Version & Version History
  activeVersion: string;
  versions: ModelVersion[];
  
  // Performance
  baselineAccuracy: number;
  currentAccuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latencyMs: number;
  errorRatePercent: number;
  throughputRps: number;
  isDegraded: boolean;
  degradationReason?: string;
  performanceHistory: Array<{ timestamp: string; accuracy: number; latencyMs: number; errorRate: number }>;
  
  // Fairness
  disparateImpactRatio: number;
  demographicParityDelta: number;
  fairnessStatus: 'Fairness Passed' | 'Bias Concern Detected';
  protectedSlices: DemographicSlice[];
  
  // Approval Workflow
  currentApprovalStatus: 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
  approvalHistory: ApprovalRecord[];
  
  // Compliance
  complianceItems: ComplianceCheckItem[];
  compliancePercentage: number;
}
