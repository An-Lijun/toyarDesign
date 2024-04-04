import TyMenu from './src/menu.vue'
import TySubMenu from './src/subMenu.vue'
import TyMenuGroup from './src/menuGroup.vue'
import TyMenuItem from './src/menuItem.vue'
import { installComp } from '../../utils'

installComp([TyMenu,TyMenuGroup,TyMenuItem,TySubMenu])

export {
  TyMenu,
  TySubMenu,
  TyMenuGroup,
  TyMenuItem
}
