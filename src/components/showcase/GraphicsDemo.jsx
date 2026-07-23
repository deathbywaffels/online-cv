import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function GraphicsDemo() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(1.8, 1)
    const material = new THREE.MeshStandardMaterial({
      color: 0x7c5cff,
      flatShading: true,
      roughness: 0.4,
      metalness: 0.15,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x47bfff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    mesh.add(new THREE.Mesh(geometry, wireMaterial))

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1)
    dirLight.position.set(4, 4, 6)
    scene.add(dirLight)
    const rimLight = new THREE.DirectionalLight(0x47bfff, 0.6)
    rimLight.position.set(-4, -2, -4)
    scene.add(rimLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.minDistance = 3.5
    controls.maxDistance = 9

    let frameId
    const clock = new THREE.Clock()

    function animate() {
      const delta = clock.getDelta()
      mesh.rotation.y += delta * 0.18
      mesh.rotation.x += delta * 0.06
      controls.update()
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    function handleResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      wireMaterial.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="demo-card">
      <div className="demo-card-head">
        <h3>3D Graphics — Three.js / WebGL</h3>
        <p>Drag to orbit, scroll to zoom.</p>
      </div>
      <div ref={mountRef} className="three-canvas" />
    </div>
  )
}

export default GraphicsDemo
