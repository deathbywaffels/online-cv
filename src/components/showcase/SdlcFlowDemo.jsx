import { useEffect, useState } from 'react'

const NODES = {
  start: { x: 350, y: 34 },
  taskSpec: { x: 350, y: 128 },
  taskBuild: { x: 350, y: 222 },
  gateway: { x: 350, y: 318 },
  approvedTask: { x: 190, y: 428 },
  rejectedTask: { x: 510, y: 428 },
  approvedEnd: { x: 190, y: 534 },
  rejectedEnd: { x: 510, y: 534 },
}

const SEQUENCE = {
  approved: ['start', 'taskSpec', 'taskBuild', 'gateway', 'approvedTask', 'approvedEnd'],
  rejected: ['start', 'taskSpec', 'taskBuild', 'gateway', 'rejectedTask', 'rejectedEnd'],
}

const STEP_TEXT = {
  approved: [
    'Requirements are gathered from the business, with an SLA attached.',
    'A technical spec is written against that SLA.',
    'The feature is built to spec.',
    'Gateway evaluates: does the code pass review?',
    'Approved — deployed to production.',
    'SLA met. Feature shipped on time.',
  ],
  rejected: [
    'Requirements are gathered from the business, with an SLA attached.',
    'A technical spec is written against that SLA.',
    'The feature is built to spec.',
    'Gateway evaluates: does the code pass review?',
    'Changes requested — sent back for revision.',
    'The cycle repeats until the SLA is met.',
  ],
}

const CYCLE = ['approved', 'rejected']
const STEP_DURATION = 850
const PAUSE_DURATION = 1800
const LAST_STEP = 5

// Small hand-drawn line icons on a shared 24x24 grid, centered at (12,12)
// so they can be placed and scaled consistently via <IconAt>.
const ICONS = {
  document: 'M6 3 H15 L18 6 V21 H6 Z M15 3 V6 H18',
  edit: 'M5 19 L6 15 L15 6 L18 9 L9 18 Z M15 6 L18 9',
  code: 'M8 6 L3 12 L8 18 M16 6 L21 12 L16 18',
  branch: 'M12 3 L12 12 M12 12 L6 19 M12 12 L18 19',
  deploy: 'M12 4 L12 20 M12 4 L6 10 M12 4 L18 10',
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

function SdlcFlowDemo() {
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
  const outcomeReached = stepIndex >= 4

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

  function badgeClass(id, branchKey) {
    return `bpmn-icon-badge${isActive(id) ? ` is-active ${colorClassFor(branchKey || branch)}` : ''}`
  }

  function iconClass(id, branchKey) {
    return `bpmn-icon${isActive(id) ? ` is-active ${colorClassFor(branchKey || branch)}` : ''}`
  }

  return (
    <div className="carousel-slide">
      <div className="demo-card-head">
        <h3>Feature Delivery Against an SLA</h3>
        <p>
          A user story I'd actually run: requirements come in with an SLA,
          get spec'd, built, and reviewed — and the outcome of that review
          decides whether it ships or loops back for revision.
        </p>
      </div>

      <svg
        viewBox="0 0 700 590"
        className="bpmn-svg"
        role="img"
        aria-label="Animated diagram of a feature delivery process against an SLA, looping between a shipped and a revision-requested outcome"
      >
        {/* edges */}
        <path d={curve(NODES.start, NODES.taskSpec)} className={edgeClass('start', 'taskSpec')} />
        <path d={curve(NODES.taskSpec, NODES.taskBuild)} className={edgeClass('taskSpec', 'taskBuild')} />
        <path d={curve(NODES.taskBuild, NODES.gateway)} className={edgeClass('taskBuild', 'gateway')} />
        <path d={curve(NODES.gateway, NODES.approvedTask)} className={edgeClass('gateway', 'approvedTask', 'approved')} />
        <path d={curve(NODES.approvedTask, NODES.approvedEnd)} className={edgeClass('approvedTask', 'approvedEnd', 'approved')} />
        <path d={curve(NODES.gateway, NODES.rejectedTask)} className={edgeClass('gateway', 'rejectedTask', 'rejected')} />
        <path d={curve(NODES.rejectedTask, NODES.rejectedEnd)} className={edgeClass('rejectedTask', 'rejectedEnd', 'rejected')} />

        <text x={252} y={382} className={`bpmn-branch-label${branch === 'approved' ? ' is-active is-good' : ''}`}>Pass</text>
        <text x={448} y={382} className={`bpmn-branch-label${branch === 'rejected' ? ' is-active is-bad' : ''}`}>Fail</text>

        {/* start event */}
        <circle cx={NODES.start.x} cy={NODES.start.y} r={15} className={nodeClass('start', 'bpmn-event bpmn-event-start')} />
        <IconAt name="document" x={NODES.start.x} y={NODES.start.y} className={iconClass('start')} />
        <text x={NODES.start.x} y={NODES.start.y + 32} className="bpmn-label">Requirements Gathered</text>

        {/* spec task */}
        <rect x={NODES.taskSpec.x - 100} y={NODES.taskSpec.y - 34} width={200} height={68} rx={14} className={nodeClass('taskSpec', 'bpmn-task')} />
        <circle cx={NODES.taskSpec.x} cy={NODES.taskSpec.y - 12} r={13} className={badgeClass('taskSpec')} />
        <IconAt name="edit" x={NODES.taskSpec.x} y={NODES.taskSpec.y - 12} className={iconClass('taskSpec')} />
        <text x={NODES.taskSpec.x} y={NODES.taskSpec.y + 20} className="bpmn-task-label">Write Technical Spec</text>

        {/* build task */}
        <rect x={NODES.taskBuild.x - 100} y={NODES.taskBuild.y - 34} width={200} height={68} rx={14} className={nodeClass('taskBuild', 'bpmn-task')} />
        <circle cx={NODES.taskBuild.x} cy={NODES.taskBuild.y - 12} r={13} className={badgeClass('taskBuild')} />
        <IconAt name="code" x={NODES.taskBuild.x} y={NODES.taskBuild.y - 12} className={iconClass('taskBuild')} />
        <text x={NODES.taskBuild.x} y={NODES.taskBuild.y + 20} className="bpmn-task-label">Build Feature</text>

        {/* gateway */}
        <polygon
          points={`${NODES.gateway.x},${NODES.gateway.y - 32} ${NODES.gateway.x + 32},${NODES.gateway.y} ${NODES.gateway.x},${NODES.gateway.y + 32} ${NODES.gateway.x - 32},${NODES.gateway.y}`}
          className={nodeClass('gateway', 'bpmn-gateway')}
        />
        <IconAt name="branch" x={NODES.gateway.x} y={NODES.gateway.y} className={iconClass('gateway')} />
        <text x={NODES.gateway.x} y={NODES.gateway.y - 44} className="bpmn-label">Code Review Passed?</text>

        {/* approved branch */}
        <rect x={NODES.approvedTask.x - 92} y={NODES.approvedTask.y - 34} width={184} height={68} rx={14} className={nodeClass('approvedTask', 'bpmn-task', 'approved')} />
        <circle cx={NODES.approvedTask.x} cy={NODES.approvedTask.y - 12} r={13} className={badgeClass('approvedTask', 'approved')} />
        <IconAt name="deploy" x={NODES.approvedTask.x} y={NODES.approvedTask.y - 12} className={iconClass('approvedTask', 'approved')} />
        <text x={NODES.approvedTask.x} y={NODES.approvedTask.y + 20} className="bpmn-task-label">Deploy to Production</text>

        <circle cx={NODES.approvedEnd.x} cy={NODES.approvedEnd.y} r={17} className={nodeClass('approvedEnd', 'bpmn-event bpmn-event-end', 'approved')} />
        <IconAt name="check" x={NODES.approvedEnd.x} y={NODES.approvedEnd.y} className={iconClass('approvedEnd', 'approved')} />
        <text x={NODES.approvedEnd.x} y={NODES.approvedEnd.y + 34} className="bpmn-label">SLA Met</text>

        {/* rejected branch */}
        <rect x={NODES.rejectedTask.x - 92} y={NODES.rejectedTask.y - 34} width={184} height={68} rx={14} className={nodeClass('rejectedTask', 'bpmn-task', 'rejected')} />
        <circle cx={NODES.rejectedTask.x} cy={NODES.rejectedTask.y - 12} r={13} className={badgeClass('rejectedTask', 'rejected')} />
        <IconAt name="bell" x={NODES.rejectedTask.x} y={NODES.rejectedTask.y - 12} className={iconClass('rejectedTask', 'rejected')} />
        <text x={NODES.rejectedTask.x} y={NODES.rejectedTask.y + 20} className="bpmn-task-label">Request Changes</text>

        <circle cx={NODES.rejectedEnd.x} cy={NODES.rejectedEnd.y} r={17} className={nodeClass('rejectedEnd', 'bpmn-event bpmn-event-end', 'rejected')} />
        <IconAt name="x" x={NODES.rejectedEnd.x} y={NODES.rejectedEnd.y} className={iconClass('rejectedEnd', 'rejected')} />
        <text x={NODES.rejectedEnd.x} y={NODES.rejectedEnd.y + 34} className="bpmn-label">Revision Requested</text>

        {/* animated token */}
        <circle
          cx={token.x}
          cy={token.y}
          r={7}
          className={`bpmn-token ${outcomeReached ? outcomeClass : ''}`}
        />
      </svg>

      <p className={`demo-console ${outcomeReached ? outcomeClass : ''}`}>{stepText}</p>
    </div>
  )
}

export default SdlcFlowDemo
