<template>
    <component :is="tag" ref="affixRef">
        <div :class="[nm.b(), nm.is('fixed', isFixed)]" :style="styles">
            <slot></slot>
        </div>
    </component>
</template>

<script setup>
import { nm, affixProps,affixEmits } from "./context";
import useAffix from './use-affix';

defineOptions({
    name: "TyAffix",
});

const props = defineProps(affixProps);
const emits = defineEmits(affixEmits)
const { styles, isFixed, affixRef } = useAffix(props, emits, nm)
</script>