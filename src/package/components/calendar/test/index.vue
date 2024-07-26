
<template>
  <div class="divRoot">
    <h6>
      {{ cal }}
    </h6>
    <div style="width: 900px;">
      <TyCalendar v-model="cal">
        <template #default="{day}">
            <div style="height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            
            ">
              <span v-if="day=='2024-07-26'" style="
                  color: #fa8c16;
                  background: #fff7e6;
                  border-color: #ffd591;
                  margin: 0 8px 0 0;
                  padding: 5px 7px;
                  font-size: 12px;
                  line-height: 20px;
              ">
            赵鹏奥生日
              </span>    
            </div>
        </template>
      </TyCalendar>
    </div>
    <br>
    <div style="width: 500px;">
      <TyCalendar v-model="cal" disabled></TyCalendar>
    </div>
    <br>

    <div style="width: 500px;" v-for="size in ['mini', 'small', 'medium', 'large']">
      <TyCalendar v-model="cal" :size="size"></TyCalendar>
      <br>
    </div>
  </div>
</template>
<script setup>
let cal =ref('')
</script>
<style lang="less" scoped>
</style>
