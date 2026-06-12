<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const animContainer = ref(null)
let animInstance = null

const props = defineProps({
  size: { type: Number, default: 200 },
  loop: { type: Boolean, default: true },
})

onMounted(async () => {
  if (!animContainer.value) return
  try {
    const lottie = await import('lottie-web')
    animInstance = lottie.default.loadAnimation({
      container: animContainer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: true,
      path: '/capybara.json',
    })
  } catch (e) {
    console.warn('Lottie failed to load:', e)
  }
})

onUnmounted(() => {
  if (animInstance) animInstance.destroy()
})
</script>

<template>
  <div
    ref="animContainer"
    class="lottie-mascot"
    :style="{ width: size + 'px', height: size + 'px' }"
  ></div>
</template>

<style scoped>
.lottie-mascot {
  display: flex;
  align-items: center;
  justify-content: center;
}
.lottie-mascot :deep(svg) {
  width: 100% !important;
  height: 100% !important;
}
</style>
