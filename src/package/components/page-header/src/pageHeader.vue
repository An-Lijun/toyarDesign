<template>
  <div :class="nm.b()">
    <slot name="head"> </slot>
    <div :class="nm.e('heading')">
      <div :class="nm.e('back')" v-if="props.showBack" @click="emit('back')">
        <slot name="back">
          <TyiArrowLeftFill/>
        </slot>
      </div>
      <TyDivider
        v-if="props.showBack"
        style="--toyar-gray-2: var(--toyar-gray-10)"
        direction="column"
      ></TyDivider>
      <div :class="nm.e('title')">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div :class="nm.e('subTitle')">
        <slot name="subTitle">
          {{ subTitle }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { hdProps, hdEmits, nm } from './context'
import {TyiArrowLeftFill} from 'toyaricon'
defineOptions({
  name:'TyPageHeader'
})

const props = defineProps(hdProps)
const emit = defineEmits(hdEmits)
</script>
<style lang="scss" scoped>
.ty-pageHeader {
  padding: 20px;
  &__heading {
    height: 30px;
    align-items: center;
    display: flex;
    font-size: 26px;
  }
  &__title {
    color: var(--text-1);
  }
  &__subTitle {
    color: var(--text-4);
    margin-left: 20px;
    font-size: 20px;
  }
}
</style>
