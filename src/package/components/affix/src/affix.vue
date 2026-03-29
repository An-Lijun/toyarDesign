<template>
    <component :is="tag" ref="affixRef">
        <div :class="[nm.b(), nm.is('fixed', isFixed)]" :style="styles">
            <slot></slot>
        </div>
    </component>
</template>

<script setup>
import { nm, affixProps } from "./context";
import useAffix from './use-affix';

defineOptions({
    name: "TyAffix",
});

const props = defineProps(affixProps);
const emits = defineEmits<{
  click: [event: MouseEvent]
}>()
const {styles,isFixed,affixRef} = useAffix(props,emits,nm)
</script>