<template>
  <div class="divRoot">
    <br>
    <TyBadge class="mg" :text="1" v-for=" item in ['primary', 'success', 'warning', 'danger']" :status="item">
      <TyButton >1</TyButton>
    </TyBadge>
    <hr>
    <TyBadge class="mg" :max="5" :text="10" v-for=" item in ['primary', 'success', 'warning', 'danger']" :status="item">
      <TyButton >1</TyButton>
    </TyBadge>
    <hr>
    <TyBadge class="mg" :dot="true" :max="5" :text="10" v-for=" item in ['primary', 'success', 'warning', 'danger']" :status="item">
      <TyButton >1</TyButton>
    </TyBadge>
    <hr>

    <TyBadge class="mg" :max="5" text="优化" v-for=" item in ['primary', 'success', 'warning', 'danger']" :status="item">
      <TyButton >1</TyButton>
    </TyBadge>
    <TyBadge class="mg" :max="5" text="优化" v-for=" item in ['primary', 'success', 'warning', 'danger']" :status="item">
      <TyButton >1</TyButton>
      <template #icon>
        <TyiArrowDownCircleFill icon="ty-arrow-down-circle-fill" color="#fff"></TyiArrowDownCircleFill>
      </template>
    </TyBadge>
  </div>
</template>
<script setup>
import {TyiArrowDownCircleFill} from 'toyaricon'
</script>
<style>
.mg{
  margin: 0 10px;
}
</style>
