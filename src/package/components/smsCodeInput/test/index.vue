<template>
  <div>
    <h2>
      {{ str }}
    </h2>
      <TySmsCodeInput v-model="str"/>


      <TySmsCodeInput v-model="str" :gap="3">

        <template #split>-</template>
        </TySmsCodeInput>

  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      str:''
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>

</style>
