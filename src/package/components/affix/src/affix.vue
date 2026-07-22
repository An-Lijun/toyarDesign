<template>
    <component :is="tag" ref="affixRef">
        <div v-memo="[isFixed, styles]" :class="[nm.b(), nm.is('fixed', isFixed)]" :style="styles">
            <slot></slot>
        </div>
    </component>
</template>

<script setup>
import { nm, useProps, useEmits } from "./context";
import useAffix from './use-affix';

defineOptions({
    name: "TyAffix",
});

const props = defineProps(useProps);
const emits = defineEmits(useEmits)
const { styles, isFixed, affixRef } = useAffix(props, emits, nm)
</script>