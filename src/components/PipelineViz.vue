<script setup>
import { ref, onMounted } from 'vue'

const activeStep = ref(0)
const steps = [
  { icon: '📸', label: 'Upload', desc: 'Photo, PDF, or manual entry', color: '#C4582D' },
  { icon: '🔍', label: 'Extract', desc: 'AI reads every value & finding', color: '#B89020' },
  { icon: '📊', label: 'Normalize', desc: '45+ biomarkers, canonical keys', color: '#2D5F4A' },
  { icon: '🧠', label: 'Embed', desc: 'Vector search across your history', color: '#5A8A6B' },
  { icon: '🔗', label: 'Synthesize', desc: 'RAG connects patterns over time', color: '#0f3460' },
  { icon: '📋', label: 'Export', desc: 'Health Passport PDF for your doctor', color: '#8B6914' },
]

onMounted(() => {
  setInterval(() => {
    activeStep.value = (activeStep.value + 1) % steps.length
  }, 2500)
})
</script>

<template>
  <div class="pipeline">
    <div class="pipeline-title">This is what happens when you upload a lab result</div>
    <div class="pipeline-flow">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="pipeline-step"
        :class="{ active: i === activeStep }"
      >
        <div class="step-dot" :style="{ background: step.color }">
          <span class="step-icon">{{ step.icon }}</span>
        </div>
        <div class="step-label">{{ step.label }}</div>
        <div class="step-desc">{{ step.desc }}</div>
        <svg v-if="i < steps.length - 1" class="step-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
    <div class="pipeline-note">
      <span class="note-icon">⚠️</span>
      <span>Most "AI health apps" stop at step 1 → chatbot. Bevita runs the full pipeline. That's why your data is searchable, your trends are real, and your doctor can actually use what we produce.</span>
    </div>
  </div>
</template>

<style scoped>
.pipeline {
  margin-top: 48px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.pipeline-title {
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-2);
  margin-bottom: 32px;
}
.pipeline-flow {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}
.pipeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  flex: 1;
  min-width: 100px;
  max-width: 140px;
  opacity: 0.5;
  transition: opacity 0.4s, transform 0.4s;
}
.pipeline-step.active {
  opacity: 1;
  transform: translateY(-4px);
}
.step-dot {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.pipeline-step.active .step-dot {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.step-icon { font-size: 22px; }
.step-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
}
.step-desc {
  font-size: 11px;
  color: var(--ink-3);
  line-height: 1.3;
}
.step-arrow {
  position: absolute;
  right: -14px;
  top: 18px;
  color: var(--line-strong);
  z-index: 1;
}
.pipeline-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 32px;
  padding: 16px 20px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.5;
}
.note-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
@media (max-width: 760px) {
  .pipeline-flow { gap: 12px; }
  .pipeline-step { min-width: 80px; }
  .step-arrow { display: none; }
  .step-desc { display: none; }
}
</style>
