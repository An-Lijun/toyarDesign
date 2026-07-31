<template>
    <div class="sw-demo">
        <h3>基础用法（默认 round / small）</h3>
        <div class="row">
            <TySwitch v-model="v1" />
            <span>当前值: {{ v1 }}</span>
        </div>

        <h3>尺寸（mini / small / medium / large）</h3>
        <div class="row">
            <div class="item">
                <TySwitch v-model="vSize" size="mini" />
                <span>mini</span>
            </div>
            <div class="item">
                <TySwitch v-model="vSize" size="small" />
                <span>small</span>
            </div>
            <div class="item">
                <TySwitch v-model="vSize" size="medium" />
                <span>medium</span>
            </div>
            <div class="item">
                <TySwitch v-model="vSize" size="large" />
                <span>large</span>
            </div>
        </div>

        <h3>类型（round / tube / inline）</h3>
        <div class="row">
            <div class="item">
                <TySwitch v-model="vType" type="round" size="large" />
                <span>round</span>
            </div>
            <div class="item">
                <TySwitch v-model="vType" type="tube" size="large" />
                <span>tube</span>
            </div>
            <div class="item">
                <TySwitch v-model="vType" type="inline" size="large" />
                <span>inline</span>
            </div>
        </div>

        <h3>开启 / 关闭文字</h3>
        <div class="row">
            <TySwitch v-model="vText" checked-text="开" unchecked-text="关" size="medium" />
            <TySwitch
                v-model="vText2"
                checked-text="已启用"
                unchecked-text="已禁用"
                size="large"
                type="tube"
            />
        </div>

        <h3>自定义 openValue / closeValue</h3>
        <div class="row">
            <TySwitch v-model="vCustom" open-value="enable" close-value="disable" size="large" />
            <span>当前值：{{ vCustom }}</span>
        </div>

        <h3>禁用状态</h3>
        <div class="row">
            <div class="item">
                <TySwitch v-model="vDis1" :disabled="true" size="large" />
                <span>禁用-关</span>
            </div>
            <div class="item">
                <TySwitch v-model="vDis2" :disabled="true" size="large" />
                <span>禁用-开</span>
            </div>
        </div>

        <h3>组合使用（大型+文字+自定义值）</h3>
        <TySwitch
            v-model="vCombo"
            open-value="ON"
            close-value="OFF"
            size="large"
            type="tube"
            checked-text="开启中"
            unchecked-text="已关闭"
        />
        <p>当前值：{{ vCombo }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({ name: 'SwitchDemo' })

const v1 = ref(false)
const vSize = ref(true)
const vType = ref(false)
const vText = ref(true)
const vText2 = ref(false)
const vCustom = ref('disable')
const vDis1 = ref(false)
const vDis2 = ref(true)
const vCombo = ref('ON')
</script>

<style scoped>
.sw-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}

.row {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 8px;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 80px;
}

span {
    color: #666;
    font-size: 13px;
}

p {
    margin: 8px 0 0;
    color: #333;
}
</style>
