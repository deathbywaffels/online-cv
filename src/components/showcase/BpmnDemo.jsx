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

const CYCLE = ['approved', 'rejected']
const STEP_DURATION = 900
const PAUSE_DURATION = 1800
const LAST_STEP = 4

// Small hand-drawn line icons on a shared 24x24 grid, centered at (12,12)
// so they can be placed and scaled consistently via <IconAt>.
const ICONS = {
  send: 'M3 12 L21 4 L14 12 L21 20 Z',
  document: 'M6 3 H15 L18 6 V21 H6 Z M15 3 V6 H18',
  branch: 'M12 3 L12 12 M12 12 L6 19 M12 12 L18 19',
  edit: 'M5 19 L6 15 L15 6 L18 9 L9 18 Z M15 6 L18 9',
  bell: 'M12 5 A5 5 0 0 0 7 10 V13 L5 17.5 H19 L17 13 V10 A5 5 0 0 0 12 5 M9.5 19.5 A2.5 2.5 0 0 0 14.5 19.5',
  check: 'M5 12.5 L10 17.5 L19 6.5',
  x: 'M6 6 L18 18 M18 6 L6 18',
}

function IconAt({ name, x, y, size = 16, className }) {
  const scale = size / 24
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2}) scale(${scale})`}>
      <path
        d={ICONS[name]}
        className={className}
        fill="none"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  )
}

function curve(from, to) {
  const midY = (from.y + to.y) / 2
  return `M${from.x},${from.y} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y}`
}

function BpmnDemo() {
  const [cycleIndex, setCycleIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  const branch = CYCLE[cycleIndex]
  const sequence = SEQUENCE[branch]

  useEffect(() => {
    const atEnd = stepIndex >= LAST_STEP
    const timer = setTimeout(
      () => {
        if (atEnd) {
          setCycleIndex((i) => (i + 1) % CYCLE.length)
          setStepIndex(0)
        } else {
          setStepIndex((i) => i + 1)
        }
      },
      atEnd ? PAUSE_DURATION : STEP_DURATION,
    )
    return () => clearTimeout(timer)
  }, [stepIndex, cycleIndex])

  const token = NODES[sequence[stepIndex]]
  const stepText = STEP_TEXT[branch][stepIndex]
  const outcomeClass = branch === 'approved' ? 'is-good' : 'is-bad'

  function nodeState(id) {
    const idx = sequence.indexOf(id)
    return idx !== -1 && idx <= stepIndex ? 'active' : 'idle'
  }

  const isActive = (id) => nodeState(id) === 'active'
  const colorClassFor = (branchKey) => (branchKey === 'approved' ? 'is-good' : 'is-bad')

  function edgeState(fromId, toId) {
    const idxTo = sequence.indexOf(toId)
    if (sequence.indexOf(fromId) === -1 || idxTo === -1) return 'idle'
    return stepIndex >= idxTo ? 'active' : 'idle'
  }

  function edgeClass(from, to, branchKey) {
    const active = edgeState(from, to) === 'active'
    return `bpmn-edge${active ? ` is-active ${colorClassFor(branchKey || branch)}` : ''}`
  }

  function nodeClass(id, extra, branchKey) {
    const active = isActive(id)
    return `${extra}${active ? ` is-active ${colorClassFor(branchKey || branch)}` : ''}`
  }

  function iconClass(id, branchKey) {
    return `bpmn-icon${isActive(id) ? ` is-active ${colorClassFor(branchKey || branch)}` : ''}`
  }

  return (
    <div className="demo-card">
      <div className="demo-card-head">
        <h3>BPMN Workflow — Leave Approval</h3>
        <p>
          A simplified BPMN 2.0 process, the kind I model at work: an
          employee submits a leave request, a manager decides, and the
          outcome routes down one of two paths. The simulation below loops
          continuously between both outcomes.
        </p>
      </div>

      <svg
        viewBox="0 0 700 480"
        className="bpmn-svg"
        role="img"
        aria-label="Animated BPMN diagram of a leave approval process, looping between an approved and a rejected outcome"
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
        <IconAt name="send" x={NODES.start.x} y={NODES.start.y} className={iconClass('start')} />
        <text x={NODES.start.x} y={NODES.start.y + 32} className="bpmn-label">Leave Requested</text>

        {/* task 1 */}
        <rect x={NODES.task1.x - 100} y={NODES.task1.y - 34} width={200} height={68} rx={14} className={nodeClass('task1', 'bpmn-task')} />
        <circle cx={NODES.task1.x} cy={NODES.task1.y - 12} r={13} className={`bpmn-icon-badge${isActive('task1') ? ` is-active ${colorClassFor(branch)}` : ''}`} />
        <IconAt name="document" x={NODES.task1.x} y={NODES.task1.y - 12} className={iconClass('task1')} />
        <text x={NODES.task1.x} y={NODES.task1.y + 20} className="bpmn-task-label">Submit Leave Request</text>

        {/* gateway */}
        <polygon
          points={`${NODES.gateway.x},${NODES.gateway.y - 32} ${NODES.gateway.x + 32},${NODES.gateway.y} ${NODES.gateway.x},${NODES.gateway.y + 32} ${NODES.gateway.x - 32},${NODES.gateway.y}`}
          className={nodeClass('gateway', 'bpmn-gateway')}
        />
        <IconAt name="branch" x={NODES.gateway.x} y={NODES.gateway.y} className={iconClass('gateway')} />
        <text x={NODES.gateway.x} y={NODES.gateway.y - 44} className="bpmn-label">Manager Approves?</text>

        {/* approved branch */}
        <rect x={NODES.approvedTask.x - 92} y={NODES.approvedTask.y - 34} width={184} height={68} rx={14} className={nodeClass('approvedTask', 'bpmn-task', 'approved')} />
        <circle cx={NODES.approvedTask.x} cy={NODES.approvedTask.y - 12} r={13} className={`bpmn-icon-badge${nodeState('approvedTask') === 'active' ? ' is-active is-good' : ''}`} />
        <IconAt name="edit" x={NODES.approvedTask.x} y={NODES.approvedTask.y - 12} className={iconClass('approvedTask', 'approved')} />
        <text x={NODES.approvedTask.x} y={NODES.approvedTask.y + 20} className="bpmn-task-label">Update Leave Balance</text>

        <circle cx={NODES.approvedEnd.x} cy={NODES.approvedEnd.y} r={17} className={nodeClass('approvedEnd', 'bpmn-event bpmn-event-end', 'approved')} />
        <IconAt name="check" x={NODES.approvedEnd.x} y={NODES.approvedEnd.y} className={iconClass('approvedEnd', 'approved')} />
        <text x={NODES.approvedEnd.x} y={NODES.approvedEnd.y + 34} className="bpmn-label">Leave Approved</text>

        {/* rejected branch */}
        <rect x={NODES.rejectedTask.x - 92} y={NODES.rejectedTask.y - 34} width={184} height={68} rx={14} className={nodeClass('rejectedTask', 'bpmn-task', 'rejected')} />
        <circle cx={NODES.rejectedTask.x} cy={NODES.rejectedTask.y - 12} r={13} className={`bpmn-icon-badge${nodeState('rejectedTask') === 'active' ? ' is-active is-bad' : ''}`} />
        <IconAt name="bell" x={NODES.rejectedTask.x} y={NODES.rejectedTask.y - 12} className={iconClass('rejectedTask', 'rejected')} />
        <text x={NODES.rejectedTask.x} y={NODES.rejectedTask.y + 20} className="bpmn-task-label">Notify Employee</text>

        <circle cx={NODES.rejectedEnd.x} cy={NODES.rejectedEnd.y} r={17} className={nodeClass('rejectedEnd', 'bpmn-event bpmn-event-end', 'rejected')} />
        <IconAt name="x" x={NODES.rejectedEnd.x} y={NODES.rejectedEnd.y} className={iconClass('rejectedEnd', 'rejected')} />
        <text x={NODES.rejectedEnd.x} y={NODES.rejectedEnd.y + 34} className="bpmn-label">Leave Rejected</text>

        {/* animated token */}
        <circle
          cx={token.x}
          cy={token.y}
          r={7}
          className={`bpmn-token ${stepIndex >= 3 ? outcomeClass : ''}`}
        />
      </svg>

      <p className={`demo-console ${stepIndex >= 3 ? outcomeClass : ''}`}>{stepText}</p>
    </div>
  )
}

export default BpmnDemo
