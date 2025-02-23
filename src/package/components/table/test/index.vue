<template>
  <div class="divRoot">

    <TyTable size="small" :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
      {
        name: '张三',
        age: '18',
        address: '南京',
        children: [
          {
            name: '张三11',
            age: '18',
            address: '南京'
          },
          {
            name: '李四22',
            age: '18',
            address: '上海'
          },
          {
            name: '张二麻子33',
            age: '18',
            address: '长春'
          }
        ]
      },
      {
        name: '李四',
        age: '18',
        address: '上海'
      },
      {
        name: '张二麻子',
        age: '18',
        address: '长春'
      }
    ]">
      <template #operation="scroped">
        <TyButton @click="fnner(scroped.row)">{{ scroped.row.address }}</TyButton>
      </template>
    </TyTable>

    <TyTable :rowSelection="rowSelection" rowKey="name" :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
        {
          name: '张三',
          age: '18',
          address: '南京',
          children:[
            {
              name: '张三1',
              age: '18',
              address: '南京'
            },
            {
              name: '张三2',
              age: '18',
              address: '南京'
            },
            {
              name: '张三3',
              age: '18',
              address: '南京'
            }
          ]
        },
        {
          name: '李四',
          age: '18',
          address: '上海'
        },
        {
          name: '张二麻子',
          age: '18',
          address: '长春'
        }
      ]">
    </TyTable>


    {{ rowSelection.selectedRows }}
    <TyTable :rowSelection="rowSelection" rowKey="name" :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
        {
          name: '张三',
          age: '18',
          address: '南京'
        },
        {
          name: '李四',
          age: '18',
          address: '上海'
        },
        {
          name: '张二麻子',
          age: '18',
          address: '长春'
        }
      ]">
    </TyTable>



    <br>
    <br>
    <br>
    <br>

    {{ rowSelection2.selectedRows }}
    <TyTable :rowSelection="rowSelection2" rowKey="name" :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
        {
          name: '张三',
          age: '18',
          address: '南京'
        },
        {
          name: '李四',
          age: '18',
          address: '上海'
        },
        {
          name: '张二麻子',
          age: '18',
          address: '长春'
        }
      ]">
    </TyTable>

    <TyTable size="mini" :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
    ]">
      <template #operation="scroped">
        <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
      </template>
    </TyTable>
    <br>
    <TyTable size="large" :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
      {
        name: '张三',
        age: '18',
        address: '南京'
      },
      {
        name: '李四',
        age: '18',
        address: '上海'
      },
      {
        name: '张二麻子',
        age: '18',
        address: '长春'
      }
    ]">
      <template #operation="scroped">
        <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
      </template>
    </TyTable>
    <TyTable size="medium" :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
      {
        name: '张三',
        age: '18',
        address: '南京'
      },
      {
        name: '李四',
        age: '18',
        address: '上海'
      },
      {
        name: '张二麻子',
        age: '18',
        address: '长春'
      }
    ]">
      <template #operation="scroped">
        <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
      </template>
    </TyTable>
    <TyTable stripe align="right" :borders="['out', 'row', 'column']" size="mini" :columns="[
      {
        title: '姓名', width: '80px', key: 'name',
        showOverflow: 'tooltip'
      },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]" :data="[
      {
        name: '张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三',
        age: '18',
        address: '南京'

      },
      {
        name: '李四',
        age: '18',
        address: '上海'
      },
      {
        name: '张二麻子',
        age: '18',
        address: '长春'
      }
    ]">
    </TyTable>


  </div>
</template>
<script setup>
import { ref } from 'vue'
const rowSelection = ref({
  type: 'radio',
  selectedRows: []
})

const rowSelection2 = ref({
  type: 'checkbox',
  selectedRows: []
})

const fnner = row => {
  console.log(row)
}
</script>
<style lang="less" scoped></style>
