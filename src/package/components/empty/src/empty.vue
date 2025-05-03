<template>
  <div :class="nm.b()">
    <div :class="nm.e('inner')">
      <slot name="icon">
        <TyiInbox2Line/>
      </slot>
      <span>
        {{ title }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts" name="TyEmpty">
import {TyiInbox2Line} from 'toyaricon'
import {emptyProps,nm} from './context'
defineOptions({
  name:'TyEmpty'
})
defineProps(emptyProps);
</script>
<style lang="scss" scoped>
.ty-empty{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  &__inner{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
      font-size: 18px;
      margin-top: 10px;
      color: var(--toyar-gray-5);
    }
  }
}
</style>
