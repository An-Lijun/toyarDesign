<template>
  <div class="divRoot">
    {{ selectValue }}
    <hr>
    <button
    @click="
      () => {
        selectValue = 'jz'
      }
    "
  >
    change
  </button>
    <hr>

    <TySelect v-model="selectValue" style="margin-bottom: 20px">
    <TyOption
      v-for="(item, index) in [
        { label: '香蕉', value: 'xj' },
        { label: '橘子', value: 'jz' }
      ]"
      :key="index"
      :label="item.label"
      :value="item.value"
    >
    </TyOption>
  </TySelect>
  </div>
</template>
<script setup>
let selectValue = ref('')

</script>
<style lang="less" scoped>
</style>
