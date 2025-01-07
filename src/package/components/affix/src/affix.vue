<template>
    <div ref="affixRef">
        <div :class="[nm.b(),nm.is('fixed',glAffix)]" :style="styles" >
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

const getScroll = (target, top) => {
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    let ret = target[prop];

    if (typeof ret !== 'number') {
        ret = window.document.documentElement[method];
    }

    return ret;
}

const getOffset = (element) => {
    const rect = element.getBoundingClientRect(); // 获取 element的 top bottom left right
    const scrollTop = getScroll(window, true); // window.pageYOffset（ 滚动条距离顶部的偏移量 ）
    const scrollLeft = getScroll(window); // window.pageXOffset

    const docEl = window.document.body;
    const clientTop = docEl.clientTop || 0;
    const clientLeft = docEl.clientLeft || 0;
    return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
    };
}

const affixRef = ref()

const offsetType = computed(() => {
    let type = 'top';
    if (props.offsetBottom >= 0) {
        type = 'bottom';
    }

    return type;
});

let glAffix = ref(false)
let styles = ref({})

const handleScroll = () => {
    let affix = glAffix.value
    const scrollTop = getScroll(window, true); // window.pageYOffset（ 滚动条距离顶部的偏移量 ）
    const elOffset = getOffset(affixRef.value); // 获取元素原始的 top left
    const windowHeight = window.innerHeight; // 获取窗口大小
    const elHeight = affixRef.value.offsetHeight; // 获取当前元素的height
    // Fixed Top
    
    if (
        elOffset.top - props.offsetTop <= scrollTop &&
       offsetType.value == 'top' &&
        !affix
    ) {
        glAffix.value = true;
        styles.value = {
            top: `${props.offsetTop}px`,
            left: `${elOffset.left}px`
        };
        // this.$emit('on-change', true);
    } else if (
        elOffset.top - props.offsetTop > scrollTop &&
       offsetType.value == 'top' &&
        affix
    ) {
        glAffix.value = false;
        styles.value = null;
        // this.$emit('on-change', false);
    }




    // Fixed Bottom
    if (
        elOffset.top + props.offsetBottom + elHeight >
        scrollTop + windowHeight &&
       offsetType.value == 'bottom' &&
        !affix
    ) {
        glAffix.value = true;
        styles.value = {
            bottom: `${props.offsetBottom}px`,
            left: `${elOffset.left}px`
        };

        // this.$emit('on-change', true);
    } else if (
        elOffset.top + props.offsetBottom + elHeight <
        scrollTop + windowHeight &&
       offsetType.value == 'bottom' &&
        affix
    ) {
        glAffix.value = false;
        styles.value = null;
        // this.$emit('on-change', false);
    }
}


onMounted(() => {
    handleScroll()
    on(window, 'scroll', handleScroll);
    on(window, 'resize', () => {
        const scrollTop = getScroll(window, true); // window.pageYOffset（ 滚动条距离顶部的偏移量 ）
        const elOffset = getOffset(affixRef.value); // 获取元素原始的 top left
        if (elOffset.top - props.offsetTop <= scrollTop) {
            affix = false;
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
.is-fixed{
    position:fixed;
}
</style>