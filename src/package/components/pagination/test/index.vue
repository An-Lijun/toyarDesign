<template>
  <div class="divRoot">
    <TyPagination :total="total" :pageSize="15" :current="current" @currentChange="currentChange"> </TyPagination>
  </div>
</template>
<script setup>
const total = ref(31)
const pageSize = ref(10)
const current = ref(1)
const layout = ref('total, sizes, prev, pager, next, jumper')
const small = ref(false)
const background = ref(false)
const hideOnSinglePage = ref(false)
const pagerCount = ref(5)
const currentChange = (val) => {
  console.log(val)
  current.value =val
}

</script>
<style lang="scss" scoped></style>
