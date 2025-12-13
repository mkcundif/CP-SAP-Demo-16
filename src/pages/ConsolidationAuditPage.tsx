import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const SAP_COLORS = {
  headerBg: '#2D3B50',
  sapBlue: '#0078D4',
  lightGray: '#f5f5f5',
  cardBg: '#ffffff',
  border: '#d0d0d0',
  textPrimary: '#333',
  textSecondary: '#666',
}

export default function ConsolidationAuditPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: SAP_COLORS.lightGray }}>
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
          <h1 style={{ margin: 0, fontSize: '1.8em' }}>Consolidation Audit Trail</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Track all changes with full accountability</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div
          style={{
            backgroundColor: SAP_COLORS.cardBg,
            border: `1px solid ${SAP_COLORS.border}`,
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <CheckCircle size={64} style={{ color: SAP_COLORS.sapBlue, marginBottom: '20px', opacity: 0.3 }} />
          <h2 style={{ color: SAP_COLORS.textPrimary, marginBottom: '10px' }}>Audit Trail</h2>
          <p style={{ color: SAP_COLORS.textSecondary, marginBottom: '30px' }}>
            Track all consolidation changes with complete audit trail and user accountability.
          </p>
          <div
            style={{
              backgroundColor: '#f0f7ff',
              padding: '20px',
              borderRadius: '6px',
              textAlign: 'left',
            }}
          >
            <h3 style={{ color: SAP_COLORS.textPrimary, marginTop: 0 }}>Features:</h3>
            <ul style={{ color: SAP_COLORS.textSecondary, lineHeight: '1.8' }}>
              <li>Complete change tracking for all consolidation adjustments</li>
              <li>User and timestamp recording for accountability</li>
              <li>Reason and approval workflow documentation</li>
              <li>Rollback capability for incorrect adjustments</li>
              <li>Compliance reporting for audits and SOX requirements</li>
              <li>Change summary reports and analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
