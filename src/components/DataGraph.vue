<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

const nodes = [
  { id: 'upload', x: 50, y: 80, icon: '📄', label: 'Lab Result', color: '#C4582D' },
  { id: 'ferritin', x: 150, y: 40, icon: '🩸', label: 'Ferritin 32', color: '#B85F4D' },
  { id: 'tsh', x: 250, y: 90, icon: '⚡', label: 'TSH 2.8', color: '#5A8A6B' },
  { id: 'hba1c', x: 150, y: 130, icon: '🍬', label: 'HbA1c 5.4', color: '#C99A4D' },
  { id: 'fatigue', x: 350, y: 30, icon: '😴', label: 'Fatigue x4', color: '#9B59B6' },
  { id: 'cold', x: 350, y: 130, icon: '🥶', label: 'Cold hands', color: '#9B59B6' },
  { id: 'trend', x: 250, y: 170, icon: '📉', label: 'Dropping 18mo', color: '#E74C3C' },
  { id: 'pattern', x: 450, y: 80, icon: '🔗', label: 'Low iron pattern', color: '#F39C12' },
  { id: 'reminder', x: 550, y: 40, icon: '🔔', label: 'Retest in 3mo', color: '#3498DB' },
  { id: 'pdf', x: 550, y: 130, icon: '📋', label: 'Health Passport', color: '#2D5F4A' },
  { id: 'doctor', x: 650, y: 80, icon: '👨‍⚕️', label: 'Share with doctor', color: '#2D5F4A' },
]

const edges = [
  ['upload', 'ferritin'], ['upload', 'tsh'], ['upload', 'hba1c'],
  ['ferritin', 'fatigue'], ['ferritin', 'trend'], ['ferritin', 'cold'],
  ['trend', 'pattern'], ['fatigue', 'pattern'],
  ['pattern', 'reminder'], ['pattern', 'pdf'],
  ['pdf', 'doctor'],
]

function getNode(id) { return nodes.find(n => n.id === id) }

onMounted(() => { setTimeout(() => visible.value = true, 200) })
</script>

<template>
  <div class="graph-wrap">
    <svg viewBox="0 0 720 210" class="graph-svg" :class="{ visible }">
      <!-- Edges -->
      <line
        v-for="(edge, i) in edges"
        :key="'e'+i"
        :x1="getNode(edge[0])?.x"
        :y1="getNode(edge[0])?.y"
        :x2="getNode(edge[1])?.x"
        :y2="getNode(edge[1])?.y"
        class="graph-edge"
        :style="{ transitionDelay: (i * 80) + 'ms' }"
      />
      <!-- Nodes -->
      <g
        v-for="(node, i) in nodes"
        :key="node.id"
        class="graph-node"
        :style="{ transitionDelay: (i * 100) + 'ms' }"
      >
        <circle
          :cx="node.x" :cy="node.y" r="22"
          :fill="node.color"
          class="node-circle"
        />
        <circle
          :cx="node.x" :cy="node.y" r="30"
          :fill="node.color"
          class="node-glow"
        />
        <text :x="node.x" :y="node.y + 1" text-anchor="middle" dominant-baseline="central" class="node-icon">{{ node.icon }}</text>
        <text :x="node.x" :y="node.y + 38" text-anchor="middle" class="node-label">{{ node.label }}</text>
      </g>
    </svg>
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
.graph-wrap { margin: 32px auto 0; max-width: 720px; }
.graph-svg { width: 100%; height: auto; }
.graph-edge {
  stroke: #BFB6A4;
  stroke-width: 1.5;
  opacity: 0;
  transition: opacity 0.5s;
}
.visible .graph-edge { opacity: 0.4; }
.graph-node {
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.4s, transform 0.4s;
  transform-origin: center;
}
.visible .graph-node {
  opacity: 1;
  transform: scale(1);
}
.node-circle { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15)); }
.node-glow { opacity: 0.12; }
.node-icon { font-size: 16px; fill: white; pointer-events: none; }
.node-label { font-size: 10px; fill: #5A5F58; font-family: 'Geist', sans-serif; font-weight: 500; }
.graph-legend { display: flex; gap: 16px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #8B8E86; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
</style>
