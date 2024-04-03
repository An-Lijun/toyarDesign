import TyList from './src/list.vue'
import TyListItem from './src/list-item.vue'


import { installComp } from '../../utils'

installComp([TyList,TyListItem])

export  {
  TyListItem,
  TyList
} 