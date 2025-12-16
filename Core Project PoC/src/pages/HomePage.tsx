import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  Database,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  TrendingDown,
  Eye,
  FileText,
  Zap,
  PieChart,
  ArrowUpRight,
  Activity,
  LayoutDashboard,
} from 'lucide-react'
import FioriShell, { TabType } from '../components/FioriShell'
import LaunchpadTile from '../components/LaunchpadTile'
import Section from '../components/Section'

export default function HomePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('account-payable')

  // News/Hero Tile - matching the image
  const NewsTile = () => (
    <div
      className="col-span-1 md:col-span-2 lg:col-span-2 rounded-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer min-h-[180px] relative"
      onClick={() => navigate('/consolidated-pl')}
      style={{
        background: 'linear-gradient(135deg, #1e5a96 0%, #2d7ab3 100%)',
      }}
    >
      <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
        <div>
          <h3 className="text-lg font-bold mb-2 leading-tight">The Most Resilient Businesses Let Intelligent Data Speak for Itself</h3>
        </div>
        <div>
          <p className="text-xs text-blue-100 mb-1">Today, SAP News</p>
          <p className="text-xs text-blue-100">May 21, 2021</p>
        </div>
      </div>
    </div>
  )

  return (
    <FioriShell activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Main Background */}
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100%' }}>
        {/* Content Container */}
        <div className="max-w-7xl mx-auto pb-12">
          {/* Account Payable Tab */}
          {activeTab === 'account-payable' && (
            <>
              {/* First Row - Featured Tiles */}
              <Section title="">
                <LaunchpadTile
                  title="Accounts Payable Overview"
                  icon={<BarChart3 size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
                <LaunchpadTile
                  title="Manage Customer Line Items"
                  icon={<Users size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/vendor-deduplication')}
                />
                <LaunchpadTile
                  title="Future Receivables"
                  subtitle="80.8 M"
                  updatedText="15 min ago, USD"
                  icon={<TrendingUp size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/data-reconciliation')}
                />
                <LaunchpadTile
                  title="Manage Supplier Line Items"
                  icon={<AlertCircle size={20} />}
                  iconBgColor="#b3c9e0"
                  badge="HOT"
                  onClick={() => navigate('/vendor-deduplication')}
                />
              </Section>

              {/* News Tile Row */}
              <Section title="">
                <NewsTile />
              </Section>

              {/* Account Payable Section */}
              <Section title="Account Payable">
                <LaunchpadTile
                  title="TMH/Raymond Consolidated Financials"
                  subtitle="Single P&L view + auditable traceback"
                  badge="NEW"
                  icon={<BarChart3 size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/finance/consolidated')}
                />
                <LaunchpadTile
                  title="Month-End Close Accelerator"
                  subtitle="Reduce close from 5 days to 2 days"
                  badge="NEW"
                  updatedText="now"
                  icon={<Clock size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/close-accelerator')}
                />
                <LaunchpadTile
                  title="Financial Close Overview"
                  subtitle="Monitor month-end close status & delays"
                  badge="HOT"
                  icon={<LayoutDashboard size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/close/overview')}
                />
                <LaunchpadTile
                  title="Balance Sheet/Income Statement"
                  icon={<FileText size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
                <LaunchpadTile
                  title="Sales Order Fulfillment"
                  subtitle="Delivery Issue in  0.03K"
                  updatedText="0 now"
                  icon={<ArrowUpRight size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/quick-reporting')}
                />
                <LaunchpadTile
                  title="Overdue Payables"
                  subtitle="Today"
                  icon={<AlertCircle size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/data-reconciliation')}
                />
                <LaunchpadTile
                  title="Display Business Volume"
                  subtitle="Condition Contracts"
                  icon={<PieChart size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/quick-reporting')}
                />
              </Section>

              {/* More AP Tiles */}
              <Section title="">
                <LaunchpadTile
                  title="List Incomplete S..."
                  icon={<FileText size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
                <LaunchpadTile
                  title="Aging Analysis"
                  icon={<BarChart3 size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/multi-system-view')}
                />
                <LaunchpadTile
                  title="Cash Flow Analyzer"
                  icon={<TrendingDown size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/data-reconciliation')}
                />
                <LaunchpadTile
                  title="Off-Contract Spend"
                  icon={<Zap size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/quick-reporting')}
                />
              </Section>

              {/* Cash Management Section */}
              <Section title="Cash Management">
                <LaunchpadTile
                  title="Cash Position"
                  subtitle="Today"
                  updatedText="40 min ago"
                  icon={<DollarSign size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
                <LaunchpadTile
                  title="Check Cash Flow Items"
                  icon={<Activity size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/data-reconciliation')}
                />
              </Section>

              {/* Bottom Links Row */}
              <div style={{ paddingLeft: '32px', paddingRight: '32px', marginTop: '24px' }}>
                <div className="flex gap-2 text-xs">
                  <a href="#" className="text-blue-600 hover:underline">Monitor Product Availability</a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-blue-600 hover:underline">List Sales Documents by Object Status</a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-blue-600 hover:underline">Create Sales Orders</a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-blue-600 hover:underline">Automatic Extraction</a>
                </div>
              </div>
            </>
          )}

          {/* Internal Sales Tab */}
          {activeTab === 'internal-sales' && (
            <>
              <Section title="">
                <LaunchpadTile
                  title="Accounts Payable Overview"
                  icon={<BarChart3 size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
                <LaunchpadTile
                  title="Consolidated P&L Dashboard"
                  icon={<PieChart size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
                <LaunchpadTile
                  title="Multi-System Data View"
                  icon={<Eye size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/multi-system-view')}
                />
                <LaunchpadTile
                  title="Revenue Trends"
                  icon={<TrendingUp size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
              </Section>

              <Section title="Internal Sales">
                <LaunchpadTile
                  title="Sales Overview"
                  icon={<BarChart3 size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
                <LaunchpadTile
                  title="Quick Reporting"
                  icon={<Clock size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/quick-reporting')}
                />
                <LaunchpadTile
                  title="Data Reconciliation"
                  icon={<Database size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/data-reconciliation')}
                />
                <LaunchpadTile
                  title="Margin Analysis"
                  icon={<BarChart3 size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
              </Section>
            </>
          )}

          {/* Sourcing and Contracting Tab */}
          {activeTab === 'sourcing' && (
            <>
              <Section title="">
                <LaunchpadTile
                  title="Vendor Deduplication"
                  icon={<AlertCircle size={20} />}
                  iconBgColor="#b3c9e0"
                  badge="HOT"
                  onClick={() => navigate('/vendor-deduplication')}
                />
                <LaunchpadTile
                  title="Consolidation Audit Trail"
                  icon={<CheckCircle size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/consolidation-audit')}
                />
                <LaunchpadTile
                  title="Data Reconciliation"
                  icon={<Database size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/data-reconciliation')}
                />
                <LaunchpadTile
                  title="Contract Overview"
                  icon={<FileText size={20} />}
                  iconBgColor="#b3c9e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
              </Section>

              <Section title="Sourcing and Contracting">
                <LaunchpadTile
                  title="Supplier Management"
                  icon={<Users size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/vendor-deduplication')}
                />
                <LaunchpadTile
                  title="Contract Compliance"
                  icon={<CheckCircle size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/consolidation-audit')}
                />
                <LaunchpadTile
                  title="Supplier Performance"
                  icon={<TrendingUp size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/multi-system-view')}
                />
                <LaunchpadTile
                  title="Purchase Orders"
                  icon={<FileText size={20} />}
                  iconBgColor="#c5d4e0"
                  onClick={() => navigate('/consolidated-pl')}
                />
              </Section>
            </>
          )}
        </div>
      </div>
    </FioriShell>
  )
}
