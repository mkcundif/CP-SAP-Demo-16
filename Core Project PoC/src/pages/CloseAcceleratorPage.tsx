import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, AlertCircle, ChevronDown, Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { closeTasks, closeExceptions, accrualSuggestions, CloseTask, CloseException } from '../lib/mockMergerData'

export default function CloseAcceleratorPage() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<CloseTask[]>(closeTasks)
  const [exceptions, setExceptions] = useState<CloseException[]>(closeExceptions)
  const [showDemo, setShowDemo] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [showAccruals, setShowAccruals] = useState(false)
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate metrics
  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const taskTimeSavings = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.timeSavings, 0)
  const projectedCloseTime = Math.max(2.0, 5.0 - taskTimeSavings / 24)
  const closeReadiness = Math.round((completedTasks / totalTasks) * 100)
  const openExceptions = exceptions.filter((e) => e.status === 'open').length

  // Chart data
  const timelineData = [
    { phase: 'Day 1', baseline: 24, accelerated: 24 * (projectedCloseTime / 5) },
    { phase: 'Day 2', baseline: 48, accelerated: 48 * (projectedCloseTime / 5) },
    { phase: 'Day 3', baseline: 72, accelerated: 72 * (projectedCloseTime / 5) },
    { phase: 'Day 4', baseline: 96, accelerated: 96 * (projectedCloseTime / 5) },
    { phase: 'Day 5', baseline: 120, accelerated: 120 * (projectedCloseTime / 5) },
  ]

  // Handlers
  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)))
  }

  const resolveException = (exceptionId: string) => {
    setExceptions(exceptions.map((e) => (e.id === exceptionId ? { ...e, status: 'resolved' } : e)))
  }

  const handleAutoMatchIntercompany = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Resolve unmatched intercompany exceptions
    setExceptions(
      exceptions.map((e) => (e.type === 'unmatched_intercompany' && e.status === 'open' ? { ...e, status: 'resolved' } : e))
    )
    setIsLoading(false)
  }

  const handleVendorDedup = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setShowAccruals(true)
    // Auto-resolve duplicate vendor
    setExceptions(
      exceptions.map((e) => (e.type === 'duplicate_vendor' && e.status === 'open' ? { ...e, status: 'resolved' } : e))
    )
    setIsLoading(false)
  }

  const handleGenerateAccruals = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Auto-resolve accrual mismatch
    setExceptions(
      exceptions.map((e) => (e.type === 'accrual_mismatch' && e.status === 'open' ? { ...e, status: 'resolved' } : e))
    )
    setIsLoading(false)
  }

  const ExceptionTraceback = ({ exceptionId }: { exceptionId: string }) => {
    const exception = exceptions.find((e) => e.id === exceptionId)
    if (!exception) return null

    return (
      <div className="bg-gray-50 border border-gray-200 rounded p-4 my-4 text-xs">
        <h4 className="font-bold mb-2">Exception Traceback</h4>
        <div className="space-y-2 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Type:</span>
            <span className="font-bold">{exception.type.replace(/_/g, ' ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Entity:</span>
            <span className="font-bold">{exception.entity}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">System:</span>
            <span className="font-bold">{exception.sourceSystem}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Amount:</span>
            <span className="font-bold">${exception.amount.toLocaleString()}</span>
          </div>
          {exception.relatedDocId && (
            <div className="border-t pt-2 mt-2">
              <button
                onClick={() => navigate(`/finance/traceback/${exception.relatedDocId}`)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                → View Document Audit Trail
              </button>
            </div>
          )}
        </div>
      </div>
    )
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
          <h1 className="text-lg font-bold">Month-End Close Accelerator (TMH + Raymond)</h1>
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
          {/* KPI Strip */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Baseline Close Time</div>
              <div className="text-2xl font-bold text-gray-800">5.0 days</div>
              <div className="text-xs text-gray-500 mt-1">Pre-merger standard</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Projected Close Time</div>
              <div className="text-2xl font-bold" style={{ color: projectedCloseTime <= 2.5 ? '#28a745' : '#ff9800' }}>
                {projectedCloseTime.toFixed(1)} days
              </div>
              <div className="text-xs text-gray-500 mt-1">Target: 2.0 days</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Tasks Completed</div>
              <div className="text-2xl font-bold text-gray-800">
                {completedTasks}/{totalTasks}
              </div>
              <div className="text-xs text-gray-500 mt-1">Merger-specific workflow</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-xs text-gray-600 mb-1">Exceptions Remaining</div>
              <div className="text-2xl font-bold" style={{ color: openExceptions > 0 ? '#dc3545' : '#28a745' }}>
                {openExceptions}
              </div>
              <div className="text-xs text-gray-500 mt-1">Requiring resolution</div>
            </div>
          </div>

          {/* Close Readiness Progress */}
          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">Close Readiness</h3>
              <span className="text-sm font-bold text-gray-700">{closeReadiness}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-3">
              <div
                className="bg-blue-600 h-3 rounded transition-all duration-300"
                style={{ width: `${closeReadiness}%` }}
              ></div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left: Task Checklist */}
            <div className="col-span-2 bg-white rounded shadow p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Merger Integration Close Tasks</h2>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-600">{task.description}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 whitespace-nowrap">-{task.timeSavings}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Automation Panel */}
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Merger Automation</h2>
              <div className="space-y-3">
                <button
                  onClick={handleAutoMatchIntercompany}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={16} />
                  {isLoading ? 'Running...' : 'Intercompany Match'}
                </button>
                <button
                  onClick={handleVendorDedup}
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} />
                  {isLoading ? 'Running...' : 'Vendor Deduplication'}
                </button>
                <button
                  onClick={handleGenerateAccruals}
                  disabled={isLoading}
                  className="w-full bg-orange-600 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-orange-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <AlertCircle size={16} />
                  {isLoading ? 'Generating...' : 'Generate Accruals'}
                </button>
              </div>
            </div>
          </div>

          {/* Accrual Suggestions Panel */}
          {showAccruals && (
            <div className="bg-white rounded shadow p-4 border-l-4 border-green-600">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  Merger-Related Accrual Suggestions
                </h3>
                <button
                  onClick={() => setShowAccruals(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Dismiss
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left px-3 py-2 font-bold">GL Account</th>
                      <th className="text-left px-3 py-2 font-bold">Description</th>
                      <th className="text-right px-3 py-2 font-bold">Amount</th>
                      <th className="text-center px-3 py-2 font-bold">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accrualSuggestions.map((acr) => (
                      <tr key={acr.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 font-mono text-gray-700">{acr.account}</td>
                        <td className="px-3 py-2 text-gray-700">{acr.description}</td>
                        <td className="px-3 py-2 text-right text-gray-800 font-semibold">${acr.amount.toLocaleString()}</td>
                        <td className="px-3 py-2 text-center">
                          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">{acr.confidence}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Exceptions Queue */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Merger Integration Exceptions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left px-3 py-2 font-bold">Type</th>
                    <th className="text-left px-3 py-2 font-bold">Description</th>
                    <th className="text-right px-3 py-2 font-bold">Amount</th>
                    <th className="text-center px-3 py-2 font-bold">Entity</th>
                    <th className="text-center px-3 py-2 font-bold">System</th>
                    <th className="text-center px-3 py-2 font-bold">Status</th>
                    <th className="text-center px-3 py-2 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exceptions.map((exc) => (
                    <>
                      <tr key={exc.id} className={`border-b ${exc.status === 'resolved' ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                        <td className="px-3 py-2 font-semibold text-gray-800">{exc.type.replace(/_/g, ' ')}</td>
                        <td className="px-3 py-2 text-gray-700">{exc.description}</td>
                        <td className="px-3 py-2 text-right text-gray-800 font-semibold">${exc.amount.toLocaleString()}</td>
                        <td className="px-3 py-2 text-center font-mono text-gray-700">{exc.entity}</td>
                        <td className="px-3 py-2 text-center font-mono text-gray-700">{exc.sourceSystem}</td>
                        <td className="px-3 py-2 text-center">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
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
                        <td className="px-3 py-2 text-center">
                          {exc.status === 'open' ? (
                            <div className="flex gap-1 justify-center">
                              <button
                                onClick={() => resolveException(exc.id)}
                                className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                              >
                                Resolve
                              </button>
                              <button
                                onClick={() => setSelectedExceptionId(selectedExceptionId === exc.id ? null : exc.id)}
                                className="bg-gray-400 text-white px-2 py-1 rounded text-xs hover:bg-gray-500"
                              >
                                {selectedExceptionId === exc.id ? 'Hide' : 'View'}
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">✓ Resolved</span>
                          )}
                        </td>
                      </tr>
                      {selectedExceptionId === exc.id && (
                        <tr className="bg-blue-50 border-b">
                          <td colSpan={7} className="px-3 py-0">
                            <ExceptionTraceback exceptionId={exc.id} />
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Close Timeline Acceleration (Merger Integration)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="phase" stroke="#666" />
                <YAxis stroke="#666" label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${(value as number).toFixed(1)}h`} />
                <Legend />
                <Bar dataKey="baseline" fill="#999" name="Baseline (5 days)" />
                <Bar dataKey="accelerated" fill="#28a745" name="With Merger Automation" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Demo Guidance */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center gap-2 font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              <Clock size={18} />
              60-Second Demo Walkthrough
              <ChevronDown size={18} style={{ transform: showDemo ? 'rotate(180deg)' : '' }} className="transition-transform" />
            </button>
            {showDemo && (
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-bold">1.</span> Check 2–3 tasks in the "Close Tasks" list (left) → Projected time drops, readiness %
                  increases
                </p>
                <p>
                  <span className="font-bold">2.</span> Click "Intercompany Match" → Resolves unmatched intercompany invoice exceptions
                </p>
                <p>
                  <span className="font-bold">3.</span> Click "Vendor Deduplication" → Identifies and resolves duplicate vendor records
                </p>
                <p>
                  <span className="font-bold">4.</span> Click "Generate Accruals" → Shows merger-related accrual suggestions, resolves
                  accrual mismatch
                </p>
                <p>
                  <span className="font-bold">5.</span> Resolve 1–2 remaining exceptions in the table → Exceptions count continues to drop
                </p>
                <p>
                  <span className="font-bold">6.</span> Click "View" on an exception → See detailed lineage & links to audit traceback
                </p>
                <p className="mt-3 font-bold text-blue-700">
                  Result: Projected close time approaches 2.0 days (60% acceleration)! Merged entity consolidated in 2 days vs. 5 days
                  pre-merger.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
