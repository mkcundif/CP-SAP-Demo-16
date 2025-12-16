export type Entity = 'TMH' | 'Raymond' | 'Both'
export type SourceSystem = 'SAP_ECC' | 'JDE'

export interface TaskList {
  id: string
  label: string
}

export interface CompletionOverview {
  completionRate: number
  statusCounts: {
    completedWithErrors: number
    completedWithWarnings: number
    completedWithoutIssues: number
    others: number
  }
}

export interface ErrorRow {
  taskList: string
  personResponsible: string
  numberOfErrors: number
  companyCode: string
  entity: Entity
  sourceSystem: SourceSystem
}

export interface OpenTaskRow {
  task: string
  responsible: string
  daysOverdue: number
  entity: Entity
}

export interface DelayedTaskListRow {
  taskList: string
  closingType: string
  daysOverdue: number
  entity: Entity
}

export interface CompletionRateRow {
  name: string
  percentage: number
}

export interface TaskToBeApprovedRow {
  task: string
  responsible: string
  daysOverdue: number
}

export interface MergerException {
  id: string
  type: string
  description: string
  entity: Entity
  sourceSystem: SourceSystem
  impact: number
  status: 'open' | 'in_progress' | 'resolved'
  documentId?: string
  vendorLocalId?: string
  vendorEnterpriseId?: string
  costCenterLocal?: string
  costCenterEnterprise?: string
  resolvedBy?: string
}

export interface CloseOverviewData {
  completionOverview: CompletionOverview
  numberOfErrorsRows: ErrorRow[]
  openTasksRows: OpenTaskRow[]
  delayedTaskListsRows: DelayedTaskListRow[]
  mergerExceptions: MergerException[]
  intercompanyMatchRate: number
  completionByCompanyCode: CompletionRateRow[]
  completionByTaskList: CompletionRateRow[]
  tasksToBeApprovedRows: TaskToBeApprovedRow[]
}

export const taskLists: TaskList[] = [
  { id: 'AFC-1', label: 'AFC-1 - Month-End Close November 2025 (TMH + Raymond Merger)' },
  { id: 'AFC-2', label: 'AFC-2 - Quarter-End Close Q4 2025' },
  { id: 'AFC-3', label: 'AFC-3 - Year-End Close 2025' },
]

const initialData: CloseOverviewData = {
  completionOverview: {
    completionRate: 5,
    statusCounts: {
      completedWithErrors: 12,
      completedWithWarnings: 18,
      completedWithoutIssues: 145,
      others: 25,
    },
  },
  numberOfErrorsRows: [
    { taskList: 'AFC-3', personResponsible: 'Katharina Stopf', numberOfErrors: 14, companyCode: '1010', entity: 'TMH', sourceSystem: 'SAP_ECC' },
    { taskList: 'AFC-2', personResponsible: 'John GLAccountant', numberOfErrors: 9, companyCode: '1010', entity: 'Raymond', sourceSystem: 'JDE' },
    { taskList: 'TMH-SAP Month-End', personResponsible: 'Sarah Chen', numberOfErrors: 8, companyCode: '1000', entity: 'TMH', sourceSystem: 'SAP_ECC' },
    { taskList: 'Raymond-JDE Close', personResponsible: 'Michael Torres', numberOfErrors: 6, companyCode: '2000', entity: 'Raymond', sourceSystem: 'JDE' },
    { taskList: 'Intercompany Recon', personResponsible: 'Lisa Anderson', numberOfErrors: 4, companyCode: 'ALL', entity: 'Both', sourceSystem: 'SAP_ECC' },
  ],
  openTasksRows: [
    { task: 'Intercompany elimination check', responsible: 'Lisa Anderson', daysOverdue: -3, entity: 'Both' },
    { task: 'Vendor duplicate review (TMH vs Raymond)', responsible: 'Sarah Chen', daysOverdue: -5, entity: 'Both' },
    { task: 'Cost center mapping exceptions', responsible: 'Michael Torres', daysOverdue: 1, entity: 'Raymond' },
    { task: 'AP Aging Analysis', responsible: 'John Smith', daysOverdue: -2, entity: 'TMH' },
    { task: 'Golden vendor consolidation', responsible: 'David Kim', daysOverdue: -4, entity: 'Both' },
    { task: 'GL Account Reconciliation', responsible: 'Emma Wilson', daysOverdue: -1, entity: 'TMH' },
    { task: 'Revenue Recognition', responsible: 'Robert Lee', daysOverdue: 2, entity: 'Raymond' },
    { task: 'Fixed Assets Depreciation', responsible: 'Maria Garcia', daysOverdue: -4, entity: 'TMH' },
    { task: 'Tax Provision Review', responsible: 'James Brown', daysOverdue: 1, entity: 'Both' },
    { task: 'Foreign Currency Revaluation', responsible: 'Anna Martinez', daysOverdue: -2, entity: 'Raymond' },
    { task: 'Inventory Valuation', responsible: 'Thomas White', daysOverdue: 0, entity: 'Both' },
  ],
  delayedTaskListsRows: [
    { taskList: 'Month-End Close (Merger)', closingType: 'Merger Integration', daysOverdue: -5, entity: 'Both' },
    { taskList: 'TMH North America', closingType: 'Standard Close', daysOverdue: -5, entity: 'TMH' },
    { taskList: 'Raymond EMEA', closingType: 'Fast Close', daysOverdue: -3, entity: 'Raymond' },
    { taskList: 'TMH Asia Pacific', closingType: 'Standard Close', daysOverdue: -2, entity: 'TMH' },
    { taskList: 'Raymond Latin America', closingType: 'Standard Close', daysOverdue: -4, entity: 'Raymond' },
    { taskList: 'Corporate Consolidation', closingType: 'Consolidated', daysOverdue: -1, entity: 'Both' },
  ],
  mergerExceptions: [
    {
      id: 'EXC-001',
      type: 'Unmatched Intercompany',
      description: 'Unmatched intercompany invoice (TMH -> Raymond)',
      entity: 'Both',
      sourceSystem: 'SAP_ECC',
      impact: 125000,
      status: 'open',
      documentId: 'DOC-5001234',
      vendorLocalId: 'V-TMH-5001',
      vendorEnterpriseId: 'EV-INTERCO-001',
    },
    {
      id: 'EXC-002',
      type: 'Duplicate Vendor',
      description: 'Duplicate vendor IDs across TMH/Raymond (different IDs for same vendor)',
      entity: 'Both',
      sourceSystem: 'JDE',
      impact: 89000,
      status: 'open',
      vendorLocalId: 'V-RAY-2034',
      vendorEnterpriseId: 'EV-SUPPLIER-001',
    },
    {
      id: 'EXC-003',
      type: 'Missing Cost Center Mapping',
      description: 'Missing cost center mapping (Raymond local -> enterprise)',
      entity: 'Raymond',
      sourceSystem: 'JDE',
      impact: 45000,
      status: 'open',
      costCenterLocal: 'CC-RAY-3200',
      costCenterEnterprise: 'ECC-3200',
    },
    {
      id: 'EXC-004',
      type: 'GL Classification Mismatch',
      description: 'GL classification mismatch (TMH vs Raymond chart of accounts)',
      entity: 'Both',
      sourceSystem: 'SAP_ECC',
      impact: 67000,
      status: 'open',
      documentId: 'DOC-5001289',
    },
    {
      id: 'EXC-005',
      type: 'AP Aging Mismatch',
      description: 'AP aging mismatch by entity (currency conversion discrepancy)',
      entity: 'Raymond',
      sourceSystem: 'JDE',
      impact: 23000,
      status: 'open',
    },
    {
      id: 'EXC-006',
      type: 'Accrual Missing',
      description: 'Accrual missing for warranty reserve (post-merger liability)',
      entity: 'Both',
      sourceSystem: 'SAP_ECC',
      impact: 156000,
      status: 'open',
    },
    {
      id: 'EXC-007',
      type: 'Unmapped Payment Terms',
      description: 'Unmapped payment terms (Raymond terms not in enterprise master)',
      entity: 'Raymond',
      sourceSystem: 'JDE',
      impact: 12000,
      status: 'open',
    },
    {
      id: 'EXC-008',
      type: 'Duplicate Customer',
      description: 'Duplicate customer master records (TMH + Raymond)',
      entity: 'Both',
      sourceSystem: 'SAP_ECC',
      impact: 34000,
      status: 'open',
    },
  ],
  intercompanyMatchRate: 62,
  completionByCompanyCode: [
    { name: '1000 - TMH North America', percentage: 85 },
    { name: '2000 - Raymond EMEA', percentage: 72 },
    { name: '3000 - TMH Asia Pacific', percentage: 91 },
    { name: '4000 - Raymond Latin America', percentage: 68 },
    { name: '5000 - Corporate HQ', percentage: 95 },
  ],
  completionByTaskList: [
    { name: 'AFC-1-001 Standard Posting', percentage: 100 },
    { name: 'AFC-1-002 AP Processing', percentage: 87 },
    { name: 'AFC-1-003 AR Processing', percentage: 93 },
    { name: 'AFC-1-004 Intercompany', percentage: 45 },
    { name: 'AFC-1-005 Consolidation', percentage: 62 },
  ],
  tasksToBeApprovedRows: [
    { task: 'Revenue Recognition Adjustment', responsible: 'Robert Lee', daysOverdue: 2 },
    { task: 'Accrual Adjustment - Warranty', responsible: 'Michael Torres', daysOverdue: 1 },
    { task: 'Foreign Exchange Revaluation', responsible: 'Anna Martinez', daysOverdue: -1 },
  ],
}

const dataByTaskList: Record<string, CloseOverviewData> = {
  'AFC-1': initialData,
  'AFC-2': {
    ...initialData,
    completionOverview: {
      completionRate: 12,
      statusCounts: {
        completedWithErrors: 8,
        completedWithWarnings: 15,
        completedWithoutIssues: 167,
        others: 20,
      },
    },
    intercompanyMatchRate: 75,
  },
  'AFC-3': {
    ...initialData,
    completionOverview: {
      completionRate: 3,
      statusCounts: {
        completedWithErrors: 15,
        completedWithWarnings: 22,
        completedWithoutIssues: 128,
        others: 35,
      },
    },
    intercompanyMatchRate: 58,
  },
}

export function getDataByTaskList(taskListId: string): CloseOverviewData {
  return dataByTaskList[taskListId] || dataByTaskList['AFC-1']
}

// Helper functions for automation effects
export function applyIntercompanyMatch(data: CloseOverviewData): CloseOverviewData {
  return {
    ...data,
    mergerExceptions: data.mergerExceptions.map((exc) =>
      exc.type === 'Unmatched Intercompany' && exc.status === 'open' ? { ...exc, status: 'resolved', resolvedBy: 'automation' } : exc
    ),
    intercompanyMatchRate: Math.min(95, data.intercompanyMatchRate + 25),
    openTasksRows: data.openTasksRows.filter((task) => task.task !== 'Intercompany elimination check'),
    numberOfErrorsRows: data.numberOfErrorsRows.map((row) =>
      row.taskList === 'Intercompany Recon' ? { ...row, numberOfErrors: Math.max(0, row.numberOfErrors - 3) } : row
    ),
  }
}

export function applyGoldenVendorMapping(data: CloseOverviewData): CloseOverviewData {
  return {
    ...data,
    mergerExceptions: data.mergerExceptions.map((exc) =>
      (exc.type === 'Duplicate Vendor' || exc.type === 'Duplicate Customer') && exc.status === 'open'
        ? { ...exc, status: 'resolved', resolvedBy: 'automation' }
        : exc
    ),
    openTasksRows: data.openTasksRows.filter((task) => task.task !== 'Vendor duplicate review (TMH vs Raymond)' && task.task !== 'Golden vendor consolidation'),
    numberOfErrorsRows: data.numberOfErrorsRows.map((row) =>
      row.entity === 'Both' ? { ...row, numberOfErrors: Math.max(0, row.numberOfErrors - 2) } : row
    ),
  }
}

export function applyNormalizeCostCenters(data: CloseOverviewData): CloseOverviewData {
  return {
    ...data,
    mergerExceptions: data.mergerExceptions.map((exc) =>
      (exc.type === 'Missing Cost Center Mapping' || exc.type === 'Unmapped Payment Terms') && exc.status === 'open'
        ? { ...exc, status: 'resolved', resolvedBy: 'automation' }
        : exc
    ),
    openTasksRows: data.openTasksRows.filter((task) => task.task !== 'Cost center mapping exceptions'),
    numberOfErrorsRows: data.numberOfErrorsRows.map((row) =>
      row.entity === 'Raymond' && row.sourceSystem === 'JDE' ? { ...row, numberOfErrors: Math.max(0, row.numberOfErrors - 2) } : row
    ),
  }
}
