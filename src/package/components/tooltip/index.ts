import TyTooltip from './src/tooltip.vue'
TyTooltip.install = app=>{
    app.component('TyTooltip',TyTooltip)
}
export default TyTooltip 