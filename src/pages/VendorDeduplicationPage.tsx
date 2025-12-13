import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertCircle, CheckCircle, Trash2 } from 'lucide-react'

const SAP_COLORS = {
  headerBg: '#2D3B50',
  sapBlue: '#0078D4',
  lightGray: '#f5f5f5',
  cardBg: '#ffffff',
  border: '#d0d0d0',
  dangerRed: '#dc3545',
  successGreen: '#28a745',
  warningYellow: '#ffc107',
  textPrimary: '#333',
  textSecondary: '#666',
}

interface VendorDuplicate {
  id: string
  name: string
  occurrences: number
  systems: string[]
  flagged: boolean
}

export default function VendorDeduplicationPage() {
  const navigate = useNavigate()

  const sampleDuplicates: VendorDuplicate[] = [
    {
      id: '1',
      name: 'ABC Bearings Inc',
      occurrences: 3,
      systems: ['SAP', 'JD Edwards', 'THD'],
      flagged: true,
    },
    {
      id: '2',
      name: 'Global Supply Solutions',
      occurrences: 2,
      systems: ['SAP', 'JD Edwards'],
      flagged: true,
    },
    {
      id: '3',
      name: 'Tech Components Ltd',
      occurrences: 2,
      systems: ['JD Edwards', 'THD'],
      flagged: false,
    },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: SAP_COLORS.lightGray }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: SAP_COLORS.headerBg,
          color: 'white',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.2em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ArrowLeft size={24} />
          Back
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8em' }}>Vendor Deduplication</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Identify and merge duplicate vendors</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              backgroundColor: SAP_COLORS.cardBg,
              border: `1px solid ${SAP_COLORS.border}`,
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <div style={{ color: SAP_COLORS.textSecondary, fontSize: '0.9em', marginBottom: '10px' }}>
              Duplicate Vendors Found
            </div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: SAP_COLORS.dangerRed }}>
              {sampleDuplicates.length}
            </div>
          </div>
          <div
            style={{
              backgroundColor: SAP_COLORS.cardBg,
              border: `1px solid ${SAP_COLORS.border}`,
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <div style={{ color: SAP_COLORS.textSecondary, fontSize: '0.9em', marginBottom: '10px' }}>
              Flagged for Review
            </div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: SAP_COLORS.warningYellow }}>
              {sampleDuplicates.filter((d) => d.flagged).length}
            </div>
          </div>
          <div
            style={{
              backgroundColor: SAP_COLORS.cardBg,
              border: `1px solid ${SAP_COLORS.border}`,
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <div style={{ color: SAP_COLORS.textSecondary, fontSize: '0.9em', marginBottom: '10px' }}>
              Data Quality Impact
            </div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: SAP_COLORS.successGreen }}>
              +12%
            </div>
          </div>
        </div>

        {/* Duplicates List */}
        <div
          style={{
            backgroundColor: SAP_COLORS.cardBg,
            border: `1px solid ${SAP_COLORS.border}`,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '20px', borderBottom: `1px solid ${SAP_COLORS.border}` }}>
            <h2 style={{ margin: 0, color: SAP_COLORS.textPrimary }}>Detected Duplicates</h2>
          </div>

          {sampleDuplicates.map((vendor) => (
            <div
              key={vendor.id}
              style={{
                padding: '20px',
                borderBottom: `1px solid ${SAP_COLORS.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '10px',
                  }}
                >
                  {vendor.flagged ? (
                    <AlertCircle size={24} style={{ color: SAP_COLORS.dangerRed }} />
                  ) : (
                    <CheckCircle size={24} style={{ color: SAP_COLORS.successGreen }} />
                  )}
                  <h3 style={{ margin: 0, color: SAP_COLORS.textPrimary, fontSize: '1.1em' }}>
                    {vendor.name}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginLeft: '39px' }}>
                  <span style={{ color: SAP_COLORS.textSecondary, fontSize: '0.9em' }}>
                    Found {vendor.occurrences} times
                  </span>
                  <span style={{ color: SAP_COLORS.textSecondary, fontSize: '0.9em' }}>
                    Systems: {vendor.systems.join(', ')}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {vendor.flagged && (
                  <button
                    style={{
                      backgroundColor: SAP_COLORS.sapBlue,
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9em',
                    }}
                  >
                    Merge
                  </button>
                )}
                <button
                  style={{
                    backgroundColor: '#f5f5f5',
                    border: `1px solid ${SAP_COLORS.border}`,
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div
          style={{
            backgroundColor: '#f0f7ff',
            border: `1px solid ${SAP_COLORS.sapBlue}`,
            borderRadius: '8px',
            padding: '20px',
            marginTop: '30px',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: SAP_COLORS.sapBlue }}>How Deduplication Works</h3>
          <p style={{ color: SAP_COLORS.textSecondary, margin: 0 }}>
            The system uses fuzzy matching and cross-system analysis to identify vendors that appear multiple
            times under slightly different names or codes. When duplicates are detected, the system automatically
            flags them and updates all related transactions to use the consolidated master record. This ensures
            accurate consolidation and prevents over/under-reporting of expenses.
          </p>
        </div>
      </div>
    </div>
  )
}
