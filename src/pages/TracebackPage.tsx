import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, FileText, Lock } from 'lucide-react'
import { sourceDocuments, SourceSystem, costCenterMappings, vendorMappings } from '../lib/mockMergerData'

export default function TracebackPage() {
  const navigate = useNavigate()
  const { docId } = useParams<{ docId: string }>()
  const [auditNotes, setAuditNotes] = useState('')

  const document = sourceDocuments.find((d) => d.docId === docId)

  if (!document) {
    return (
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#364a5e' }}>
        <header className="fixed top-0 left-0 right-0 z-50 text-white shadow-sm" style={{ height: '48px', backgroundColor: '#364a5e' }}>
          <div className="h-full px-6 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:bg-gray-700 p-1 rounded transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-lg font-bold">Document Not Found</h1>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#e8934f' }}>
              SC
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto" style={{ marginTop: '48px', backgroundColor: '#f5f5f5' }}>
          <div className="max-w-4xl mx-auto py-6 px-6">
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Document Not Found</h2>
              <p className="text-gray-600">The document you're looking for could not be found.</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Get cost center mapping
  const costCenterMap = costCenterMappings.find(
    (m) => m.localId === document.costCenter && m.localEntity === document.entity
  )

  // Get vendor mapping
  const vendorMap = vendorMappings.find((v) => {
    if (document.entity.toString() === 'TMH' && v.vendorIdTMH === document.vendor) return true
    if (document.entity.toString() === 'Raymond' && v.vendorIdRaymond === document.vendor) return true
    return false
  })

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#364a5e' }}>
      {/* Shell Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 text-white shadow-sm" style={{ height: '48px', backgroundColor: '#364a5e' }}>
        <div className="h-full px-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:bg-gray-700 p-1 rounded transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Consolidated View</span>
          </button>
          <h1 className="text-lg font-bold">Document Audit Traceback</h1>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#e8934f' }}>
            SC
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto" style={{ marginTop: '48px', backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto py-6 px-6 space-y-6">
          {/* Document Summary */}
          <div className="bg-white rounded shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileText size={24} className="text-blue-600" />
                {document.documentNumber}
              </h2>
              <span
                className={`inline-block px-3 py-1 rounded text-xs font-semibold text-white ${
                  document.sourceSystem === SourceSystem.SAP_ECC ? 'bg-blue-600' : 'bg-green-600'
                }`}
              >
                {document.sourceSystem}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded p-4">
                <div className="text-xs text-gray-600 mb-1">Document Type</div>
                <div className="text-lg font-bold text-gray-800">{document.documentType}</div>
              </div>
              <div className="border border-gray-200 rounded p-4">
                <div className="text-xs text-gray-600 mb-1">Amount</div>
                <div className="text-lg font-bold text-gray-800">${(document.amount / 1_000).toFixed(0)}K</div>
              </div>
              <div className="border border-gray-200 rounded p-4">
                <div className="text-xs text-gray-600 mb-1">Date</div>
                <div className="text-lg font-bold text-gray-800">{document.date}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Document Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Entity:</span>
                  <span className="text-sm font-semibold text-gray-800">{document.entity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">GL Account:</span>
                  <span className="text-sm font-mono text-gray-800">{document.glAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost Center:</span>
                  <span className="text-sm font-mono text-gray-800">{document.costCenter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">P&L Line Item:</span>
                  <span className="text-sm font-semibold text-gray-800">{document.lineItem}</span>
                </div>
                {document.vendor && (
                  <div className="flex justify-between col-span-2">
                    <span className="text-sm text-gray-600">Vendor:</span>
                    <span className="text-sm font-semibold text-gray-800">{document.vendor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Field Mapping */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              Field Mapping (Local → Enterprise)
            </h3>

            <div className="space-y-4">
              {/* Cost Center Mapping */}
              {costCenterMap && (
                <div className="border border-gray-200 rounded p-4 bg-blue-50">
                  <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Lock size={16} className="text-blue-600" />
                    Cost Center Mapping
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-600">Local Cost Center</div>
                        <div className="text-sm font-mono font-bold text-gray-800">{costCenterMap.localId}</div>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">Enterprise Cost Center</div>
                        <div className="text-sm font-mono font-bold text-gray-800">{costCenterMap.enterpriseId}</div>
                        <div className="text-xs text-gray-600 mt-1">{costCenterMap.enterpriseName}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 border-t pt-2 mt-2">
                      <strong>Description:</strong> {costCenterMap.description}
                    </div>
                  </div>
                </div>
              )}

              {/* Vendor Mapping */}
              {document.vendor && vendorMap && (
                <div className="border border-gray-200 rounded p-4 bg-green-50">
                  <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Lock size={16} className="text-green-600" />
                    Vendor Mapping
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-600">Local Vendor ID</div>
                        <div className="text-sm font-mono font-bold text-gray-800">
                          {document.entity.toString() === 'TMH' ? vendorMap.vendorIdTMH : vendorMap.vendorIdRaymond}
                        </div>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">Enterprise Vendor ID</div>
                        <div className="text-sm font-mono font-bold text-gray-800">{vendorMap.enterpriseVendorId}</div>
                        <div className="text-xs text-gray-600 mt-1">{vendorMap.vendorName}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 border-t pt-2 mt-2 flex items-center justify-between">
                      <div>
                        <strong>Category:</strong> {vendorMap.category}
                      </div>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          vendorMap.status === 'matched'
                            ? 'bg-green-100 text-green-800'
                            : vendorMap.status === 'review'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {vendorMap.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Source System Details */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Source System Details</h3>
            <div
              className="p-4 rounded border-l-4"
              style={{
                backgroundColor: document.sourceSystem === SourceSystem.SAP_ECC ? '#e3f2fd' : '#e8f5e9',
                borderLeftColor: document.sourceSystem === SourceSystem.SAP_ECC ? '#1976d2' : '#388e3c',
              }}
            >
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-600">System:</span>
                  <span className="text-sm font-bold text-gray-800 ml-2">{document.sourceSystem}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600">System Document ID:</span>
                  <span className="text-sm font-mono text-gray-800 ml-2">{document.documentNumber}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600">System Description:</span>
                  <span className="text-sm text-gray-800 ml-2">{document.description}</span>
                </div>
                {document.sourceSystem === SourceSystem.SAP_ECC && (
                  <div className="text-xs text-gray-600 border-t pt-2 mt-2">
                    <strong>Next Steps:</strong> This document has been imported from SAP ECC (TMH). Verify the amount and account mapping
                    before final consolidation.
                  </div>
                )}
                {document.sourceSystem === SourceSystem.JDE && (
                  <div className="text-xs text-gray-600 border-t pt-2 mt-2">
                    <strong>Next Steps:</strong> This document has been imported from JD Edwards (Raymond). Apply standard mappings and
                    review for intercompany adjustments.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Audit Notes */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Audit Notes</h3>
            <textarea
              value={auditNotes}
              onChange={(e) => setAuditNotes(e.target.value)}
              placeholder="Record any audit observations, questions, or adjustments required for this document..."
              className="w-full border border-gray-300 rounded p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              rows={6}
            />
            <div className="mt-3 flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700">Save Notes</button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-50">
                Clear
              </button>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Audit Trail</h3>
            <div className="space-y-3 text-xs">
              <div className="flex gap-3 pb-3 border-b">
                <div className="text-gray-500">2025-05-10 14:32</div>
                <div>
                  <div className="font-semibold text-gray-800">Document imported from {document.sourceSystem}</div>
                  <div className="text-gray-600">System: {document.sourceSystem}</div>
                </div>
              </div>
              <div className="flex gap-3 pb-3 border-b">
                <div className="text-gray-500">2025-05-10 14:45</div>
                <div>
                  <div className="font-semibold text-gray-800">Mappings applied</div>
                  <div className="text-gray-600">Cost center and vendor mappings standardized</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-gray-500">2025-05-10 15:02</div>
                <div>
                  <div className="font-semibold text-gray-800">Consolidated to P&L</div>
                  <div className="text-gray-600">Included in line item: {document.lineItem}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
