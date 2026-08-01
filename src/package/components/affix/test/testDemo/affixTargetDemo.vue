<template>
  <div class="affix-target-demo">
    <h3>目标容器（target）</h3>
    <p>在可滚动容器内固定，滚动下方区域观察效果</p>

    <div ref="scrollContainerRef" class="scroll-container">
      <div class="scroll-placeholder">
        <p v-for="i in 6" :key="`before-${i}`">占位内容 {{ i }}</p>
      </div>

      <TyAffix :target="scrollContainerRef" :offset-top="0" class="demo-affix" @change="handlechange">
        <div class="demo-block">target 容器内 offsetTop: 0</div>
      </TyAffix>

      <TyAffix :target="scrollContainerRef" :offset-top="40" class="demo-affix">
        <div class="demo-block demo-block--primary">target 容器内 offsetTop: 40</div>
      </TyAffix>

      <div class="scroll-placeholder">
        <p v-for="i in 20" :key="`after-${i}`">滚动内容 {{ i }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({ name: 'AffixTargetDemo' })

const scrollContainerRef = ref(null)

const handlechange = isFixed => {
  console.log('target demo isFixed', isFixed)
}
</script>

<style scoped>
.affix-target-demo {
  padding: 12px;
}

.scroll-container {
  height: 300px;
  overflow-y: auto;
  border: 1px solid var(--color-border-2, #e5e6eb);
  border-radius: 6px;
  padding: 12px;
  background: var(--color-fill-1, #f7f8fa);
}

.scroll-placeholder p {
  line-height: 1.8;
  margin: 0;
  color: var(--color-text-3, #86909c);
}

.demo-affix {
  margin: 12px 0;
}

.demo-block {
  padding: 8px 16px;
  background: var(--color-danger-600, #f53f3f);
  color: #fff;
  border-radius: 4px;
}

.demo-block--primary {
  background: var(--color-primary-600, #1677ff);
}
</style>
