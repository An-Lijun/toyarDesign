<template>
  <div class="block" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="demo-content">
      <!-- 插入组件 -->
      <slot name="demo"  ref="demo"></slot>
    </div>

    <div class="meta" ref="meta" :style="{ height: `${isShow ? codeAreaHeight + 'px' : '0px'}` }">
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
  computed: {
    codeArea() {
      return this.$el ? this.$el.getElementsByClassName('meta')[0] : null;
    },
    codeAreaHeight() {
      if (!this.$el) return 0;
      const description = this.$el.getElementsByClassName('description')[0];
      const codeContent = this.$el.getElementsByClassName('code-content')[0];
      if (description && codeContent) {
        return description.clientHeight + codeContent.clientHeight + 20;
      }
      return codeContent ? codeContent.clientHeight : 0;
    }
  },
  watch: {
    isShow(val) {
      if (val && this.codeArea) {
        this.$nextTick(() => {
          this.codeArea.style.height = `${this.codeAreaHeight + 1}px`;
        });
      } else if (this.codeArea) {
        this.codeArea.style.height = '0';
      }
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
      padding: 0 4px;
      box-sizing: border-box;
      border: solid 1px #ebebeb;
      border-radius: 3px;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      word-break: break-word;
      margin: 10px 10px 0;
      background-color: #fafafa;
    }

    .code-content {
      pre[class*='language-'] {
        margin: 0;
      }
    }

  .controlBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    box-sizing: border-box;
    background-color: #fafafa;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    transition: 0.2s;

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    .contll-btn {
      text-align: center;
      display: flex;
      align-items: center;

    }

    .icon {
      display: inline-block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #ccc;
      transition: 0.3s;
      line-height: 44px;

      &.isShow {
        border: 6px solid transparent;
        border-bottom: 6px solid #ccc;
      }

      &.hovering {
        transform: translateX(-50px);
      }
    }

    .etc {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      color: #409eff;
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
  height: 0;
  transition: height 0.2s;
  background-color: #282c34;
  border: solid 1px #ebebeb;
  border-radius: 3px;
}

.text-slide-enter,
.text-slide-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
</style>