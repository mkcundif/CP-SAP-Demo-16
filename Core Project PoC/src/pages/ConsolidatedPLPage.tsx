import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Calendar, Download } from 'lucide-react'

const SAP_COLORS = {
  headerBg: '#2D3B50',
  sapBlue: '#0078D4',
  lightGray: '#f5f5f5',
  cardBg: '#ffffff',
  border: '#d0d0d0',
  successGreen: '#28a745',
  textPrimary: '#333',
  textSecondary: '#666',
}

export default function ConsolidatedPLPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: SAP_COLORS.lightGray }}>
      {/* Header with Back Button */}
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
          <h1 style={{ margin: 0, fontSize: '1.8em' }}>Consolidated P&L Dashboard</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Real-time financial statements</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Quick Actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <button
            style={{
              backgroundColor: SAP_COLORS.sapBlue,
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <TrendingUp size={20} />
            View Latest P&L
          </button>
          <button
            style={{
              backgroundColor: 'white',
              color: SAP_COLORS.sapBlue,
              border: `2px solid ${SAP_COLORS.sapBlue}`,
              padding: '15px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Calendar size={20} />
            Select Period
          </button>
          <button
            style={{
              backgroundColor: 'white',
              color: SAP_COLORS.sapBlue,
              border: `2px solid ${SAP_COLORS.sapBlue}`,
              padding: '15px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Download size={20} />
            Export Report
          </button>
        </div>

        {/* Placeholder Content */}
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
            Consolidated P&L Statement
          </h2>
          <p style={{ color: SAP_COLORS.textSecondary, marginBottom: '30px' }}>
            This page will display real-time P&L data consolidated from SAP (TMH), JD Edwards (Raymond), and
            THD systems.
          </p>
          <div
            style={{
              backgroundColor: '#f0f7ff',
              padding: '20px',
              borderRadius: '6px',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <h3 style={{ color: SAP_COLORS.textPrimary, marginTop: 0 }}>Features Coming Soon:</h3>
            <ul style={{ color: SAP_COLORS.textSecondary, lineHeight: '1.8' }}>
              <li>Real-time data aggregation from multiple ERP systems</li>
              <li>Automatic consolidation of accounts and cost centers</li>
              <li>Month-end P&L generation in under 2 hours</li>
              <li>Variance analysis and trend reporting</li>
              <li>Export to Excel for executive presentations</li>
              <li>Year-to-date and comparative period views</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
