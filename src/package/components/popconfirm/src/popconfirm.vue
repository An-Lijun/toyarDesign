<template>
  <div class="ty-popconfirm" @click="isShowConfirm=true">
    <div class="confirm" 
      :style="style" 
      v-show="isShowConfirm"
      >
      <main>
        <slot name="content">
          {{ props.content }}
        </slot>
      </main>
      <div class="btnList">
        <TyButton 
          @click.stop="handleReject"
          type="secondary" size="mini" v-if="props.showRejectBtn">
          {{ props.rejectText }}
        </TyButton>
        <TyButton 
        @click.stop="handleReslove"
        size="mini" v-if="props.showResloveBtn">
          {{ props.resloveText }}
        </TyButton>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'top'
  },
  content:{
    type: String,
    default: ''
  },
  rejectText:{
    type:String,
    default:'取消'
  },
  showRejectBtn:{
    type:Boolean,
    default:true
  },
  resloveText:{
    type:String,
    default:'确定'
  },
  showResloveBtn:{
    type:Boolean,
    default:true
  }
})
let isShowConfirm = ref(false)

const handleReslove=()=>{
  isShowConfirm.value=false
}
const handleReject=()=>{
  isShowConfirm.value=false
  
}
const getPlacement = () => {
  switch (props.placement) {
    case 'top':
      return {
        top: '0',
        left: '50%',
        transform: 'translate(-50%, calc(-100% - 5px))'
      }
  }
}
let style = ref(getPlacement())
</script>
<style lang="scss" scoped>
.ty-popconfirm{
  position: relative;
  display: inline;
  .confirm{
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    // border: 1px solid #000;
    background-color: var(--tooltip);
    box-shadow: var(--box-shadow-2);
    border-radius: 5px;
    color: #fff;
    &>main{
      margin-bottom: 20px;
      text-align: left;
    }
    .btnList{
      display: flex;
      justify-content: center;
      align-items: center;
      .ty-button {
        margin: 0 5px;
      }
    }
    &:after {
      content: '';
      display: inline-block;
      // width: 10px;
      // height: 10px;
      // background-color: red;
      position: absolute;
      border: 10px solid transparent;
      border-top-color: var(--tooltip);
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, -2px);
    }
  }
}
</style>
