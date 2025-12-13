export interface CloseTask {
  id: string
  title: string
  description: string
  completed: boolean
  timeSavings: number // in hours
}

export interface Exception {
  id: string
  type: 'duplicate_vendor' | 'unmatched_transaction' | 'variance' | 'accrual_mismatch'
  description: string
  amount: number
  sourceSystem: 'SAP' | 'JDE' | 'THD'
  status: 'open' | 'resolved'
  createdAt: string
}

export interface AccrualSuggestion {
  id: string
  account: string
  description: string
  amount: number
  sourceSystem: string
  confidence: number
}

export interface DuplicateVendor {
  id: string
  name: string
  occurrences: number
  systems: string[]
  confidence: number
}

export const mockTasks: CloseTask[] = [
  {
    id: 'task-1',
    title: 'Import ERP feeds',
    description: 'TMH (SAP), Raymond (JD Edwards), THD',
    completed: false,
    timeSavings: 6,
  },
  {
    id: 'task-2',
    title: 'Auto-match intercompany transactions',
    description: 'Match IC transactions across systems',
    completed: false,
    timeSavings: 8,
  },
  {
    id: 'task-3',
    title: 'Vendor deduplication pass',
    description: 'Identify and merge duplicate vendors',
    completed: false,
    timeSavings: 4,
  },
  {
    id: 'task-4',
    title: 'Accrual suggestions generated',
    description: 'AI-suggested month-end accruals',
    completed: false,
    timeSavings: 7,
  },
  {
    id: 'task-5',
    title: 'AP aging review',
    description: 'Review aging buckets and discrepancies',
    completed: false,
    timeSavings: 5,
  },
  {
    id: 'task-6',
    title: 'Variance review + sign-off',
    description: 'Variance analysis and controller approval',
    completed: false,
    timeSavings: 9,
  },
  {
    id: 'task-7',
    title: 'Management approval',
    description: 'CFO/Director approval of close',
    completed: false,
    timeSavings: 3,
  },
  {
    id: 'task-8',
    title: 'Publish consolidated P&L',
    description: 'Finalize and publish to stakeholders',
    completed: false,
    timeSavings: 2,
  },
]

export const mockExceptions: Exception[] = [
  {
    id: 'exc-1',
    type: 'duplicate_vendor',
    description: 'ABC Bearings Inc - appears 3 times across systems',
    amount: 247500,
    sourceSystem: 'SAP',
    status: 'open',
    createdAt: '2025-12-10T08:00:00Z',
  },
  {
    id: 'exc-2',
    type: 'unmatched_transaction',
    description: 'Invoice SAP-2025-004521 not matched to PO',
    amount: 85000,
    sourceSystem: 'JDE',
    status: 'open',
    createdAt: '2025-12-10T08:15:00Z',
  },
  {
    id: 'exc-3',
    type: 'variance',
    description: 'Year-end accrual variance > 2% threshold',
    amount: 345000,
    sourceSystem: 'SAP',
    status: 'open',
    createdAt: '2025-12-10T08:30:00Z',
  },
  {
    id: 'exc-4',
    type: 'accrual_mismatch',
    description: 'Freight accrual mismatch between systems',
    amount: 52000,
    sourceSystem: 'THD',
    status: 'open',
    createdAt: '2025-12-10T08:45:00Z',
  },
  {
    id: 'exc-5',
    type: 'unmatched_transaction',
    description: 'JDE transaction 2025-98765 pending GL post',
    amount: 120000,
    sourceSystem: 'JDE',
    status: 'open',
    createdAt: '2025-12-10T09:00:00Z',
  },
  {
    id: 'exc-6',
    type: 'variance',
    description: 'Allowance for doubtful accounts variance',
    amount: 67500,
    sourceSystem: 'THD',
    status: 'open',
    createdAt: '2025-12-10T09:15:00Z',
  },
]

export const mockAccrualSuggestions: AccrualSuggestion[] = [
  {
    id: 'acr-1',
    account: '60001 - Freight & Shipping',
    description: 'Month-end accrual for pending freight invoices',
    amount: 125000,
    sourceSystem: 'SAP',
    confidence: 94,
  },
  {
    id: 'acr-2',
    account: '60050 - Maintenance & Repairs',
    description: 'Estimated HVAC maintenance costs (post-month)',
    amount: 45000,
    sourceSystem: 'JDE',
    confidence: 87,
  },
  {
    id: 'acr-3',
    account: '50002 - Utilities',
    description: 'December utility consumption estimate',
    amount: 82000,
    sourceSystem: 'THD',
    confidence: 91,
  },
]

export const mockDuplicateVendors: DuplicateVendor[] = [
  {
    id: 'dup-1',
    name: 'ABC Bearings Inc',
    occurrences: 3,
    systems: ['SAP', 'JDE', 'THD'],
    confidence: 98,
  },
  {
    id: 'dup-2',
    name: 'Global Supply Solutions LLC',
    occurrences: 2,
    systems: ['SAP', 'JDE'],
    confidence: 95,
  },
  {
    id: 'dup-3',
    name: 'Tech Components Ltd',
    occurrences: 2,
    systems: ['JDE', 'THD'],
    confidence: 89,
  },
]
