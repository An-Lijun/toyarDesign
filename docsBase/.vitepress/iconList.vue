<template>
  <div class="container">
      <div style="display: flex;flex-wrap: wrap;">
        <div v-for="element in iconArr" class="iconBox" @click="copy(element.icon)">
          <div class="icon">
            <i :class="`toyar ${element.icon}`"> </i>
          </div>
          <div class="desc">
            {{ element.icon.slice(3, element.icon.length - 5) }}
          </div>
        </div>
      </div>
  </div>
</template>
<script setup>
const props = defineProps({
  iconArr: {
    type: Array,
    required:true
  }
})

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
</script>
<style lang="scss" scoped>
header,
.container {
  // width: 1200px;
  // margin: 0 auto;
  margin-bottom: 20px;
  box-sizing: border-box;
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
  width: 114px;
  height: 100px;
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
  font-size: 25px;
  text-align: center;
}

.desc {
  word-break: break-all;
  overflow: hidden;
  font-size: 12px;
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
