import TyCollapse from './src/collapse.vue'
import TyCollapseItem from './src/collapse-item.vue'

TyCollapse.install = app=>{
    app.component('TyCollapse',TyCollapse),
    app.component('TyCollapseItem',TyCollapseItem)
}
export  {TyCollapse,TyCollapseItem} 