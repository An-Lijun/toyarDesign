<template>
  <div class="divRoot">
    {{ selectValue }}
    <hr />
    <button
      @click="
        () => {
          selectValue = 'jz'
        }
      "
    >
      change
    </button>
    <hr />

    <TySelect
      v-model="selectValue"
      style="margin-bottom: 20px"
      placeholder="请选择"
    >
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' }
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </TySelectOption>
    </TySelect>

    <TySelect
      v-model="selectValue"
      style="margin-bottom: 20px"
      placeholder="请选择"
    >
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg', disabled: true }
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </TySelectOption>
    </TySelect>

    <TySelect
      v-model="selectValue"
      style="margin-bottom: 20px"
      placeholder="请选择"
      disabled
    >
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg', disabled: true }
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </TySelectOption>
    </TySelect>

    <TySelect
      v-model="selectValue"
      style="margin-bottom: 20px"
      placeholder="请选择"
    >
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg', disabled: true }
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <div style="display: flex; justify-content: space-between">
          <span>{{ item.value }}</span>

          <span>{{ item.label }}</span>
        </div>
      </TySelectOption>
    </TySelect>
  </div>
</template>
<script setup>
let selectValue = ref('')
</script>
<style lang="less" scoped></style>
