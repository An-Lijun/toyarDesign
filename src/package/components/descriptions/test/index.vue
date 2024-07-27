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

<TyDescriptions layout="row" size="mini" title="User Info" :data="[
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
    <TyDescriptions  size="small" layout="row" title="User Info" :data="[
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
    <TyDescriptions size="medium" layout="row" title="User Info" :data="[
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
    <TyDescriptions size="large" layout="row" title="User Info" :data="[
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


<hr>
<TyDescriptions size="large" align="left" layout="row" title="User Info" :data="[
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
        <TyDescriptions  align="center" size="large" layout="row" title="User Info" :data="[
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
        <TyDescriptions  align="right" size="large" layout="row" title="User Info" :data="[
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

<TyDescriptions :border="true"  align="right" size="large" layout="row" title="User Info" :data="[
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
