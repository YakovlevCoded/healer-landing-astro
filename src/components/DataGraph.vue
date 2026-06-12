<script setup>
import { ref, onMounted, onUnmounted, defineComponent, h } from 'vue'

const container = ref(null)
let animationId = null
let renderer = null

// Only run on client
const isClient = typeof window !== 'undefined'

function init() {
  if (!isClient || !container.value) return
  const THREE = window.THREE
  if (!THREE) return

  const w = container.value.clientWidth
  const h = Math.min(400, w * 0.6)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000)
  camera.position.z = 8

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.innerHTML = ''
  container.value.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))

  const DATA_NODES = [
    { id: 'upload', label: '📄 Lab Result', color: 0xC4582D },
    { id: 'ferritin', label: '🩸 Ferritin 32', color: 0xB85F4D },
    { id: 'tsh', label: '⚡ TSH 2.8', color: 0x5A8A6B },
    { id: 'hba1c', label: '🍬 HbA1c 5.4', color: 0xC99A4D },
    { id: 'cholesterol', label: '💙 LDL 118', color: 0x2D5F4A },
    { id: 'fatigue', label: '😴 Fatigue x4', color: 0x9B59B6 },
    { id: 'cold', label: '🥶 Cold hands', color: 0x9B59B6 },
    { id: 'trend', label: '📉 Dropping 18mo', color: 0xE74C3C },
    { id: 'pattern', label: '🔗 Low iron pattern', color: 0xF39C12 },
    { id: 'reminder', label: '🔔 Retest in 3mo', color: 0x3498DB },
    { id: 'pdf', label: '📋 Health Passport', color: 0x2D5F4A },
    { id: 'doctor', label: '👨‍⚕️ Share with doctor', color: 0x2D5F4A },
  ]

  const EDGES = [
    ['upload', 'ferritin'], ['upload', 'tsh'], ['upload', 'hba1c'], ['upload', 'cholesterol'],
    ['ferritin', 'trend'], ['ferritin', 'fatigue'], ['ferritin', 'cold'],
    ['trend', 'pattern'], ['fatigue', 'pattern'],
    ['pattern', 'reminder'], ['pattern', 'pdf'],
    ['pdf', 'doctor'],
  ]

  const positions = {}
  const meshes = []
  const radius = 3.5

  DATA_NODES.forEach((node, i) => {
    const angle = (i / DATA_NODES.length) * Math.PI * 2
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.8
    const y = Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 0.6
    const z = (Math.random() - 0.5) * 1.5
    positions[node.id] = { x, y, z }

    const size = i === 0 || i === DATA_NODES.length - 1 ? 0.22 : 0.16
    const geo = new THREE.SphereGeometry(size, 16, 16)
    const mat = new THREE.MeshPhongMaterial({
      color: node.color,
      emissive: node.color,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.9,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    scene.add(mesh)
    meshes.push({ mesh, baseY: y })

    const glowGeo = new THREE.SphereGeometry(size * 1.8, 16, 16)
    const glowMat = new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.08 })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.position.set(x, y, z)
    scene.add(glow)
  })

  EDGES.forEach(([from, to]) => {
    const p1 = positions[from]
    const p2 = positions[to]
    if (!p1 || !p2) return
    const points = [new THREE.Vector3(p1.x, p1.y, p1.z), new THREE.Vector3(p2.x, p2.y, p2.z)]
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color: 0x5A8A6B, transparent: true, opacity: 0.25 })
    scene.add(new THREE.Line(geo, mat))
  })

  function animate() {
    animationId = requestAnimationFrame(animate)
    scene.rotation.y += 0.003
    scene.rotation.x += 0.001
    meshes.forEach(({ mesh, baseY }, i) => {
      mesh.position.y = baseY + Math.sin(Date.now() * 0.001 + i) * 0.05
    })
    renderer.render(scene, camera)
  }
  animate()
}

onMounted(() => {
  if (!isClient) return
  if (!window.THREE) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.min.js'
    script.onload = init
    document.head.appendChild(script)
  } else {
    init()
  }
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div class="graph-container">
    <div ref="container" class="three-canvas"></div>
    <div class="graph-legend">
      <span class="legend-item"><span class="dot" style="background:#C4582D"></span>Upload</span>
      <span class="legend-item"><span class="dot" style="background:#B85F4D"></span>Biomarkers</span>
      <span class="legend-item"><span class="dot" style="background:#9B59B6"></span>Symptoms</span>
      <span class="legend-item"><span class="dot" style="background:#F39C12"></span>AI Pattern</span>
      <span class="legend-item"><span class="dot" style="background:#2D5F4A"></span>Action</span>
    </div>
  </div>
</template>

<style scoped>
.graph-container { position: relative; width: 100%; margin: 32px auto 0; }
.three-canvas { width: 100%; height: 360px; border-radius: 16px; overflow: hidden; }
.three-canvas :deep(canvas) { width: 100% !important; height: 100% !important; }
.graph-legend { display: flex; gap: 16px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ink-3); }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
</style>
