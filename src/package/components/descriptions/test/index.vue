<template>
  <div class="divRoot">
    <!-- <h2>测试标题</h2> -->
    <TyDescriptions title="User Info" :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]" />

<TyDescriptions layout="row" title="User Info" :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]" />
  </div>
</template>
<script setup>
import { TyDescriptions } from '@/package';

</script>
<style lang="scss" scoped></style>
