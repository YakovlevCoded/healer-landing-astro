<script setup>
import { ref, onMounted } from 'vue'

const lines = ref([])
const visible = ref(false)

onMounted(() => {
  visible.value = true
  lines.value = [
    { icon: '🩸', text: 'Ferritin dropped from 85 → 32 over 18 months', status: 'concerning', delay: 0 },
    { icon: '⚡', text: 'TSH rising slowly, still in normal range', status: 'optimal', delay: 200 },
    { icon: '🫀', text: 'Fatigue logged 4x this week — correlates with ferritin trend', status: 'warning', delay: 400 },
    { icon: '📋', text: 'Suggestion: recheck iron panel + CBC in 3 months', status: 'action', delay: 600 },
  ]
})
</script>

<template>
  <div class="feature-highlight" :class="{ visible }">
    <div class="highlight-header">
      <div class="highlight-badge">AI Insight</div>
      <div class="highlight-title">Bevita connected 4 data points you'd miss alone</div>
    </div>
    <div class="highlight-lines">
      <div
        v-for="(line, i) in lines"
        :key="i"
        class="highlight-line"
        :class="'status-' + line.status"
        :style="{ transitionDelay: line.delay + 'ms' }"
      >
        <span class="line-icon">{{ line.icon }}</span>
        <span class="line-text">{{ line.text }}</span>
        <span class="line-status">{{ line.status }}</span>
      </div>
    </div>
    <div class="highlight-footer">
      <div class="footer-item">
        <span class="footer-icon">✓</span>
        <span>No diagnosis — just patterns worth discussing with your doctor</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-highlight {
  color: #FBF8F2;
}
.highlight-header {
  margin-bottom: 24px;
}
.highlight-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.15);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.highlight-title {
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 500;
  line-height: 1.3;
}
.highlight-lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.highlight-line {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s, transform 0.4s;
}
.visible .highlight-line {
  opacity: 1;
  transform: translateY(0);
}
.line-icon {
  font-size: 20px;
  flex-shrink: 0;
}
.line-text {
  flex: 1;
  font-size: 15px;
  line-height: 1.4;
}
.line-status {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 999px;
  flex-shrink: 0;
}
.status-concerning .line-status {
  background: rgba(184, 95, 77, 0.3);
  color: #F2DDD4;
}
.status-optimal .line-status {
  background: rgba(90, 138, 107, 0.3);
  color: #DBE6DD;
}
.status-warning .line-status {
  background: rgba(201, 154, 77, 0.3);
  color: #F5E8D0;
}
.status-action .line-status {
  background: rgba(255, 255, 255, 0.2);
  color: #FBF8F2;
}
.highlight-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
}
.footer-icon {
  color: #5A8A6B;
  font-weight: 700;
}
</style>
