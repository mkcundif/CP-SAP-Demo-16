// Mock data for TMH + Raymond merger financial intelligence

export enum Entity {
  TMH = 'TMH',
  RAYMOND = 'Raymond',
  BOTH = 'Both',
}

export enum SourceSystem {
  SAP_ECC = 'SAP ECC',
  JDE = 'JD Edwards',
}

export const PLANTS = ['Columbus', 'Greeneville', 'Spartanburg']
export const PERIODS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Cost Center Mappings: Local -> Enterprise
export interface CostCenterMapping {
  localId: string
  localEntity: Entity
  enterpriseId: string
  enterpriseName: string
  description: string
}

export const costCenterMappings: CostCenterMapping[] = [
  { localId: 'CC-1001', localEntity: Entity.TMH, enterpriseId: 'ECC-1001', enterpriseName: 'Plant Operations - Columbus', description: 'Manufacturing floor operations' },
  { localId: 'CC-1101', localEntity: Entity.TMH, enterpriseId: 'ECC-1101', enterpriseName: 'Quality Assurance - Columbus', description: 'QA and testing' },
  { localId: 'CC-2001', localEntity: Entity.RAYMOND, enterpriseId: 'ECC-2001', enterpriseName: 'Plant Operations - Greeneville', description: 'Manufacturing floor operations' },
  { localId: 'CC-2101', localEntity: Entity.RAYMOND, enterpriseId: 'ECC-2101', enterpriseName: 'Logistics - Greeneville', description: 'Warehouse and distribution' },
  { localId: 'CC-3001', localEntity: Entity.TMH, enterpriseId: 'ECC-3001', enterpriseName: 'Engineering - Corporate', description: 'Product engineering' },
  { localId: 'CC-3001', localEntity: Entity.RAYMOND, enterpriseId: 'ECC-3001', enterpriseName: 'Engineering - Corporate', description: 'Product engineering' },
]

// Vendor Mappings: Local (per entity) -> Enterprise
export interface VendorMapping {
  vendorIdTMH?: string
  vendorIdRaymond?: string
  enterpriseVendorId: string
  vendorName: string
  category: string
  status: 'matched' | 'unmatched' | 'review'
}

export const vendorMappings: VendorMapping[] = [
  { vendorIdTMH: 'V001', vendorIdRaymond: 'RV001', enterpriseVendorId: 'EV-SUPPLIER-001', vendorName: 'Acme Materials Inc', category: 'Raw Materials', status: 'matched' },
  { vendorIdTMH: 'V002', vendorIdRaymond: undefined, enterpriseVendorId: 'EV-SUPPLIER-002', vendorName: 'Precision Parts Co', category: 'Components', status: 'matched' },
  { vendorIdTMH: undefined, vendorIdRaymond: 'RV002', enterpriseVendorId: 'EV-SUPPLIER-003', vendorName: 'Regional Logistics Ltd', category: 'Transportation', status: 'matched' },
  { vendorIdTMH: 'V003', vendorIdRaymond: 'RV003', enterpriseVendorId: 'EV-SUPPLIER-004', vendorName: 'ElectroSupply Systems', category: 'Electrical', status: 'review' },
  { vendorIdTMH: 'V004', vendorIdRaymond: undefined, enterpriseVendorId: 'EV-SUPPLIER-005', vendorName: 'Maintenance Services Group', category: 'Services', status: 'matched' },
]

// Financial Line Items: P&L structure
export interface FinancialLineItem {
  id: string
  lineItem: string
  category: string
  amount: number
  tmhAmount: number
  raymondAmount: number
  entity: Entity
  status: 'ok' | 'review' | 'exception'
  description: string
}

export const financialLineItems: FinancialLineItem[] = [
  {
    id: 'FI-001',
    lineItem: 'Revenue - Products',
    category: 'Revenue',
    amount: 2_450_000,
    tmhAmount: 1_600_000,
    raymondAmount: 850_000,
    entity: Entity.BOTH,
    status: 'ok',
    description: 'Product sales from manufacturing facilities',
  },
  {
    id: 'FI-002',
    lineItem: 'Revenue - Services',
    category: 'Revenue',
    amount: 450_000,
    tmhAmount: 250_000,
    raymondAmount: 200_000,
    entity: Entity.BOTH,
    status: 'ok',
    description: 'Service contracts and support',
  },
  {
    id: 'FI-003',
    lineItem: 'COGS - Materials',
    category: 'COGS',
    amount: 1_225_000,
    tmhAmount: 800_000,
    raymondAmount: 425_000,
    entity: Entity.BOTH,
    status: 'ok',
    description: 'Raw materials and components',
  },
  {
    id: 'FI-004',
    lineItem: 'COGS - Labor',
    category: 'COGS',
    amount: 735_000,
    tmhAmount: 480_000,
    raymondAmount: 255_000,
    entity: Entity.BOTH,
    status: 'review',
    description: 'Direct labor costs (discrepancy in overhead allocation)',
  },
  {
    id: 'FI-005',
    lineItem: 'Gross Profit',
    category: 'Summary',
    amount: 940_000,
    tmhAmount: 570_000,
    raymondAmount: 370_000,
    entity: Entity.BOTH,
    status: 'ok',
    description: 'Calculated gross profit margin',
  },
  {
    id: 'FI-006',
    lineItem: 'Operating Expenses - Salaries',
    category: 'Opex',
    amount: 520_000,
    tmhAmount: 320_000,
    raymondAmount: 200_000,
    entity: Entity.BOTH,
    status: 'ok',
    description: 'Employee salaries and benefits',
  },
  {
    id: 'FI-007',
    lineItem: 'Operating Expenses - Facility',
    category: 'Opex',
    amount: 180_000,
    tmhAmount: 120_000,
    raymondAmount: 60_000,
    entity: Entity.BOTH,
    status: 'exception',
    description: 'Rent, utilities, maintenance (facility consolidation adjustment needed)',
  },
  {
    id: 'FI-008',
    lineItem: 'Intercompany Eliminations',
    category: 'Eliminations',
    amount: -125_000,
    tmhAmount: -75_000,
    raymondAmount: -50_000,
    entity: Entity.BOTH,
    status: 'review',
    description: 'Elimination of intercompany transactions',
  },
]

// Source Documents (with full lineage for traceback)
export interface SourceDocument {
  docId: string
  entity: Entity
  sourceSystem: SourceSystem
  documentType: string
  vendor?: string
  amount: number
  date: string
  costCenter: string
  glAccount: string
  description: string
  lineItem: string
  documentNumber: string
}

export const sourceDocuments: SourceDocument[] = [
  {
    docId: 'DOC-SAP-001',
    entity: Entity.TMH,
    sourceSystem: SourceSystem.SAP_ECC,
    documentType: 'Invoice',
    vendor: 'Acme Materials Inc',
    amount: 125_000,
    date: '2025-05-15',
    costCenter: 'CC-1001',
    glAccount: '4100',
    description: 'Raw materials purchase - Columbus facility',
    lineItem: 'COGS - Materials',
    documentNumber: 'INV-SAP-2025-001',
  },
  {
    docId: 'DOC-JDE-001',
    entity: Entity.RAYMOND,
    sourceSystem: SourceSystem.JDE,
    documentType: 'Invoice',
    vendor: 'Regional Logistics Ltd',
    amount: 45_000,
    date: '2025-05-12',
    costCenter: 'CC-2101',
    glAccount: '4200',
    description: 'Transportation and logistics - Greeneville',
    lineItem: 'COGS - Materials',
    documentNumber: 'INV-JDE-2025-0512',
  },
  {
    docId: 'DOC-SAP-002',
    entity: Entity.TMH,
    sourceSystem: SourceSystem.SAP_ECC,
    documentType: 'Purchase Order',
    vendor: 'Precision Parts Co',
    amount: 78_500,
    date: '2025-05-10',
    costCenter: 'CC-1101',
    glAccount: '4100',
    description: 'Component purchase - quality assurance',
    lineItem: 'COGS - Materials',
    documentNumber: 'PO-SAP-2025-002',
  },
  {
    docId: 'DOC-JDE-002',
    entity: Entity.RAYMOND,
    sourceSystem: SourceSystem.JDE,
    documentType: 'Journal Entry',
    vendor: undefined,
    amount: 62_000,
    date: '2025-05-08',
    costCenter: 'CC-2001',
    glAccount: '6100',
    description: 'Labor allocation - manufacturing overhead',
    lineItem: 'COGS - Labor',
    documentNumber: 'JE-JDE-2025-0508',
  },
  {
    docId: 'DOC-SAP-003',
    entity: Entity.TMH,
    sourceSystem: SourceSystem.SAP_ECC,
    documentType: 'Intercompany Invoice',
    vendor: undefined,
    amount: 35_000,
    date: '2025-05-05',
    costCenter: 'CC-3001',
    glAccount: '9100',
    description: 'Intercompany service transfer to Raymond',
    lineItem: 'Intercompany Eliminations',
    documentNumber: 'ICC-SAP-2025-003',
  },
]

// Close Tasks specific to merger integration
export interface CloseTask {
  id: string
  title: string
  description: string
  completed: boolean
  timeSavings: number
  order: number
}

export const closeTasks: CloseTask[] = [
  {
    id: 'TASK-001',
    title: 'Import TMH SAP ECC Feed',
    description: 'Extract GL, cost center, and vendor data from SAP ECC',
    completed: false,
    timeSavings: 8,
    order: 1,
  },
  {
    id: 'TASK-002',
    title: 'Import Raymond JDE Feed',
    description: 'Extract GL, cost center, and vendor data from JD Edwards',
    completed: false,
    timeSavings: 8,
    order: 2,
  },
  {
    id: 'TASK-003',
    title: 'Run Standardization Mappings',
    description: 'Apply cost center and vendor mappings to normalize data',
    completed: false,
    timeSavings: 6,
    order: 3,
  },
  {
    id: 'TASK-004',
    title: 'Auto-Match Intercompany',
    description: 'Automatically match and verify intercompany invoices',
    completed: false,
    timeSavings: 8,
    order: 4,
  },
  {
    id: 'TASK-005',
    title: 'Identify & Flag Duplicate Vendors',
    description: 'Find and consolidate duplicate vendor records across entities',
    completed: false,
    timeSavings: 6,
    order: 5,
  },
  {
    id: 'TASK-006',
    title: 'Resolve All Exceptions',
    description: 'Review and resolve exceptions requiring manual intervention',
    completed: false,
    timeSavings: 4,
    order: 6,
  },
  {
    id: 'TASK-007',
    title: 'Final Approvals & Review',
    description: 'Controller review and sign-off of consolidated P&L',
    completed: false,
    timeSavings: 2,
    order: 7,
  },
  {
    id: 'TASK-008',
    title: 'Publish Consolidated P&L',
    description: 'Finalize and distribute consolidated financials',
    completed: false,
    timeSavings: 1,
    order: 8,
  },
]

// Close Exceptions
export interface CloseException {
  id: string
  type: 'unmatched_intercompany' | 'duplicate_vendor' | 'mapping_missing' | 'variance' | 'accrual_mismatch'
  description: string
  amount: number
  entity: Entity
  sourceSystem: SourceSystem
  status: 'open' | 'resolved' | 'in_progress'
  relatedDocId?: string
}

export const closeExceptions: CloseException[] = [
  {
    id: 'EXC-001',
    type: 'unmatched_intercompany',
    description: 'TMH invoice to Raymond facility (ICC-SAP-2025-003) lacks matching receipt',
    amount: 35_000,
    entity: Entity.TMH,
    sourceSystem: SourceSystem.SAP_ECC,
    status: 'open',
    relatedDocId: 'DOC-SAP-003',
  },
  {
    id: 'EXC-002',
    type: 'duplicate_vendor',
    description: 'Vendor "Acme Materials Inc" appears in TMH (V001) and Raymond (RV001) with different terms',
    amount: 125_000,
    entity: Entity.BOTH,
    sourceSystem: SourceSystem.SAP_ECC,
    status: 'open',
  },
  {
    id: 'EXC-003',
    type: 'mapping_missing',
    description: 'Cost center CC-2050 in Raymond JDE has no enterprise mapping defined',
    amount: 0,
    entity: Entity.RAYMOND,
    sourceSystem: SourceSystem.JDE,
    status: 'open',
  },
  {
    id: 'EXC-004',
    type: 'variance',
    description: 'Labor cost variance between TMH and Raymond facilities (8% difference)',
    amount: 41_600,
    entity: Entity.BOTH,
    sourceSystem: SourceSystem.SAP_ECC,
    status: 'open',
    relatedDocId: 'DOC-JDE-002',
  },
  {
    id: 'EXC-005',
    type: 'accrual_mismatch',
    description: 'Facility consolidation accrual requires adjustment for Q2',
    amount: 28_000,
    entity: Entity.BOTH,
    sourceSystem: SourceSystem.SAP_ECC,
    status: 'open',
  },
  {
    id: 'EXC-006',
    type: 'unmatched_intercompany',
    description: 'Raymond JDE journal entry (JE-JDE-2025-0508) lacks corporate allocation support',
    amount: 62_000,
    entity: Entity.RAYMOND,
    sourceSystem: SourceSystem.JDE,
    status: 'open',
    relatedDocId: 'DOC-JDE-002',
  },
]

// Accrual Suggestions
export interface AccrualSuggestion {
  id: string
  account: string
  description: string
  amount: number
  confidence: number
}

export const accrualSuggestions: AccrualSuggestion[] = [
  {
    id: 'ACR-001',
    account: '2100 - Accrued Expenses',
    description: 'Facility consolidation costs (lease termination)',
    amount: 28_000,
    confidence: 92,
  },
  {
    id: 'ACR-002',
    account: '2100 - Accrued Expenses',
    description: 'Integration bonus accrual (retention agreements)',
    amount: 18_500,
    confidence: 85,
  },
  {
    id: 'ACR-003',
    account: '2150 - Deferred Revenue',
    description: 'Service contract adjustment for merged entity',
    amount: 12_000,
    confidence: 78,
  },
]

// Consolidated Financials Summary
export interface ConsolidatedSummary {
  totalRevenue: number
  totalOpex: number
  intercompanyEliminations: number
  consolidatedNetIncome: number
  exceptionsCount: number
  exceptionsAmount: number
}

export const getConsolidatedSummary = (): ConsolidatedSummary => {
  const revenue = financialLineItems.filter((f) => f.category === 'Revenue').reduce((sum, f) => sum + f.amount, 0)
  const opex = financialLineItems.filter((f) => f.category === 'Opex').reduce((sum, f) => sum + f.amount, 0)
  const eliminations = financialLineItems.find((f) => f.id === 'FI-008')?.amount || 0
  const cogs = financialLineItems.filter((f) => f.category === 'COGS').reduce((sum, f) => sum + f.amount, 0)

  return {
    totalRevenue: revenue,
    totalOpex: opex,
    intercompanyEliminations: eliminations,
    consolidatedNetIncome: revenue - cogs - opex + eliminations,
    exceptionsCount: closeExceptions.filter((e) => e.status === 'open').length,
    exceptionsAmount: closeExceptions.filter((e) => e.status === 'open').reduce((sum, e) => sum + e.amount, 0),
  }
}

// Trend data for charts
export interface TrendDataPoint {
  period: string
  revenue: number
  opex: number
}

export const trendData: TrendDataPoint[] = [
  { period: 'January', revenue: 2_300_000, opex: 620_000 },
  { period: 'February', revenue: 2_350_000, opex: 615_000 },
  { period: 'March', revenue: 2_400_000, opex: 618_000 },
  { period: 'April', revenue: 2_420_000, opex: 625_000 },
  { period: 'May', revenue: 2_450_000, opex: 680_000 },
]
