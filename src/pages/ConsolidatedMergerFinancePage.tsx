import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  AlertCircle,
  Filter,
  Eye,
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
  Entity,
  PLANTS,
  PERIODS,
  financialLineItems,
  getConsolidatedSummary,
  trendData,
  sourceDocuments,
} from '../lib/mockMergerData'

interface AuditTracebackState {
  open: boolean
  selectedLineItemId: string | null
}

export default function ConsolidatedMergerFinancePage() {
  const navigate = useNavigate()
  const [selectedEntity, setSelectedEntity] = useState<Entity | 'Both'>(Entity.BOTH)
  const [selectedPlant, setSelectedPlant] = useState<string>('All')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('May')
  const [demoMode, setDemoMode] = useState(false)
  const [traceback, setTraceback] = useState<AuditTracebackState>({
    open: false,
    selectedLineItemId: null,
  })
  const [auditNotes, setAuditNotes] = useState<Record<string, string>>({})

  const summary = getConsolidatedSummary()

  // Filter financial items based on selections
  const filteredItems = financialLineItems.filter((item) => {
    if (selectedEntity !== 'Both' && item.entity !== selectedEntity && item.entity !== Entity.BOTH) {
      return false
    }
    return true
  })

  const handleLineItemClick = (lineItemId: string) => {
    setTraceback({ open: true, selectedLineItemId: lineItemId })
  }

  const getSelectedLineItem = () => financialLineItems.find((f) => f.id === traceback.selectedLineItemId)
  const lineItem = getSelectedLineItem()

  // Get related source documents
  const getRelatedDocuments = () => {
    if (!lineItem) return []
    return sourceDocuments.filter((doc) => doc.lineItem === lineItem.lineItem)
  }

  const relatedDocs = getRelatedDocuments()

  const openTracebackDetail = (docId: string) => {
    navigate(`/finance/traceback/${docId}`)
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#364a5e' }}>
      {/* Shell Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 text-white shadow-sm" style={{ height: '48px', backgroundColor: '#364a5e' }}>
        <div className="h-full px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:bg-gray-700 p-1 rounded transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Launchpad</span>
          </button>
          <h1 className="text-lg font-bold">TMH/Raymond Consolidated Financials</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDemoMode(!demoMode)}
              className="text-xs px-2 py-1 bg-blue-700 hover:bg-blue-800 rounded"
            >
              {demoMode ? '✓ Demo Mode ON' : 'Demo Mode'}
            </button>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#e8934f' }}>
              SC
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto" style={{ marginTop: '48px', backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto py-6 px-6 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={18} className="text-gray-700" />
              <h3 className="font-bold text-gray-800">Consolidation Filters</h3>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Entity</label>
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value as Entity | 'Both')}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value={Entity.BOTH}>Both (TMH + Raymond)</option>
                  <option value={Entity.TMH}>TMH Only</option>
                  <option value={Entity.RAYMOND}>Raymond Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Plant</label>
                <select
                  value={selectedPlant}
                  onChange={(e) => setSelectedPlant(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="All">All Plants</option>
                  {PLANTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  {PERIODS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-semibold hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Consolidated Revenue</div>
              <div className="text-2xl font-bold text-gray-800">${(summary.totalRevenue / 1_000_000).toFixed(1)}M</div>
              <div className="text-xs text-gray-500 mt-1">TMH + Raymond</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Consolidated Opex</div>
              <div className="text-2xl font-bold text-gray-800">${(summary.totalOpex / 1_000_000).toFixed(1)}M</div>
              <div className="text-xs text-gray-500 mt-1">Operating Expenses</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Intercompany Eliminations</div>
              <div className="text-2xl font-bold" style={{ color: summary.intercompanyEliminations < 0 ? '#dc3545' : '#28a745' }}>
                ${Math.abs(summary.intercompanyEliminations / 1_000_000).toFixed(1)}M
              </div>
              <div className="text-xs text-gray-500 mt-1">Eliminated from both entities</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Exceptions Requiring Review</div>
              <div className="text-2xl font-bold" style={{ color: summary.exceptionsCount > 0 ? '#ff9800' : '#28a745' }}>
                {summary.exceptionsCount}
              </div>
              <div className="text-xs text-gray-500 mt-1">${(summary.exceptionsAmount / 1_000_000).toFixed(1)}M at risk</div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-bold text-gray-800 mb-4">Revenue & Opex Trend (Jan - May)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="period" stroke="#666" />
                <YAxis stroke="#666" label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `$${(value as number / 1_000_000).toFixed(1)}M`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#1e5a96" name="Revenue" strokeWidth={2} />
                <Line type="monotone" dataKey="opex" stroke="#ff9800" name="Opex" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* P&L Table */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-bold text-gray-800 mb-4">Consolidated P&L Lines (click row for audit traceback)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold text-gray-800">Line Item</th>
                    <th className="text-right px-4 py-3 font-bold text-gray-800">Amount</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-800">Category</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-800">Entity Split</th>
                    <th className="text-center px-4 py-3 font-bold text-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleLineItemClick(item.id)}
                      className={`border-b cursor-pointer transition-colors ${
                        item.status === 'exception'
                          ? 'bg-red-50 hover:bg-red-100'
                          : item.status === 'review'
                            ? 'bg-yellow-50 hover:bg-yellow-100'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-800">{item.lineItem}</td>
                      <td className="px-4 py-3 text-right text-gray-800 font-semibold">${(item.amount / 1_000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{item.category}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        TMH: ${(item.tmhAmount / 1_000).toFixed(0)}K | Raymond: ${(item.raymondAmount / 1_000).toFixed(0)}K
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            item.status === 'ok'
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'review'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.status === 'ok' ? 'OK' : item.status === 'review' ? 'Review' : 'Exception'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Traceback Drawer */}
          {traceback.open && lineItem && (
            <div className="bg-white rounded shadow border-l-4 border-blue-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Eye size={20} className="text-blue-600" />
                  Audit Traceback: {lineItem.lineItem}
                </h3>
                <button
                  onClick={() => setTraceback({ open: false, selectedLineItemId: null })}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ✕ Close
                </button>
              </div>

              {/* Lineage Breadcrumb */}
              <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
                <h4 className="text-xs font-bold text-gray-700 mb-2">Lineage Breadcrumb</h4>
                <div className="flex items-center gap-2 text-xs text-gray-700 flex-wrap">
                  <span className="font-semibold">Consolidated P&L</span>
                  <span>→</span>
                  <span className="font-semibold">{lineItem.entity === Entity.BOTH ? 'Both Entities' : lineItem.entity}</span>
                  <span>→</span>
                  <span className="font-semibold text-blue-600">{lineItem.category}</span>
                  <span>→</span>
                  <span className="font-semibold">GL Account</span>
                  <span>→</span>
                  <span className="font-semibold text-green-600">Source Documents</span>
                </div>
              </div>

              {/* Entity Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="text-xs font-bold text-gray-700 mb-2">TMH Data</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entity:</span>
                      <span className="font-semibold text-gray-800">TMH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Source System:</span>
                      <span className="font-mono text-gray-800 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                        SAP ECC
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-gray-800">${(lineItem.tmhAmount / 1_000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="text-xs font-bold text-gray-700 mb-2">Raymond Data</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entity:</span>
                      <span className="font-semibold text-gray-800">Raymond</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Source System:</span>
                      <span className="font-mono text-gray-800 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                        JD Edwards
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-gray-800">${(lineItem.raymondAmount / 1_000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Documents */}
              {relatedDocs.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-800 mb-3">Source Documents</h4>
                  <div className="space-y-2">
                    {relatedDocs.map((doc) => (
                      <div key={doc.docId} className="border border-gray-200 rounded p-3 bg-gray-50 flex items-center justify-between">
                        <div className="text-xs">
                          <div className="font-semibold text-gray-800 mb-1">{doc.documentNumber}</div>
                          <div className="text-gray-600">
                            {doc.entity} • {doc.sourceSystem} • ${(doc.amount / 1_000).toFixed(0)}K • {doc.date}
                          </div>
                          {doc.vendor && <div className="text-gray-600">Vendor: {doc.vendor}</div>}
                        </div>
                        <button
                          onClick={() => openTracebackDetail(doc.docId)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audit Notes */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-800 mb-2">Audit Notes</h4>
                <textarea
                  value={auditNotes[lineItem.id] || ''}
                  onChange={(e) => setAuditNotes({ ...auditNotes, [lineItem.id]: e.target.value })}
                  placeholder="Add notes about this line item's audit trail..."
                  className="w-full border border-gray-300 rounded p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows={3}
                />
              </div>

              {lineItem.status !== 'ok' && (
                <div className={`p-3 rounded text-sm ${lineItem.status === 'review' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} style={{ color: lineItem.status === 'review' ? '#ff9800' : '#dc3545' }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold" style={{ color: lineItem.status === 'review' ? '#ff9800' : '#dc3545' }}>
                        {lineItem.status === 'review' ? 'Requires Review' : 'Exception Alert'}
                      </div>
                      <div className="text-xs text-gray-700 mt-1">{lineItem.description}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
