<template>
  <div class="ty-empty">
    <div class="inner">
      <TyIcon icon="ty-inbox-2-line"></TyIcon>
      <span>
        {{ title }}
      </span>
    </div>
  </div>
</template>
<script setup>
import TyIcon from "../../icon";
const props = defineProps({
  title: {
    type: String,
    default: "暂无数据"
  }
});
</script>
<style lang="scss" scoped>
.ty-empty{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  .inner{
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
