import { useEffect, useState } from 'react'

const NODES = {
  start: { x: 50, y: 150 },
  task1: { x: 185, y: 150 },
  gateway: { x: 340, y: 150 },
  approvedTask: { x: 515, y: 80 },
  approvedEnd: { x: 740, y: 80 },
  rejectedTask: { x: 515, y: 240 },
  rejectedEnd: { x: 740, y: 240 },
}

const SEQUENCE = {
  approved: ['start', 'task1', 'gateway', 'approvedTask', 'approvedEnd'],
  rejected: ['start', 'task1', 'gateway', 'rejectedTask', 'rejectedEnd'],
}

const STEP_TEXT = {
  approved: [
    'Employee submits a leave request.',
    'Request enters the “Submit Leave Request” task.',
    'Gateway evaluates: has the manager approved?',
    'Approved — leave balance is updated automatically.',
    'Process complete. Employee notified: leave approved.',
  ],
  rejected: [
    'Employee submits a leave request.',
    'Request enters the “Submit Leave Request” task.',
    'Gateway evaluates: has the manager approved?',
    'Rejected — employee is notified automatically.',
    'Process complete. Employee notified: leave rejected.',
  ],
}

const STEP_DURATION = 900
const LAST_STEP = 4

function BpmnDemo() {
  const [branch, setBranch] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || stepIndex >= LAST_STEP) {
      if (stepIndex >= LAST_STEP) setPlaying(false)
      return
    }
    const timer = setTimeout(() => setStepIndex((i) => i + 1), STEP_DURATION)
    return () => clearTimeout(timer)
  }, [playing, stepIndex])

  function play(branchKey) {
    setBranch(branchKey)
    setStepIndex(0)
    setPlaying(true)
  }

  function reset() {
    setPlaying(false)
    setBranch(null)
    setStepIndex(0)
  }

  const sequence = branch ? SEQUENCE[branch] : null
  const token = sequence ? NODES[sequence[stepIndex]] : NODES.start
  const stepText = branch
    ? STEP_TEXT[branch][stepIndex]
    : 'Choose an outcome to run the simulation.'

  function nodeState(id) {
    if (!sequence) return 'idle'
    const idx = sequence.indexOf(id)
    if (idx === -1) return 'idle'
    return idx <= stepIndex ? 'active' : 'idle'
  }

  function edgeState(fromId, toId) {
    if (!sequence) return 'idle'
    const idxTo = sequence.indexOf(toId)
    if (sequence.indexOf(fromId) === -1 || idxTo === -1) return 'idle'
    return stepIndex >= idxTo ? 'active' : 'idle'
  }

  const isActive = (id) => nodeState(id) === 'active'
  const edgeClass = (from, to) =>
    `bpmn-edge${edgeState(from, to) === 'active' ? ' is-active' : ''}`
  const edgeMarker = (from, to) =>
    edgeState(from, to) === 'active' ? 'url(#arrow-active)' : 'url(#arrow-idle)'
  const nodeClass = (id, extra = '') =>
    `${extra}${isActive(id) ? ' is-active' : ''}`

  return (
    <div className="demo-card">
      <div className="demo-card-head">
        <h3>BPMN Workflow — Leave Approval</h3>
        <p>
          A simplified BPMN 2.0 process, the kind I model at work: an
          employee submits a leave request, a manager decides, and the
          outcome routes down one of two paths. Run it below.
        </p>
      </div>

      <svg
        viewBox="0 0 820 300"
        className="bpmn-svg"
        role="img"
        aria-label="Animated BPMN diagram of a leave approval process"
      >
        <defs>
          <marker
            id="arrow-idle"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="bpmn-arrow-idle" />
          </marker>
          <marker
            id="arrow-active"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="bpmn-arrow-active" />
          </marker>
        </defs>

        {/* edges */}
        <line x1={68} y1={150} x2={110} y2={150} className={edgeClass('start', 'task1')} markerEnd={edgeMarker('start', 'task1')} />
        <line x1={260} y1={150} x2={312} y2={150} className={edgeClass('task1', 'gateway')} markerEnd={edgeMarker('task1', 'gateway')} />
        <line x1={340} y1={122} x2={430} y2={82} className={edgeClass('gateway', 'approvedTask')} markerEnd={edgeMarker('gateway', 'approvedTask')} />
        <line x1={600} y1={80} x2={722} y2={80} className={edgeClass('approvedTask', 'approvedEnd')} markerEnd={edgeMarker('approvedTask', 'approvedEnd')} />
        <line x1={340} y1={178} x2={430} y2={238} className={edgeClass('gateway', 'rejectedTask')} markerEnd={edgeMarker('gateway', 'rejectedTask')} />
        <line x1={600} y1={240} x2={722} y2={240} className={edgeClass('rejectedTask', 'rejectedEnd')} markerEnd={edgeMarker('rejectedTask', 'rejectedEnd')} />

        <text x={392} y={90} className={`bpmn-branch-label${branch === 'approved' ? ' is-active' : ''}`}>Yes</text>
        <text x={392} y={214} className={`bpmn-branch-label${branch === 'rejected' ? ' is-active' : ''}`}>No</text>

        {/* start event */}
        <circle cx={50} cy={150} r={18} className={nodeClass('start', 'bpmn-event bpmn-event-start')} />
        <text x={50} y={188} className="bpmn-label">Leave Requested</text>

        {/* task 1 */}
        <rect x={110} y={120} width={150} height={60} rx={10} className={nodeClass('task1', 'bpmn-task')} />
        <text x={185} y={154} className="bpmn-task-label">Submit Leave Request</text>

        {/* gateway */}
        <polygon points="340,122 368,150 340,178 312,150" className={nodeClass('gateway', 'bpmn-gateway')} />
        <text x={340} y={155} className="bpmn-gateway-mark">×</text>
        <text x={340} y={104} className="bpmn-label">Manager Approves?</text>

        {/* approved branch */}
        <rect x={430} y={50} width={170} height={60} rx={10} className={nodeClass('approvedTask', 'bpmn-task')} />
        <text x={515} y={84} className="bpmn-task-label">Update Leave Balance</text>
        <circle cx={740} cy={80} r={18} className={nodeClass('approvedEnd', 'bpmn-event bpmn-event-end')} />
        <text x={740} y={118} className="bpmn-label">Leave Approved</text>

        {/* rejected branch */}
        <rect x={430} y={210} width={170} height={60} rx={10} className={nodeClass('rejectedTask', 'bpmn-task')} />
        <text x={515} y={244} className="bpmn-task-label">Notify Employee</text>
        <circle cx={740} cy={240} r={18} className={nodeClass('rejectedEnd', 'bpmn-event bpmn-event-end')} />
        <text x={740} y={278} className="bpmn-label">Leave Rejected</text>

        {/* animated token */}
        {branch && (
          <circle cx={token.x} cy={token.y} r={7} className="bpmn-token" />
        )}
      </svg>

      <div className="demo-controls">
        <button type="button" className="btn btn-outline" onClick={() => play('approved')} disabled={playing}>
          Simulate: Manager Approves
        </button>
        <button type="button" className="btn btn-outline" onClick={() => play('rejected')} disabled={playing}>
          Simulate: Manager Rejects
        </button>
        <button type="button" className="btn btn-ghost" onClick={reset}>
          Reset
        </button>
      </div>

      <p className="demo-console">{stepText}</p>
    </div>
  )
}

export default BpmnDemo
