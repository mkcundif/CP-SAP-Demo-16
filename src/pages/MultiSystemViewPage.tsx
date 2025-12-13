import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp } from 'lucide-react'

const SAP_COLORS = {
  headerBg: '#2D3B50',
  sapBlue: '#0078D4',
  lightGray: '#f5f5f5',
  cardBg: '#ffffff',
  border: '#d0d0d0',
  textPrimary: '#333',
  textSecondary: '#666',
}

export default function MultiSystemViewPage() {
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
          <h1 style={{ margin: 0, fontSize: '1.8em' }}>Multi-System Data View</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Unified view across SAP, JD Edwards, and THD</p>
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
          <TrendingUp size={64} style={{ color: SAP_COLORS.sapBlue, marginBottom: '20px', opacity: 0.3 }} />
          <h2 style={{ color: SAP_COLORS.textPrimary, marginBottom: '10px' }}>
            Multi-System Data Integration
          </h2>
          <p style={{ color: SAP_COLORS.textSecondary, marginBottom: '30px' }}>
            Access live data from all three ERP systems in one unified dashboard.
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
              <li>Real-time data feeds from SAP (TMH), JD Edwards (Raymond), and THD</li>
              <li>Unified data normalization and transformation</li>
              <li>Cross-system search and filtering</li>
              <li>Consolidated views by cost center, department, and entity</li>
              <li>Data quality metrics and health dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
