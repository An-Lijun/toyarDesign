<template>
    <div class="divRoot">
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <TyAffix :offsetTop="0">
            111
        </TyAffix>
        <UseAffix :offsetTop="52">
            useAffix111    
        </UseAffix>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>

        <TyAffix :offsetTop="100">
            2222
        </TyAffix>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>


        <div v-for="item in 5">
            <br>
            <hr>
        </div>



        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <TyAffix :offsetTop="100">
            2222
        </TyAffix>

        <div v-for="item in 5">
            <br>
            <hr>
        </div>

        <TyAffix :offsetBottom="20">
            33333
        </TyAffix>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
        <div v-for="item in 5">
            <br>
            <hr>
        </div>
    </div>
</template>
<script setup>
import UseAffix from './useAffix.vue'
</script>
<style>
.mg {
    margin: 0 10px;
}
</style>