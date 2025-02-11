<template>
  <div class="container">
      <div style="display: flex;flex-wrap: wrap;" ref="lazyLoadRef">
        <div v-for="element in icons" class="iconBox" @click="copy(element.icon)">
          <div class="icon">
            <i :class="`toyar ${element.icon}`"> </i>
          </div>
          <div class="desc">
            {{ element.icon.slice(3) }}
          </div>
          <div class="belong">
            {{ element.alias.join(' ') }}
          </div>
        </div>
      </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  iconArr: {
    type: String,
    required:true
  }
})

const icons = ref([])
const lazyLoadRef = ref()
let TyMessage = () => {}
if (document) {
  import('../../src/package/index.ts').then(res => {
    TyMessage = res.TyMessage
  })
}
const copy = (item) => {
  navigator.clipboard.writeText(item);
  TyMessage('复制成功~')
}
const loadComponent= ()=>{
  import(`./icons/${props.iconArr}.js`).then(res => {
    icons.value =res[props.iconArr]
  })
}
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 当占位元素进入视口时
          loadComponent();
          // 停止观察
          observer.unobserve(entry.target);
        }
      });
    });
    // 开始观察占位元素
      observer.observe(lazyLoadRef.value);
})
</script>
<style lang="scss" scoped>
header,
.container {
  margin-bottom: 20px;
  box-sizing: border-box;
  min-height: 500px;
}

.titleBox {
  margin: 50px 0 30px 0 !important;
}

header {
  height: 80px;
  line-height: 80px;
}

header > .logo {
  font-size: 30px;
  height: 80px;
  width: 240px;
}

.iconBox {
  width: 135px;
  height: 140px;
  margin-bottom: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  /* float: left; */
  padding: 5px 10px;
  word-break: break-all;
  border: 1px solid transparent;
}

.icon {
  font-size: 35px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.desc {
  word-break: break-all;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
}
.belong{
  font-size: 10px;
  padding: 0 15px;
  text-align: center;
}

.iconBox:hover {
  border: 1px solid #1686c1;
  border-radius: 5px;
  cursor: pointer;
}

.iconBox:hover > .icon {
  color: #1686c1;
}

.iconBox:hover > .desc {
  color: #1686c1;
}

.messageDiv {
  transition: all 0.5s;
  position: fixed;
  display: flex;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  width: 200px;
  height: 40px;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
}
.messageDivLeft {
  height: 40px;
  display: flex;
  align-items: center;
}
.info {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: contain;
  margin: 0 20px;
  vertical-align: middle;
}

/* 成功消息 */
.messageDiv.success {
  background-color: #f0f9eb;
  color: #67c23a;
}

@keyframes messageLeave {
  0% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
}

.messageDiv.leave {
  animation: messageLeave 1s linear forwards;
}
</style>
