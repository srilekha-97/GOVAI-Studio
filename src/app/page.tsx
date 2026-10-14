'use client';

import React, { useState } from 'react';
import { GovernanceProvider, useGovernance } from '@/lib/store';
import { Header } from '@/components/Header';
import { Navigation, CleanTabId } from '@/components/Navigation';
import { LoginModal } from '@/components/LoginModal';
import { ModelRegistryTab } from '@/components/tabs/ModelRegistryTab';
import { VersionControlTab } from '@/components/tabs/VersionControlTab';
import { VersionComparisonTab } from '@/components/tabs/VersionComparisonTab';
import { ApprovalManagementTab } from '@/components/tabs/ApprovalManagementTab';
import { PerformanceMonitoringTab } from '@/components/tabs/PerformanceMonitoringTab';
import { FairnessAssessmentTab } from '@/components/tabs/FairnessAssessmentTab';
import { ComplianceManagementTab } from '@/components/tabs/ComplianceManagementTab';
import { AuditManagementTab } from '@/components/tabs/AuditManagementTab';
import { ShieldCheck } from 'lucide-react';

function DashboardContent() {
  const { isAuthenticated } = useGovernance();
  const [activeTab, setActiveTab] = useState<CleanTabId>('registry');

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-stone-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* If user is not authenticated, show interactive Login Modal */}
      {!isAuthenticated && <LoginModal />}

      {/* Top Header */}
      <Header />

      {/* 8-Module Navigation Bar */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Module Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'registry' && <ModelRegistryTab />}
        {activeTab === 'versioning' && <VersionControlTab />}
        {activeTab === 'comparison' && <VersionComparisonTab />}
        {activeTab === 'approvals' && <ApprovalManagementTab />}
        {activeTab === 'performance' && <PerformanceMonitoringTab />}
        {activeTab === 'fairness' && <FairnessAssessmentTab />}
        {activeTab === 'compliance' && <ComplianceManagementTab />}
        {activeTab === 'audit' && <AuditManagementTab />}
      </main>

      {/* Clean Footer - Warm Beige/White/Orange/Black */}
      <footer className="bg-white border-t border-stone-200 px-4 lg:px-8 py-6 text-xs text-stone-600 mt-12 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-black text-stone-900">GovAI Studio</span>
            <span className="text-stone-400">&bull;</span>
            <span>Enterprise AI Governance &amp; Model Lifecycle Management</span>
          </div>

          <div className="flex items-center flex-wrap gap-2 text-stone-500 text-[11px] font-medium">
            <span>1. Registry</span>
            <span>&bull;</span>
            <span>2. Versioning</span>
            <span>&bull;</span>
            <span className="text-orange-700 font-bold">3. Version Comparison</span>
            <span>&bull;</span>
            <span>4. Approvals</span>
            <span>&bull;</span>
            <span>5. Performance</span>
            <span>&bull;</span>
            <span>6. Fairness</span>
            <span>&bull;</span>
            <span>7. Compliance</span>
            <span>&bull;</span>
            <span>8. Audit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <GovernanceProvider>
      <DashboardContent />
    </GovernanceProvider>
  );
}
