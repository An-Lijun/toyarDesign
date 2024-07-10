<template>
  <section :class="[nm.b(), nm.is('fold', isFold)]">
    <header>
      <slot name="header"></slot>
    </header>
    <div :class="nm.e('inner')">
      <slot v-if="!option"> </slot>
      <optionsRender v-else :option="option"/>
    </div>
  </section>
</template>
<script setup>
import optionsRender from './optionsRender'
import { provideLevel } from './hooks/level.ts'
import { nm, menuProps ,emits} from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'

defineOptions({
  name: 'TyMenu'
})
const props = defineProps(menuProps)
const emit = defineEmits(emits)
const { model } = useCompMvalue(props, emit,{
  setFn:(value)=> {
    emit('change',value)
    return value
  }
})
const openId = ref('')
// 给menu 注入层级
provide('menu', {
  isFold: computed(() => props.isFold),
  lastMenuFn: null,
  setOpenId: value => {
    openId.value = value
  },
  openId,
  model:computed(()=>{
    return model.value
  }),
  setModel:(val)=>{
    model.value = val
  }
})

watch(
  () => props.isFold,
  newVal => {
    openId.value = ''
  },
  {
    deep: true
  }
)

</script>
<style lang="scss" scoped>
.ty-menu {
  height: 100%;
  width: 250px;
  background: var(--color-bg-2);
  padding: 0 5px;
  overflow: auto;
  transition: background-color 1s;
  box-sizing: border-box;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  &.is-fold {
    width: 50px;
    transition: all 0.5s;
  }
}
</style>
