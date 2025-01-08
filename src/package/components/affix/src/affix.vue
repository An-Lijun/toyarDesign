<template>
    <div ref="affixRef">
        <div :class="[nm.b(), nm.is('fixed', isFixed)]" :style="styles">
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
let isFixed = ref(false)
let styles = ref({})
const targetDom = props.target||window
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

const setIsFixed = (value) => {
    isFixed.value = value;
}
const handleScroll = () => {
    let nowIsFixed = isFixed.value
    const scrollTop = getScrollVal(window, true);
    const { top: elOffsetTop, left: elOffsetLeft } = getOffsetVal(affixRef.value);
    const windowHeight = window.innerHeight;
    const elHeight = affixRef.value.offsetHeight;
    const offsetTop = props.offsetTop
    const offsetBottom = props.offsetBottom

    switch (offsetType.value) {
        case 'top':
            if (elOffsetTop - offsetTop <= scrollTop && !nowIsFixed) {
                setIsFixed(true)
                styles.value = {
                    top: `${offsetTop}px`,
                    left: `${elOffsetLeft}px`
                };
            } else if (elOffsetTop - offsetTop > scrollTop && nowIsFixed) {
                isFixed.value = false;
                setIsFixed(false)
                styles.value = {};
            }
            break;
        case 'bottom':
            if (elOffsetTop + offsetBottom + elHeight > scrollTop + windowHeight && !nowIsFixed) {
                setIsFixed(true)
                styles.value = {
                    bottom: `${offsetBottom}px`,
                    left: `${elOffsetLeft}px`
                };
            } else if (elOffsetTop + offsetBottom + elHeight < scrollTop + windowHeight && nowIsFixed) {
                setIsFixed(false)
                styles.value = {};
            }
    }
}

onMounted(() => {
    handleScroll()
    console.log(props.target);
    
    on(targetDom, 'scroll', handleScroll);
    on(targetDom, 'resize', () => {
        if (getOffsetVal(affixRef.value).top - props.offsetTop <= getScrollVal(window, true)) {
            isFixed.value = false;
            setIsFixed(false)
        }
        handleScroll();
    });
})

onBeforeUnmount(() => {
    off(targetDom, 'scroll', handleScroll);
    off(targetDom, 'resize', handleScroll);
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