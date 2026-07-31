<template>
    <div class="checkbox-demo">
        <h3>基础用法（Boolean v-model）</h3>
        <TyCheckBox v-model="checked">单个复选框</TyCheckBox>
        <p>当前值: {{ checked }}</p>

        <h3>不同尺寸</h3>
        <TyCheckBox v-model="checked" size="mini">Mini</TyCheckBox>
        <TyCheckBox v-model="checked" size="small">Small</TyCheckBox>
        <TyCheckBox v-model="checked" size="medium">Medium</TyCheckBox>
        <TyCheckBox v-model="checked" size="large">Large</TyCheckBox>

        <h3>禁用状态</h3>
        <TyCheckBox v-model="checked" disabled>禁用</TyCheckBox>
        <TyCheckBox v-model="disabledChecked" disabled>禁用且选中</TyCheckBox>

        <h3>半选状态</h3>
        <TyCheckBox v-model="checked" canHarf>半选</TyCheckBox>

        <h3>数组 v-model（多选）</h3>
        <TyCheckBox v-model="selected" value="apple">苹果</TyCheckBox>
        <TyCheckBox v-model="selected" value="banana">香蕉</TyCheckBox>
        <TyCheckBox v-model="selected" value="cherry">樱桃</TyCheckBox>
        <p>已选: {{ selected }}</p>

        <h3>CheckBoxGroup 基础用法</h3>
        <TyCheckBoxGroup v-model="groupValue">
            <TyCheckBox value="east">东</TyCheckBox>
            <TyCheckBox value="south">南</TyCheckBox>
            <TyCheckBox value="west">西</TyCheckBox>
            <TyCheckBox value="north">北</TyCheckBox>
        </TyCheckBoxGroup>
        <p>已选方向: {{ groupValue }}</p>

        <h3>Group 禁用</h3>
        <TyCheckBoxGroup v-model="groupValue" disabled>
            <TyCheckBox value="east">东</TyCheckBox>
            <TyCheckBox value="south">南</TyCheckBox>
        </TyCheckBoxGroup>

        <h3>Group 最大选择数（max=2）</h3>
        <TyCheckBoxGroup v-model="maxGroup" :max="2">
            <TyCheckBox value="a">A</TyCheckBox>
            <TyCheckBox value="b">B</TyCheckBox>
            <TyCheckBox value="c">C</TyCheckBox>
            <TyCheckBox value="d">D</TyCheckBox>
        </TyCheckBoxGroup>
        <p>已选: {{ maxGroup }} (最多选2个)</p>

        <h3>Group 自定义尺寸</h3>
        <TyCheckBoxGroup v-model="groupValue" size="large">
            <TyCheckBox value="east">东</TyCheckBox>
            <TyCheckBox value="south">南</TyCheckBox>
        </TyCheckBoxGroup>
    </div>
</template>

<script setup>
defineOptions({ name: 'CheckBoxDemo' })

const checked = ref(true)
const disabledChecked = ref(true)
const selected = ref(['apple'])
const groupValue = ref(['east', 'south'])
const maxGroup = ref(['a'])
</script>

<style scoped>
.checkbox-demo {
    padding: 16px;
}

.checkbox-demo > * {
    margin-bottom: 8px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}

p {
    color: #666;
    font-size: 14px;
}
</style>
