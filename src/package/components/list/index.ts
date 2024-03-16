import TyList from './src/list.vue'
import TyListItem from './src/list-item.vue'


TyList.install = app=>{
    app.component('TyList',TyList)
    app.component('TyListItem',TyListItem)
}
export  {
  TyListItem,
  TyList
} 