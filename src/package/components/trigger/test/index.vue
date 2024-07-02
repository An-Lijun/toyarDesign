<template>
  <div class="divRoot">
    <div style="text-align: center;">
      <TyPoppover content="6666611116" trigger="click">
        6666611116
      </TyPoppover>
      <hr>
      <TyPoppover content="6666611116" trigger="click" placement="bottom">
        <span>
          6666611116
        </span>
      </TyPoppover>

      <hr>
      <TyPoppover content="6666611111111111111111111111111111111111116" trigger="click" placement="bottom">
        <span>
          66666111116
        </span>
      </TyPoppover>
    </div>

    <TyRow>
      <TyCol span="8">
        <TyPoppover content="6666611111111111111111111111111111111111116" trigger="click" placement="tl">

          <TyButton>
            左上
          </TyButton>
        </TyPoppover>
      </TyCol>
      <TyCol span="8">
        <TyPoppover content="6666611111111111111111111111111111111111116" trigger="click" placement="top">

          <TyButton>
            中上
          </TyButton>
        </TyPoppover>
      </TyCol>
      <TyCol span="8">
        <TyPoppover content="6666611111111111111111111111111111111111116" trigger="click" placement="tr">

          <TyButton>
            右上
          </TyButton>
        </TyPoppover>
      </TyCol>

      <TyCol span="8" style="margin-top: 100px;">
        <TyPoppover content="6666611111111111111111111111111111111111116" trigger="click" placement="bl">

          <TyButton>
            左下
          </TyButton>
        </TyPoppover>
      </TyCol>
      <TyCol span="8" style="margin-top: 100px;">
        <TyPoppover content="6666611111111111111111111111111111111111116" trigger="click" placement="bottom">
          <TyButton>
            中下
          </TyButton>
        </TyPoppover>
      </TyCol>
      <TyCol span="8" style="margin-top: 100px;">
        <TyPoppover content="6666611111111111111111111111111111111111116" trigger="click" placement="br">
          <TyButton>
            右下
          </TyButton>
        </TyPoppover>
      </TyCol>
    </TyRow>
  </div>
</template>
<script setup>
</script>
<style lang="less" scoped></style>
