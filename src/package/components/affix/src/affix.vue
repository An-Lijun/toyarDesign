<template>
    <div ref="affixRef">
        <div :class="[nm.b(), nm.is('fixed', glAffix)]" :style="styles">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { nm, affixProps } from "./context";
import { on, off } from '../../../utils/dom'

defineOptions({
    name: "TyAffix",
});

const props = defineProps(affixProps)
const affixRef = ref()
let glAffix = ref(false)
let styles = ref({})

const getScrollVal = (target, top) => {
    let val = target[top ? 'pageYOffset' : 'pageXOffset'];
    if (typeof val !== 'number') {
        val = window.document.documentElement[top ? 'scrollTop' : 'scrollLeft'];
    }
    return val;
}

const getOffsetVal = (element) => {
    const { top, left } = element.getBoundingClientRect();
    const { clientTop = 0, clientLeft = 0 } = window.document.body;
    return {
        top: top + getScrollVal(window, true) - clientTop,
        left: left + getScrollVal(window) - clientLeft
    };
}

const offsetType = computed(() => {
    return props.offsetBottom >= 0 ? 'bottom' : 'top';
});

const handleScroll = () => {
    let affix = glAffix.value
    const scrollTop = getScrollVal(window, true); // window.pageYOffset（ 滚动条距离顶部的偏移量 ）
    const { top: elOffsetTop, left: elOffsetLeft } = getOffsetVal(affixRef.value); // 获取元素原始的 top left
    const windowHeight = window.innerHeight; // 获取窗口大小
    const elHeight = affixRef.value.offsetHeight; // 获取当前元素的height
    const offsetTop = props.offsetTop
    const offsetBottom = props.offsetBottom

    switch (offsetType.value) {
        case 'top':
            if (elOffsetTop - offsetTop <= scrollTop && !affix) {
                glAffix.value = true;
                styles.value = {
                    top: `${offsetTop}px`,
                    left: `${elOffsetLeft}px`
                };
            } else if (elOffsetTop - offsetTop > scrollTop && affix) {
                glAffix.value = false;
                styles.value = null;
            }
            break;
        case 'bottom':
            if (elOffsetTop + offsetBottom + elHeight > scrollTop + windowHeight && !affix) {
                glAffix.value = true;
                styles.value = {
                    bottom: `${offsetBottom}px`,
                    left: `${elOffsetLeft}px`
                };
            } else if (elOffsetTop + offsetBottom + elHeight < scrollTop + windowHeight && affix) {
                glAffix.value = false;
                styles.value = null;
            }
    }
}

onMounted(() => {
    handleScroll()
    on(window, 'scroll', handleScroll);
    on(window, 'resize', () => {
        if (getOffsetVal(affixRef.value).top - props.offsetTop <= getScrollVal(window, true)) {
            glAffix.value = false;
        }
        handleScroll();
    });
})

onBeforeUnmount(() => {
    off(window, 'scroll', handleScroll);
    off(window, 'resize', handleScroll);
})


</script>


<style lang="scss" scoped>
.ty-affix {
    z-index: 1500;
}

.is-fixed {
    position: fixed;
}
</style>