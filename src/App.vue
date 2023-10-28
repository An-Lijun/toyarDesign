

<template>
  <header>
    <button @click="change">切换</button>
  </header>
  <TyIcon  icon="ri-ancient-gate-fill"  :size="100" />

  <ty-divider>111</ty-divider>
  <div style="height: 50px;">
  <ty-divider direction="column"></ty-divider>

  </div>
  <div style="font-size: 120px;">
    <TyIcon  icon="ri-ancient-gate-fill"  :size="100" style="color: var(--text-4);"/>
  </div>
    <ty-icon icon="ri-arrow-up-circle-fill" :size="100"/>
  <div>
    <ty-button @click="fn"  v-for="item in ['primary','danger','success','warning']" :state="item">btn</ty-button>
  </div>
  <div>
    <ty-button disabled  v-for="item in ['primary','danger','success','warning']" :state="item">btn</ty-button>
  </div>
  <hr>
  <div>
    <ty-button size="small"  v-for="item in ['primary','danger','success','warning']" :state="item"  type="secondary">btn</ty-button>
  </div>
  <div>
    <ty-button   v-for="item in ['primary','danger','success','warning']" :state="item"  type="secondary">btn</ty-button>
  </div>
  <div>
    <ty-button size="medium"   v-for="item in ['primary','danger','success','warning']" :state="item"  type="secondary">btn</ty-button>
  </div>
  <div>
    <ty-button size="large"   v-for="item in ['primary','danger','success','warning']" :state="item"  type="secondary">btn</ty-button>
  </div>
  <div>
    <ty-button size="large"  disabled  v-for="item in ['primary','danger','success','warning']" :state="item"  type="secondary">btn</ty-button>
  </div>
  <hr>
  <div>
    <ty-button size="large"  type="dashed"  v-for="item in ['primary','danger','success','warning']" :state="item"  >btn</ty-button>
  </div>
  <div>
    <ty-button size="large" disabled  type="dashed"  v-for="item in ['primary','danger','success','warning']" :state="item"  >btn</ty-button>
  </div>
  <hr>
  <div>
    <ty-button size="large"  type="text"  v-for="item in ['primary','danger','success','warning']" :state="item"  >btn</ty-button>
  </div>
  <div>
    <ty-button size="large"  type="text" disabled  v-for="item in ['primary','danger','success','warning']" :state="item"  >btn</ty-button>
  </div>
  <hr>
  <div>
    <ty-button size="large"  type="link"  v-for="item in ['primary','danger','success','warning']" :state="item"  >btn</ty-button>
  </div>
  <div>
    <ty-button size="large"  type="link" disabled v-for="item in ['primary','danger','success','warning']" :state="item"  >btn</ty-button>
  </div>
  <div>
    <ty-button>
    <ty-icon icon="ri-ancient-gate-fill" color="#fff"/>
  </ty-button>
  <ty-button>
    添加<ty-icon icon="ri-add-fill" color="#fff"/>
  </ty-button>
  <ty-button>
   <ty-icon icon="ri-add-fill" color="#fff"/> 添加
  </ty-button>
  <br>
  <ty-button block> 
   <ty-icon icon="ri-add-fill" color="#fff"/> 添加
  </ty-button>
  </div>
  <hr>
  <ty-button shape="round"> 
   <ty-icon icon="ri-add-fill" color="#fff"/> 添加
  </ty-button>
  <ty-button shape="circle" > 
   <ty-icon icon="ri-add-fill" color="#fff" />
  </ty-button>
  <br>

  <ty-button shape="circle" size="mini"> 
   <ty-icon icon="ri-add-fill" color="#fff" />
  </ty-button>
  <ty-button shape="circle" > 
   <ty-icon icon="ri-add-fill" color="#fff"  size="small"/>
  </ty-button>
  <ty-button shape="circle"  size="medium"> 
   <ty-icon icon="ri-add-fill" color="#fff"/>
  </ty-button>
  <ty-button shape="circle" size="large"> 
   <ty-icon icon="ri-add-fill" color="#fff"/>
  </ty-button>
  <hr>
  <ty-button-group>
    <ty-button @click="fn"  v-for="item in ['primary','danger','success','warning']" :state="item">btn</ty-button>
  </ty-button-group>
</template>
<script setup lang="ts">
  let boolean =true
  const change=()=>{
    boolean=!boolean
    let html = document.getElementsByTagName('html');
      html[0].setAttribute('toyar-theme', boolean?'light':'dark')
  }
  const fn=()=>{
    console.log(123);
    
  }
</script>
<style scoped>

</style>
