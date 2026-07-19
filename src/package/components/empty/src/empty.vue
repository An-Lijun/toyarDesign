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
