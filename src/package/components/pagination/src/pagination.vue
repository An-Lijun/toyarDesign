<template>
  <div class="ty-pagination">
    <div class="ty-pagination-total">
      <slot name="total">
        共 {{ props.total }} 条
      </slot>
    </div>
    <div class="ty-pagination-items">
        <div class="left">
          <TyIcon icon="ty-arrow-left-s-line"></TyIcon>
        </div>
        <div class="item" v-for="item in Number(props.total)">
          {{ item }}
        </div>
        <div class="right">
          <TyIcon icon="ty-arrow-right-s-line"></TyIcon>
        </div>
      </div>
  </div>
</template>
<script setup>
import TyIcon from '../../icon'
const props = defineProps({
  total: {
    type: [String, Number],
    required: true,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.ty-pagination{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin: 5px 0;
  .ty-pagination-items{
    flex: 1;
    display: flex;
    align-items: center;
    .left,.right{
      &:hover{
        cursor: pointer;
        --toyar-gray-10: var(--primary-6);
      }
    }
    .item{
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      margin-right: 8px;
      border-radius: 3px;
      color: var(--text-2);
      &:hover{
        cursor: pointer;
        // color: var(--primary-6);
        background-color: var(--fill-2);
      }
      &.active{
        color: var(--primary-6);
        background-color: var(--primary-2);
        
        &:hover{
          cursor: pointer;
          // color: var(--primary-6);
          color: var(--primary-6);
          background-color: var(--primary-2);
        }
      }
    }
  }
}
// ty-arrow-left-double-line
// ty-arrow-right-double-line
// ty-arrow-down-s-line
</style>
