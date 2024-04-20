import {installComp} from '../../utils'
import TyBreadcrumb from './src/breadcrumb.vue'
import TyBreadcrumbItem from './src/breadcrumb-item.vue'


installComp([TyBreadcrumb,TyBreadcrumbItem]) 

export {
  TyBreadcrumb,
  TyBreadcrumbItem
}