import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'

const SAP_COLORS = {
  headerBg: '#2D3B50',
  sapBlue: '#0078D4',
  lightGray: '#f5f5f5',
  cardBg: '#ffffff',
  border: '#d0d0d0',
  textPrimary: '#333',
  textSecondary: '#666',
}

export default function QuickReportingPage() {
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
          <h1 style={{ margin: 0, fontSize: '1.8em' }}>Quick Reporting</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Generate executive reports in minutes</p>
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
          <Clock size={64} style={{ color: SAP_COLORS.sapBlue, marginBottom: '20px', opacity: 0.3 }} />
          <h2 style={{ color: SAP_COLORS.textPrimary, marginBottom: '10px' }}>Quick Reporting</h2>
          <p style={{ color: SAP_COLORS.textSecondary, marginBottom: '30px' }}>
            Generate professional executive reports in minutes, perfect for month-end presentations.
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
              <li>Pre-built executive templates (P&L, Balance Sheet, Cash Flow)</li>
              <li>One-click report generation with live data</li>
              <li>Variance analysis and trend charts</li>
              <li>Executive summary with key metrics</li>
              <li>Export to PowerPoint and PDF for presentations</li>
              <li>Customizable formatting and branding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
