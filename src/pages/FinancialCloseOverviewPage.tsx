import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Filter, CheckCircle, Clock, Zap, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import {
  taskLists,
  getDataByTaskList,
  applyIntercompanyMatch,
  applyGoldenVendorMapping,
  applyNormalizeCostCenters,
  type Entity,
  type CloseOverviewData,
  type MergerException,
} from '../lib/mockCloseOverviewData'

export default function FinancialCloseOverviewPage() {
  const navigate = useNavigate()
  const [selectedTaskList, setSelectedTaskList] = useState('AFC-1')
  const [selectedEntity, setSelectedEntity] = useState<Entity>('Both')
  const [selectedPeriod, setSelectedPeriod] = useState('November 2025')
  const [data, setData] = useState<CloseOverviewData>(getDataByTaskList('AFC-1'))
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoSteps, setShowDemoSteps] = useState(false)
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null)

  // Calculate dynamic KPIs
  const openExceptions = data.mergerExceptions.filter((e) => e.status === 'open').length
  const resolvedExceptions = data.mergerExceptions.filter((e) => e.status === 'resolved').length
  
  // Time reduction formula
  const baselineCloseDays = 5.0
  const automationReduction = (resolvedExceptions / data.mergerExceptions.length) * 2.4 // Up to 2.4 days saved
  const exceptionPenalty = openExceptions * 0.05 // Each open exception adds 0.05 days
  const projectedCloseDays = Math.max(2.0, baselineCloseDays - automationReduction + exceptionPenalty)

  const handleTaskListChange = (taskListId: string) => {
    setSelectedTaskList(taskListId)
    setData(getDataByTaskList(taskListId))
  }

  const handleAutomation = async (action: 'intercompany' | 'vendor' | 'costcenter') => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    let newData = data
    if (action === 'intercompany') {
      newData = applyIntercompanyMatch(data)
    } else if (action === 'vendor') {
      newData = applyGoldenVendorMapping(data)
    } else if (action === 'costcenter') {
      newData = applyNormalizeCostCenters(data)
    }
    
    setData(newData)
    setIsLoading(false)
  }

  const handleResolveException = (exceptionId: string) => {
    setData({
      ...data,
      mergerExceptions: data.mergerExceptions.map((exc) =>
        exc.id === exceptionId ? { ...exc, status: 'resolved', resolvedBy: 'manual' } : exc
      ),
    })
  }

  // Filter data by entity
  const filteredErrors = data.numberOfErrorsRows.filter((row) => selectedEntity === 'Both' || row.entity === selectedEntity || row.entity === 'Both')
  const filteredOpenTasks = data.openTasksRows.filter((row) => selectedEntity === 'Both' || row.entity === selectedEntity || row.entity === 'Both')
  const filteredDelayed = data.delayedTaskListsRows.filter((row) => selectedEntity === 'Both' || row.entity === selectedEntity || row.entity === 'Both')
  const filteredExceptions = data.mergerExceptions.filter((row) => selectedEntity === 'Both' || row.entity === selectedEntity || row.entity === 'Both')

  // Donut chart data
  const donutData = [
    { name: 'Completed with Errors', value: data.completionOverview.statusCounts.completedWithErrors, color: '#dc3545' },
    { name: 'Completed with Warnings', value: data.completionOverview.statusCounts.completedWithWarnings, color: '#ff9800' },
    { name: 'Completed without Issues', value: data.completionOverview.statusCounts.completedWithoutIssues, color: '#28a745' },
    { name: 'Others', value: data.completionOverview.statusCounts.others, color: '#999' },
  ]

  // Timeline comparison data
  const timelineData = [
    { name: 'Baseline', value: baselineCloseDays },
    { name: 'Projected', value: projectedCloseDays },
  ]

  const ExceptionTraceback = ({ exception }: { exception: MergerException }) => {
    return (
      <div className="bg-blue-50 p-4 rounded text-xs space-y-2">
        <h4 className="font-bold text-gray-800">Exception Traceback Lineage</h4>
        <div className="space-y-1 font-mono text-gray-700">
          <div>Consolidated Close → <span className="font-bold">{exception.entity}</span> Entity → <span className="font-bold">{exception.sourceSystem}</span> System</div>
          {exception.documentId && <div>Document: {exception.documentId}</div>}
          {exception.vendorLocalId && <div>Vendor (Local): {exception.vendorLocalId} → Enterprise: {exception.vendorEnterpriseId}</div>}
          {exception.costCenterLocal && <div>Cost Center (Local): {exception.costCenterLocal} → Enterprise: {exception.costCenterEnterprise}</div>}
          <div>Impact: ${exception.impact.toLocaleString()}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e9eff5' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-semibold">Back to Launchpad</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Financial Close Overview (TMH + Raymond Merger)</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
        {/* Merger Filters + Data Source Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter size={18} className="text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Filtered By (1): Task List ID</span>
              <select
                value={selectedTaskList}
                onChange={(e) => handleTaskListChange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                {taskLists.map((tl) => (
                  <option key={tl.id} value={tl.id}>
                    {tl.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value as Entity)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="Both">Entity: Both</option>
                <option value="TMH">Entity: TMH</option>
                <option value="Raymond">Entity: Raymond</option>
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="November 2025">Period: November 2025</option>
                <option value="October 2025">Period: October 2025</option>
                <option value="September 2025">Period: September 2025</option>
              </select>
              <button
                onClick={() => {
                  setSelectedTaskList('AFC-1')
                  setSelectedEntity('Both')
                  setData(getDataByTaskList('AFC-1'))
                }}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                Reset filters
              </button>
            </div>
            <div className="flex items-center gap-3">
              {(selectedEntity === 'Both' || selectedEntity === 'TMH') && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded text-xs">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="font-semibold text-green-800">TMH — SAP ECC: Synced ✓</span>
                  <span className="text-green-600">(12 min ago)</span>
                </div>
              )}
              {(selectedEntity === 'Both' || selectedEntity === 'Raymond') && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded text-xs">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="font-semibold text-green-800">Raymond — JD Edwards: Synced ✓</span>
                  <span className="text-green-600">(18 min ago)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs text-gray-600 mb-1">Baseline Close Time</div>
            <div className="text-3xl font-bold text-gray-800">{baselineCloseDays.toFixed(1)} days</div>
            <div className="text-xs text-gray-500 mt-1">Pre-automation</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs text-gray-600 mb-1">Projected Close Time</div>
            <div className="text-3xl font-bold" style={{ color: projectedCloseDays <= 2.5 ? '#28a745' : '#ff9800' }}>
              {projectedCloseDays.toFixed(1)} days
            </div>
            <div className="text-xs text-gray-500 mt-1">Target: 2.0 days</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs text-gray-600 mb-1">Intercompany Match Rate</div>
            <div className="text-3xl font-bold" style={{ color: data.intercompanyMatchRate >= 90 ? '#28a745' : '#ff9800' }}>
              {data.intercompanyMatchRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Merger integration</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-xs text-gray-600 mb-1">Merger Exceptions</div>
            <div className="text-3xl font-bold" style={{ color: openExceptions > 0 ? '#dc3545' : '#28a745' }}>
              {openExceptions}
            </div>
            <div className="text-xs text-gray-500 mt-1">{resolvedExceptions} resolved</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Task Completion Overview - Large Left Card */}
          <div className="col-span-6 row-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Task Completion Overview</h3>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-red-600">{data.completionOverview.completionRate}%</div>
              <div className="text-sm text-gray-600 mt-1">Task Completion Rate</div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  formatter={(value, entry: any) => `${value}: ${entry.payload.value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Automation Actions Card */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Merger Automation</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleAutomation('intercompany')}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                {isLoading ? 'Running...' : 'Run Intercompany Auto-Match'}
              </button>
              <button
                onClick={() => handleAutomation('vendor')}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                {isLoading ? 'Running...' : 'Apply Golden Vendor Mapping'}
              </button>
              <button
                onClick={() => handleAutomation('costcenter')}
                disabled={isLoading}
                className="w-full bg-orange-600 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Clock size={16} />
                {isLoading ? 'Running...' : 'Normalize Cost Centers'}
              </button>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-gray-700">
              <div className="font-semibold mb-1">Automation Impact:</div>
              <div>• Reduces exceptions by 60-80%</div>
              <div>• Increases match rate to 95%+</div>
              <div>• Saves 2.4 days (48% faster)</div>
            </div>
          </div>

          {/* Before vs After Timeline */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Close Timeline Acceleration</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={timelineData} layout="vertical">
                <XAxis type="number" domain={[0, 5.5]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip formatter={(value) => `${(value as number).toFixed(1)} days`} />
                <Bar dataKey="value" fill="#1e5a96" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-xs text-center text-gray-600 mt-2">
              Time savings: {((baselineCloseDays - projectedCloseDays) / baselineCloseDays * 100).toFixed(0)}%
            </div>
          </div>

          {/* Number of Errors */}
          <div className="col-span-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Number of Errors</h3>
            <table className="w-full text-xs">
              <thead className="border-b">
                <tr className="text-left text-gray-600">
                  <th className="pb-2 font-semibold">Closing Task List</th>
                  <th className="pb-2 font-semibold">Person Responsible</th>
                  <th className="pb-2 font-semibold">Errors (Co.Code)</th>
                  <th className="pb-2 font-semibold">Entity</th>
                  <th className="pb-2 font-semibold">System</th>
                </tr>
              </thead>
              <tbody>
                {filteredErrors.slice(0, 5).map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 text-blue-600 cursor-pointer hover:underline">{row.taskList}</td>
                    <td className="py-2 text-blue-600 cursor-pointer hover:underline">{row.personResponsible}</td>
                    <td className="py-2">{row.numberOfErrors} ({row.companyCode})</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${row.entity === 'TMH' ? 'bg-blue-100 text-blue-800' : row.entity === 'Raymond' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {row.entity}
                      </span>
                    </td>
                    <td className="py-2 font-mono text-gray-600">{row.sourceSystem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Open Tasks */}
          <div className="col-span-5 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Open Tasks</h3>
            <div className="text-xs text-gray-500 mb-2">{filteredOpenTasks.filter(t => t.daysOverdue < 0).length} of {filteredOpenTasks.length}</div>
            <table className="w-full text-xs">
              <thead className="border-b">
                <tr className="text-left text-gray-600">
                  <th className="pb-2 font-semibold">Closing Task</th>
                  <th className="pb-2 font-semibold">Task Responsible</th>
                  <th className="pb-2 font-semibold">Days Overdue</th>
                  <th className="pb-2 font-semibold">Entity</th>
                </tr>
              </thead>
              <tbody>
                {filteredOpenTasks.slice(0, 6).map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 text-blue-600 cursor-pointer hover:underline">{row.task}</td>
                    <td className="py-2 text-blue-600 cursor-pointer hover:underline">{row.responsible}</td>
                    <td className="py-2">
                      <span className={`font-semibold ${row.daysOverdue < 0 ? 'text-red-600' : row.daysOverdue === 0 ? 'text-gray-600' : 'text-green-600'}`}>
                        {row.daysOverdue}
                      </span>
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${row.entity === 'TMH' ? 'bg-blue-100 text-blue-800' : row.entity === 'Raymond' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {row.entity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delayed Task Lists - Tall Right Card */}
          <div className="col-span-3 row-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Delayed Task Lists</h3>
            <table className="w-full text-xs">
              <thead className="border-b">
                <tr className="text-left text-gray-600">
                  <th className="pb-2 font-semibold">Closing Task List</th>
                  <th className="pb-2 font-semibold">Closing Type</th>
                  <th className="pb-2 font-semibold">Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {filteredDelayed.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 text-blue-600 cursor-pointer hover:underline">{row.taskList}</td>
                    <td className="py-2 text-gray-700">{row.closingType}</td>
                    <td className="py-2">
                      <span className="font-semibold text-red-600">{row.daysOverdue}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Merger Exceptions Queue - Full Width */}
          <div className="col-span-12 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Merger Exceptions Queue</h3>
            <table className="w-full text-xs">
              <thead className="border-b">
                <tr className="text-left text-gray-600">
                  <th className="pb-2 font-semibold">Exception</th>
                  <th className="pb-2 font-semibold">Description</th>
                  <th className="pb-2 font-semibold">Entity</th>
                  <th className="pb-2 font-semibold">System</th>
                  <th className="pb-2 font-semibold text-right">Impact ($)</th>
                  <th className="pb-2 font-semibold text-center">Status</th>
                  <th className="pb-2 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExceptions.map((exc) => (
                  <>
                    <tr key={exc.id} className={`border-b hover:bg-gray-50 ${exc.status === 'resolved' ? 'bg-green-50' : ''}`}>
                      <td className="py-2 font-semibold text-gray-800">{exc.type}</td>
                      <td className="py-2 text-gray-700">{exc.description}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${exc.entity === 'TMH' ? 'bg-blue-100 text-blue-800' : exc.entity === 'Raymond' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                          {exc.entity}
                        </span>
                      </td>
                      <td className="py-2 font-mono text-gray-600">{exc.sourceSystem}</td>
                      <td className="py-2 text-right font-semibold text-gray-800">${exc.impact.toLocaleString()}</td>
                      <td className="py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            exc.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : exc.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {exc.status}
                        </span>
                      </td>
                      <td className="py-2 text-center">
                        {exc.status === 'open' ? (
                          <div className="flex gap-1 justify-center">
                            <button
                              onClick={() => handleResolveException(exc.id)}
                              className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                            >
                              Resolve
                            </button>
                            <button
                              onClick={() => setSelectedExceptionId(selectedExceptionId === exc.id ? null : exc.id)}
                              className="bg-gray-400 text-white px-2 py-1 rounded text-xs hover:bg-gray-500"
                            >
                              {selectedExceptionId === exc.id ? 'Hide' : 'View Traceback'}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">✓ Resolved by {exc.resolvedBy}</span>
                        )}
                      </td>
                    </tr>
                    {selectedExceptionId === exc.id && (
                      <tr className="bg-blue-50 border-b">
                        <td colSpan={7} className="py-2">
                          <ExceptionTraceback exception={exc} />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Completion Rate Cards */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Completion Rate by Company Code</h3>
            <div className="space-y-2">
              {data.completionByCompanyCode.map((row, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="text-xs text-gray-700 w-48">{row.name}</div>
                  <div className="flex-1 bg-gray-200 rounded h-4 relative">
                    <div
                      className="bg-blue-600 h-4 rounded transition-all"
                      style={{ width: `${row.percentage}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                      {row.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Completion Rate by Task List</h3>
            <div className="space-y-2">
              {data.completionByTaskList.map((row, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="text-xs text-gray-700 w-48">{row.name}</div>
                  <div className="flex-1 bg-gray-200 rounded h-4 relative">
                    <div
                      className="bg-green-600 h-4 rounded transition-all"
                      style={{ width: `${row.percentage}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                      {row.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks to Be Approved */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Tasks to Be Approved</h3>
            <table className="w-full text-xs">
              <thead className="border-b">
                <tr className="text-left text-gray-600">
                  <th className="pb-2 font-semibold">Closing Task</th>
                  <th className="pb-2 font-semibold">Task Responsible</th>
                  <th className="pb-2 font-semibold">Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {data.tasksToBeApprovedRows.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 text-blue-600 cursor-pointer hover:underline">{row.task}</td>
                    <td className="py-2 text-blue-600 cursor-pointer hover:underline">{row.responsible}</td>
                    <td className="py-2">
                      <span className={`font-semibold ${row.daysOverdue < 0 ? 'text-red-600' : row.daysOverdue === 0 ? 'text-gray-600' : 'text-green-600'}`}>
                        {row.daysOverdue}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Demo Steps Panel */}
          <div className="col-span-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <button
              onClick={() => setShowDemoSteps(!showDemoSteps)}
              className="flex items-center gap-2 font-bold text-gray-800 hover:text-blue-600 transition-colors w-full"
            >
              <Clock size={18} />
              60-Second Demo Steps
              <ChevronDown size={18} style={{ transform: showDemoSteps ? 'rotate(180deg)' : '' }} className="transition-transform ml-auto" />
            </button>
            {showDemoSteps && (
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p><span className="font-bold">1.</span> Click "Run Intercompany Auto-Match" → Resolves unmatched intercompany exceptions, match rate increases</p>
                <p><span className="font-bold">2.</span> Click "Apply Golden Vendor Mapping" → Resolves duplicate vendor exceptions</p>
                <p><span className="font-bold">3.</span> Click "Normalize Cost Centers" → Resolves Raymond mapping exceptions</p>
                <p><span className="font-bold">4.</span> Resolve 1-2 remaining exceptions manually using "Resolve" buttons</p>
                <p className="mt-3 font-bold text-blue-700">
                  Result: Projected Close Time approaches 2.0 days (60% faster)! TMH + Raymond consolidated in 2 days vs 5 days baseline.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
