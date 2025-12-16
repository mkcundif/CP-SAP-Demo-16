import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ConsolidatedPLPage from './pages/ConsolidatedPLPage'
import VendorDeduplicationPage from './pages/VendorDeduplicationPage'
import DataReconciliationPage from './pages/DataReconciliationPage'
import MultiSystemViewPage from './pages/MultiSystemViewPage'
import ConsolidationAuditPage from './pages/ConsolidationAuditPage'
import QuickReportingPage from './pages/QuickReportingPage'
import CloseAcceleratorPage from './pages/CloseAcceleratorPage'
import ConsolidatedMergerFinancePage from './pages/ConsolidatedMergerFinancePage'
import TracebackPage from './pages/TracebackPage'
import FinancialCloseOverviewPage from './pages/FinancialCloseOverviewPage'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consolidated-pl"
          element={
            <ProtectedRoute>
              <ConsolidatedPLPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-deduplication"
          element={
            <ProtectedRoute>
              <VendorDeduplicationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-reconciliation"
          element={
            <ProtectedRoute>
              <DataReconciliationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multi-system-view"
          element={
            <ProtectedRoute>
              <MultiSystemViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consolidation-audit"
          element={
            <ProtectedRoute>
              <ConsolidationAuditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quick-reporting"
          element={
            <ProtectedRoute>
              <QuickReportingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/close-accelerator"
          element={
            <ProtectedRoute>
              <CloseAcceleratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/consolidated"
          element={
            <ProtectedRoute>
              <ConsolidatedMergerFinancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/traceback/:docId"
          element={
            <ProtectedRoute>
              <TracebackPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/close/overview"
          element={
            <ProtectedRoute>
              <FinancialCloseOverviewPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
