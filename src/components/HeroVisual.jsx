import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ASSEMBLE_DURATION = 900
const PER_EDGE_DELAY = 12
const COLOR_A = new THREE.Color(0x7c5cff)
const COLOR_B = new THREE.Color(0x47bfff)

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function HeroVisual() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(2.2, 1)
    const edges = new THREE.EdgesGeometry(geometry)
    const posAttr = edges.getAttribute('position')
    const count = posAttr.count
    const target = Float32Array.from(posAttr.array)
    const start = new Float32Array(target.length)
    const colors = new Float32Array(target.length)
    const delays = new Float32Array(count)

    let maxRadius = 0
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const tx = target[ix]
      const ty = target[ix + 1]
      const tz = target[ix + 2]
      maxRadius = Math.max(maxRadius, Math.sqrt(tx * tx + ty * ty + tz * tz))
    }

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const tx = target[ix]
      const ty = target[ix + 1]
      const tz = target[ix + 2]
      const len = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1
      const extra = 4 + Math.random() * 5
      const scale = (len + extra) / len
      start[ix] = tx * scale
      start[ix + 1] = ty * scale
      start[ix + 2] = tz * scale

      const edgeIndex = Math.floor(i / 2)
      delays[i] = edgeIndex * PER_EDGE_DELAY

      const t = (ty + maxRadius) / (2 * maxRadius)
      const c = COLOR_A.clone().lerp(COLOR_B, t)
      colors[ix] = c.r
      colors[ix + 1] = c.g
      colors[ix + 2] = c.b
    }

    edges.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(start), 3))
    edges.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    })
    const mesh = new THREE.LineSegments(edges, material)
    const group = new THREE.Group()
    group.add(mesh)
    scene.add(group)

    let frameId
    const clock = new THREE.Clock()
    let elapsedMs = 0

    function animate() {
      const delta = clock.getDelta()
      elapsedMs += delta * 1000

      const posArray = edges.getAttribute('position').array
      for (let i = 0; i < count; i++) {
        const ix = i * 3
        const t = Math.min(Math.max((elapsedMs - delays[i]) / ASSEMBLE_DURATION, 0), 1)
        const eased = easeOutCubic(t)
        posArray[ix] = start[ix] + (target[ix] - start[ix]) * eased
        posArray[ix + 1] = start[ix + 1] + (target[ix + 1] - start[ix + 1]) * eased
        posArray[ix + 2] = start[ix + 2] + (target[ix + 2] - start[ix + 2]) * eased
      }
      edges.getAttribute('position').needsUpdate = true

      group.rotation.y += delta * 0.16
      group.rotation.x += delta * 0.05

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    function handleResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      edges.dispose()
      material.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="hero-visual-canvas" aria-hidden="true" />
}

export default HeroVisual
