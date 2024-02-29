<template>
  <div class="block">
    <div class="demo-content">
      <!-- 插入组件 -->
      <slot name="demo"></slot>
    </div>

    <div class="meta" ref="meta" :style="{maxHeight:`${isShow?'1500px':'0px'}`}">
      <div class="description">
        <!-- 插入描述信息 -->
        <slot name="description"></slot>
      </div>
      <div class="code-content">
        <!-- 插入代码块 -->
          <slot name="source"></slot>
        </div>
    </div>
    <div v-show="!isShow" class="showBox">
        <span class="icon"></span> <span class="etc" @click="isShow=!isShow">展开代码</span>
     </div>
      <div v-show="isShow" class="disBox">
        <span class="icon"></span> <span class="etc" @click="isShow=!isShow">收起代码</span>
      </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      isShow:false
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
<style lang="scss" scoped>
//  --box-shadow-1: 0 0 1px rgba(0, 0, 0, 0.3);
//   --box-shadow-2: 0 -2px 5px rgba(0, 0, 0, 0.1);
//   --box-shadow-3: 0 0 10px rgba(0, 0, 0, 0.1);
//   --box-shadow-4: 0 0 20px rgba(0, 0, 0, 0.1);

  .block{
    // border: 1px solid #ebebeb;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    padding:  14px;
    border-radius: 5px;
    padding-bottom: unset;
    transition: all .5s;
  }
  .showBox{
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1) ;
    margin-top: 10px;
    padding: 5px 0;
    .icon{
      display: inline-block;
      width: 0px;
        height: 0px;
        border: 13px solid transparent;
        border-top: 12px solid rgba(0, 0, 0, 0.1);
        transform: translateY(5px);
    }
    .etc{
      margin-left: 10px;
      display: none;
      color: #165DFF;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .showBox:hover{

    .icon{
      border-top: 10px solid #165DFF;
    }
    .etc{
      display: block;
    }
  }
  .disBox{
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1) ;
    margin-top: 10px;
    padding: 5px 0;
    .icon{
      display: inline-block;
      width: 0px;
        height: 0px;
        border: 13px solid transparent;
        border-bottom: 12px solid rgba(0, 0, 0, 0.1);
        transform: translateY(-7px);
    }
    .etc{
      margin-left: 10px;
      display: none;
      color: #165DFF;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .disBox:hover{
    &>.icon{
      border-bottom: 12px solid #165DFF;
    }
    &>.etc{
      display: block;
    }
  }
  .meta{
    overflow: hidden;
    transition: all .5s;
  }
</style>