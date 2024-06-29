<template>
  <div class="divRoot">
    <h2>测试标题</h2>
    <TyButton @click="fn">点我</TyButton>
    <TyDrawer v-model="model">
      <template #header>
        123
      </template>
      66666666666666666
      <template #footer>
        <TyButton style="margin-right: 20px;">
          确认
        </TyButton>

        <TyButton type="secondary">
          取消
        </TyButton>
      </template>
    </TyDrawer>
  </div>
</template>
<script setup>
let model = ref(false)
const fn = () => {
  model.value = !model.value
}

</script>
<style lang="less" scoped></style>
