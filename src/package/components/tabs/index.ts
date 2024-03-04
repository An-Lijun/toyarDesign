import TyTabs from './src/tabs.vue'
import TyTabItem from './src/tab-item.vue'
TyTabs.install = app=>{
    app.component('TyTabs',TyTabs),
    app.component('TyTabItem',TyTabItem)
}
export {
    TyTabs,
    TyTabItem
} 