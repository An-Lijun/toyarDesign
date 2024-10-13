<template>
  <div class="block" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="demo-content">
      <!-- 插入组件 -->
      <slot name="demo"  ref="demo"></slot>
    </div>

    <div class="meta" ref="meta" :style="{ maxHeight: `${isShow ? '1500px' : '0px'}` }">
      <div class="description" v-if="$slots.description">
        <!-- 插入描述信息 -->
        <slot name="description" ref="description"></slot>
      </div>
      <div class="code-content">
        <!-- 插入代码块 -->
        <slot name="source" ref="source"></slot>
      </div>
    </div>
    <div class="controlBox" @click="isShow = !isShow">
      <div class="contll-btn">
        <transition name="arrow-slide">
          <span class="icon" :class="{ 'hovering': hovering, 'isShow': isShow }" />
        </transition>

        <transition name="text-slide">
          <span v-show="hovering" :class="['etc']">{{
            isShow ? '收起代码' : '展开代码'
          }}</span>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isShow: false,
      hovering: false
    }
  },
  methods: {
    stripScript(content) {
      const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
      return result && result[2] ? result[2].trim() : '';
    },
    stripStyle(content) {
      const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
      return result && result[2] ? result[2].trim() : '';
    },
    stripTemplate(content) {
      content = content.trim();
      if (!content) {
        return content;
      }
      return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
    }
  },
  created() {
    // const highlight = this.$slots.description;
    // console.log(highlight);
    
    //   if (highlight && highlight[0]) {
    //     let code = '';
    //     let cur = highlight[0];
    //     if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
    //       cur = cur.children[0];
    //       if (cur.tag === 'code') {
    //         code = cur.children[0].text;
    //       }
    //     }
    //     console.log(code);
        
    //     if (code) {
    //       // this.codepen.html = stripTemplate(code);
    //       // this.codepen.script = stripScript(code);
    //       // this.codepen.style = stripStyle(code);
    //     }
    //   }
    // if (code) {
    //       // this.codepen.html = stripTemplate(code);
    //       // this.codepen.script = stripScript(code);
    //       // this.codepen.style = stripStyle(code);
    //     }
  },
  mounted() {
  },
}
</script>
<style lang="scss" scoped>
//  --box-shadow-1: 0 0 1px rgba(0, 0, 0, 0.8);
//   --box-shadow-2: 0 -2px 5px rgba(0, 0, 0, 0.1);
//   --box-shadow-3: 0 0 10px rgba(0, 0, 0, 0.1);
//   --box-shadow-4: 0 0 20px rgba(0, 0, 0, 0.1);
.block {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  padding: 14px;
  border-radius: 5px;
  padding-bottom: unset;
  transition: .2s;

  .description {
    padding: 5px 10px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .controlBox {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    height: 40px;

    .contll-btn {
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    }

    .icon {
      display: inline-block;
      width: 0px;
      height: 0px;
      border: 13px solid transparent;
      border-top: 12px solid rgba(0, 0, 0, 0.1);
      transform: translateY(7px);
      transition: all 0.8s;
      line-height: 30px;

      &.isShow {
        border: 13px solid transparent;
        border-bottom: 12px solid rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);

      }

      &.hovering {
        transform: translate(-10px, 7px);
      }

      &.hovering.isShow {
        transform: translate(-10px, -3px);
      }
    }

    .etc {
      margin-left: 5px;
      color: #165DFF;
      transition: all 0.8s;
      position: absolute;
      font-size: 12px;
      line-height: 30px;
    }
  }

  // .showBox:hover {

  //   .icon {
  //     border-top: 10px solid #165DFF;
  //   }
  // }

  // .disBox {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   border-top: 1px solid rgba(0, 0, 0, 0.1);
  //   margin-top: 10px;
  //   padding: 5px 0;
  //   transition: all 1s;

  //   .icon {
  //     display: inline-block;
  //     width: 0px;
  //     height: 0px;


  //     &.hovering {
  //       transform: translateX(-40px);
  //     }
  //   }

  //   .etc {
  //     margin-left: 10px;
  //     color: #165DFF;
  //     font-size: 12px;
  //     transition: all 1s;
  //     cursor: pointer;
  //   }
  // }

  // .disBox:hover {
  //   & .icon {
  //     border-bottom: 12px solid #165DFF;
  //   }
  // }
}



.meta {
  overflow: hidden;
  transition: all .5s;
}

.text-slide-enter,
.text-slide-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
</style>