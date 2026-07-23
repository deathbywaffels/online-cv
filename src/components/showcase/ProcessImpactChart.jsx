import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const DATA = [
  { stage: 'Manual Handoffs', days: 12 },
  { stage: 'Structured Process', days: 6 },
  { stage: 'Automated CI/CD', days: 2 },
  { stage: 'AI-Assisted Delivery', days: 0.5 },
]

const WIDTH = 720
const HEIGHT = 320
const MARGIN = { top: 30, right: 24, bottom: 56, left: 44 }

function ProcessImpactChart({ playToken = 0 }) {
  const svgRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const innerW = WIDTH - MARGIN.left - MARGIN.right
    const innerH = HEIGHT - MARGIN.top - MARGIN.bottom

    const defs = svg.append('defs')
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'process-impact-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#7c5cff').attr('stop-opacity', 0.45)
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#7c5cff').attr('stop-opacity', 0)

    const g = svg.append('g').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`)

    const x = d3.scalePoint().domain(DATA.map((d) => d.stage)).range([0, innerW]).padding(0.6)
    const y = d3.scaleLinear().domain([0, d3.max(DATA, (d) => d.days) * 1.2]).range([innerH, 0])

    g.append('g')
      .attr('class', 'chart-grid')
      .call(d3.axisLeft(y).tickSize(-innerW).tickFormat('').ticks(5))

    g.append('g')
      .attr('class', 'chart-axis chart-axis-x')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-14)')
      .style('text-anchor', 'end')

    g.append('g')
      .attr('class', 'chart-axis chart-axis-y')
      .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}d`))

    const area = d3
      .area()
      .x((d) => x(d.stage))
      .y0(innerH)
      .y1((d) => y(d.days))
      .curve(d3.curveMonotoneX)

    const line = d3
      .line()
      .x((d) => x(d.stage))
      .y((d) => y(d.days))
      .curve(d3.curveMonotoneX)

    const areaPath = g
      .append('path')
      .datum(DATA)
      .attr('fill', 'url(#process-impact-gradient)')
      .attr('d', area)
      .style('opacity', 0)

    const linePath = g
      .append('path')
      .datum(DATA)
      .attr('fill', 'none')
      .attr('stroke', '#47bfff')
      .attr('stroke-width', 3)
      .attr('d', line)

    const totalLength = linePath.node().getTotalLength()
    linePath
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1300)
      .ease(d3.easeCubicInOut)
      .attr('stroke-dashoffset', 0)
      .on('end', () => areaPath.transition().duration(500).style('opacity', 1))

    const dots = g
      .selectAll('.chart-dot')
      .data(DATA)
      .join('circle')
      .attr('class', 'chart-dot')
      .attr('cx', (d) => x(d.stage))
      .attr('cy', (d) => y(d.days))
      .attr('r', 0)
      .attr('fill', '#0f1115')
      .attr('stroke', '#7c5cff')
      .attr('stroke-width', 2.5)

    dots
      .transition()
      .delay((d, i) => 200 + i * 300)
      .duration(350)
      .attr('r', 5.5)

    dots
      .on('mouseenter', function (event, d) {
        d3.select(this).transition().duration(150).attr('r', 8)
        const [px, py] = d3.pointer(event, svgRef.current.parentNode)
        setTooltip({ x: px, y: py, label: d.stage, value: d.days })
      })
      .on('mouseleave', function () {
        d3.select(this).transition().duration(150).attr('r', 5.5)
        setTooltip(null)
      })
  }, [playToken])

  return (
    <div className="carousel-slide">
      <div className="demo-card-head">
        <h3>SLA Delivery Time — D3.js</h3>
        <p>
          Average time from requirement to shipped feature as the process
          above matures from manual handoffs to AI-assisted delivery. Hover
          the points for exact values.
        </p>
      </div>

      <div className="chart-wrap">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="chart-svg"
          role="img"
          aria-label="Line chart of feature delivery time improving across four process maturity stages"
        />
        {tooltip && (
          <div className="chart-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            <strong>{tooltip.label}</strong>
            <br />
            {tooltip.value} day{tooltip.value === 1 ? '' : 's'}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcessImpactChart
