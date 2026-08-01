<template>
  <div class="affix-update-demo">
    <h3>手动更新位置（updatePosition）</h3>
    <p>通过 ref 调用 <code>updatePosition()</code> 方法可立即刷新固定位置，适用于动态改变布局后同步状态。</p>

    <div class="demo-controls">
      <button class="demo-btn" @click="toggleExtra">{{ showExtra ? '移除' : '添加' }}上方内容</button>
      <button class="demo-btn demo-btn--primary" @click="handleUpdate">调用 updatePosition()</button>
    </div>

    <div v-if="showExtra" class="extra-block">动态插入的内容（{{ extraHeight }}px 高）</div>

    <TyAffix ref="affixRef" :offset-top="0" class="demo-affix" @change="onchange">
      <div class="demo-block">Affix offsetTop: 0 — 固定状态：{{ isFixed }}</div>
    </TyAffix>

    <div class="scroll-area">
      <p v-for="i in 20" :key="i">占位内容 {{ i }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TyAffix from '../../index.ts'

defineOptions({ name: 'AffixUpdateDemo' })

const affixRef = ref(null)
const isFixed = ref(false)
const showExtra = ref(false)
const extraHeight = 120

const toggleExtra = () => {
  showExtra.value = !showExtra.value
}

const handleUpdate = () => {
  affixRef.value?.updatePosition()
}

const onchange = val => {
  isFixed.value = val
}
</script>

<style scoped>
.affix-update-demo {
  padding: 12px;
}

.demo-controls {
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
}

.demo-btn {
  padding: 6px 14px;
  border: 1px solid var(--color-border-2, #e5e6eb);
  border-radius: 4px;
  background: var(--color-bg-2, #fff);
  cursor: pointer;
  font-size: 13px;
}

.demo-btn:hover {
  border-color: var(--color-primary-600, #1677ff);
  color: var(--color-primary-600, #1677ff);
}

.demo-btn--primary {
  background: var(--color-primary-600, #1677ff);
  color: #fff;
  border-color: var(--color-primary-600, #1677ff);
}

.demo-btn--primary:hover {
  opacity: 0.85;
  color: #fff;
}

.extra-block {
  height: 120px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fill-2, #f2f3f5);
  border-radius: 4px;
  color: var(--color-text-3, #86909c);
  font-size: 13px;
}

.demo-affix {
  margin: 12px 0;
}

.demo-block {
  padding: 8px 16px;
  background: var(--color-success-600, #00b42a);
  color: #fff;
  border-radius: 4px;
}

.scroll-area p {
  line-height: 1.8;
  margin: 0;
  color: var(--color-text-3, #86909c);
}

code {
  padding: 2px 6px;
  background: var(--color-fill-2, #f2f3f5);
  border-radius: 3px;
  font-size: 12px;
}
</style>
