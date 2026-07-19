<template>
  <div
    :class="[
      nm.b(),
      nm.is('border', border),
      nm.is('shadow', shadow === 'shadow'),
      nm.is('hoverShadow', shadow === 'hover'),
    ]"
  >
    
    <header :class="nm.e('header')" v-if="useSlots().header">
      <slot name="header"></slot>
    </header>
    <TySkeleton v-if="isLoading" :count="5" />
    <main :class="nm.e('main')" v-if="!isLoading">
      <slot></slot>
    </main>
  </div>
</template>
<script setup lang='ts' name="TyCard">
import { useSlots } from 'vue'
import { cardProp,nm } from './context'
import TySkeleton from '../../skeleton'
defineOptions({
  name:'TyCard'
})
defineProps(cardProp)

</script>

