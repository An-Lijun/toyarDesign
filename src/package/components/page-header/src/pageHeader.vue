<template>
  <div class="ty-pageHeader">
    <slot name="head">
    </slot>
    <div class="ty-pageHeader-heading">
      <div class="ty-pageHeader-back" v-if="props.showBack" @click="emit('back')">
        <slot name="back">
          <TyIcon icon="ty-arrow-left-fill"></TyIcon>
        </slot>
      </div>
      <TyDivider
      v-if="props.showBack"
        style="--toyar-gray-2: var(--toyar-gray-10)"
        direction="column"
      ></TyDivider>
      <div class="ty-pageHeader-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="ty-pageHeader-subTitle">
        <slot name="subTitle">
          {{ subTitle }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['back'])
</script>
<style lang="scss" scoped>
.ty-pageHeader {
  padding: 20px;
  .ty-pageHeader-heading {
    height: 30px;
    align-items: center;
    display: flex;
    font-size: 26px;
    .ty-pageHeader-title {
      color: var(--text-1);
    }
    .ty-pageHeader-subTitle {
      color: var(--text-4);
      margin-left: 20px;
      font-size: 20px;
    }
  }
}
</style>
