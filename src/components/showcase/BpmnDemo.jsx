import { useEffect, useState } from 'react'

const NODES = {
  start: { x: 350, y: 34 },
  task1: { x: 350, y: 128 },
  gateway: { x: 350, y: 224 },
  approvedTask: { x: 190, y: 334 },
  rejectedTask: { x: 510, y: 334 },
  approvedEnd: { x: 190, y: 440 },
  rejectedEnd: { x: 510, y: 440 },
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

// Small hand-drawn line icons, drawn on a local 24x24 grid and positioned
// via a translate wrapper so each node can host one inside its badge.
const ICONS = {
  send: 'M3 12 L21 4 L14 12 L21 20 Z',
  inbox: 'M4 4 L4 15 L20 15 L20 4 M9 4 L9 9 L15 9 L15 4',
  branch: 'M12 3 L12 12 M12 12 L6 19 M12 12 L18 19',
  edit: 'M4 20 L4.9 15.8 L15.4 5.3 L18.7 8.6 L8.2 19.1 Z',
  bell: 'M12 3.5 A4 4 0 0 0 8 7.5 V10.5 C8 11.8 7.3 13.7 6 14.8 H18 C16.7 13.7 16 11.8 16 10.5 V7.5 A4 4 0 0 0 12 3.5 M9.5 18 A2.5 2.5 0 0 0 14.5 18',
  check: 'M5 12.5 L10 17.5 L19 6.5',
  x: 'M6 6 L18 18 M18 6 L6 18',
}

function Icon({ name, className }) {
  return (
    <path
      d={ICONS[name]}
      className={className}
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

function curve(from, to) {
  const midY = (from.y + to.y) / 2
  return `M${from.x},${from.y} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y}`
}

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
  const outcomeClass = branch === 'approved' ? 'is-good' : branch === 'rejected' ? 'is-bad' : ''

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
  const colorClassFor = (branchKey) => (branchKey === 'approved' ? 'is-good' : 'is-bad')

  function edgeClass(from, to, branchKey) {
    const active = edgeState(from, to) === 'active'
    return `bpmn-edge${active ? ` is-active ${colorClassFor(branchKey || branch)}` : ''}`
  }

  function nodeClass(id, extra, branchKey) {
    const active = isActive(id)
    return `${extra}${active ? ` is-active ${colorClassFor(branchKey || branch)}` : ''}`
  }

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
        viewBox="0 0 700 480"
        className="bpmn-svg"
        role="img"
        aria-label="Animated BPMN diagram of a leave approval process"
      >
        {/* edges */}
        <path d={curve(NODES.start, NODES.task1)} className={edgeClass('start', 'task1')} />
        <path d={curve(NODES.task1, NODES.gateway)} className={edgeClass('task1', 'gateway')} />
        <path d={curve(NODES.gateway, NODES.approvedTask)} className={edgeClass('gateway', 'approvedTask', 'approved')} />
        <path d={curve(NODES.approvedTask, NODES.approvedEnd)} className={edgeClass('approvedTask', 'approvedEnd', 'approved')} />
        <path d={curve(NODES.gateway, NODES.rejectedTask)} className={edgeClass('gateway', 'rejectedTask', 'rejected')} />
        <path d={curve(NODES.rejectedTask, NODES.rejectedEnd)} className={edgeClass('rejectedTask', 'rejectedEnd', 'rejected')} />

        <text x={252} y={272} className={`bpmn-branch-label${branch === 'approved' ? ' is-active is-good' : ''}`}>Yes</text>
        <text x={448} y={272} className={`bpmn-branch-label${branch === 'rejected' ? ' is-active is-bad' : ''}`}>No</text>

        {/* start event */}
        <circle cx={NODES.start.x} cy={NODES.start.y} r={15} className={nodeClass('start', 'bpmn-event bpmn-event-start')} />
        <g transform={`translate(${NODES.start.x - 8}, ${NODES.start.y - 8})`}>
          <Icon name="send" className={`bpmn-icon${isActive('start') ? ' is-active' : ''}`} />
        </g>
        <text x={NODES.start.x} y={NODES.start.y + 32} className="bpmn-label">Leave Requested</text>

        {/* task 1 */}
        <rect x={NODES.task1.x - 100} y={NODES.task1.y - 34} width={200} height={68} rx={14} className={nodeClass('task1', 'bpmn-task')} />
        <circle cx={NODES.task1.x} cy={NODES.task1.y - 12} r={13} className={`bpmn-icon-badge${isActive('task1') ? ' is-active' : ''}`} />
        <g transform={`translate(${NODES.task1.x - 8}, ${NODES.task1.y - 20})`}>
          <Icon name="inbox" className={`bpmn-icon${isActive('task1') ? ' is-active' : ''}`} />
        </g>
        <text x={NODES.task1.x} y={NODES.task1.y + 20} className="bpmn-task-label">Submit Leave Request</text>

        {/* gateway */}
        <polygon
          points={`${NODES.gateway.x},${NODES.gateway.y - 32} ${NODES.gateway.x + 32},${NODES.gateway.y} ${NODES.gateway.x},${NODES.gateway.y + 32} ${NODES.gateway.x - 32},${NODES.gateway.y}`}
          className={nodeClass('gateway', 'bpmn-gateway')}
        />
        <g transform={`translate(${NODES.gateway.x - 8}, ${NODES.gateway.y - 8})`}>
          <Icon name="branch" className={`bpmn-icon${isActive('gateway') ? ' is-active' : ''}`} />
        </g>
        <text x={NODES.gateway.x} y={NODES.gateway.y - 44} className="bpmn-label">Manager Approves?</text>

        {/* approved branch */}
        <rect x={NODES.approvedTask.x - 92} y={NODES.approvedTask.y - 34} width={184} height={68} rx={14} className={nodeClass('approvedTask', 'bpmn-task', 'approved')} />
        <circle cx={NODES.approvedTask.x} cy={NODES.approvedTask.y - 12} r={13} className={`bpmn-icon-badge${nodeState('approvedTask') === 'active' ? ' is-active is-good' : ''}`} />
        <g transform={`translate(${NODES.approvedTask.x - 8}, ${NODES.approvedTask.y - 20})`}>
          <Icon name="edit" className={`bpmn-icon${nodeState('approvedTask') === 'active' ? ' is-active is-good' : ''}`} />
        </g>
        <text x={NODES.approvedTask.x} y={NODES.approvedTask.y + 20} className="bpmn-task-label">Update Leave Balance</text>

        <circle cx={NODES.approvedEnd.x} cy={NODES.approvedEnd.y} r={17} className={nodeClass('approvedEnd', 'bpmn-event bpmn-event-end', 'approved')} />
        <g transform={`translate(${NODES.approvedEnd.x - 7}, ${NODES.approvedEnd.y - 7})`}>
          <Icon name="check" className={`bpmn-icon${nodeState('approvedEnd') === 'active' ? ' is-active is-good' : ''}`} />
        </g>
        <text x={NODES.approvedEnd.x} y={NODES.approvedEnd.y + 34} className="bpmn-label">Leave Approved</text>

        {/* rejected branch */}
        <rect x={NODES.rejectedTask.x - 92} y={NODES.rejectedTask.y - 34} width={184} height={68} rx={14} className={nodeClass('rejectedTask', 'bpmn-task', 'rejected')} />
        <circle cx={NODES.rejectedTask.x} cy={NODES.rejectedTask.y - 12} r={13} className={`bpmn-icon-badge${nodeState('rejectedTask') === 'active' ? ' is-active is-bad' : ''}`} />
        <g transform={`translate(${NODES.rejectedTask.x - 8}, ${NODES.rejectedTask.y - 20})`}>
          <Icon name="bell" className={`bpmn-icon${nodeState('rejectedTask') === 'active' ? ' is-active is-bad' : ''}`} />
        </g>
        <text x={NODES.rejectedTask.x} y={NODES.rejectedTask.y + 20} className="bpmn-task-label">Notify Employee</text>

        <circle cx={NODES.rejectedEnd.x} cy={NODES.rejectedEnd.y} r={17} className={nodeClass('rejectedEnd', 'bpmn-event bpmn-event-end', 'rejected')} />
        <g transform={`translate(${NODES.rejectedEnd.x - 7}, ${NODES.rejectedEnd.y - 7})`}>
          <Icon name="x" className={`bpmn-icon${nodeState('rejectedEnd') === 'active' ? ' is-active is-bad' : ''}`} />
        </g>
        <text x={NODES.rejectedEnd.x} y={NODES.rejectedEnd.y + 34} className="bpmn-label">Leave Rejected</text>

        {/* animated token */}
        {branch && (
          <circle
            cx={token.x}
            cy={token.y}
            r={7}
            className={`bpmn-token ${stepIndex >= 3 ? outcomeClass : ''}`}
          />
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

      <p className={`demo-console ${branch && stepIndex >= 3 ? outcomeClass : ''}`}>{stepText}</p>
    </div>
  )
}

export default BpmnDemo
