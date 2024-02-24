import TyMenu from './src/menu.vue'
import TySubMenu from './src/subMenu.vue'
import TyMenuGroup from './src/menuGroup.vue'
import TyMenuItem from './src/menuItem.vue'


TyMenu.install = app => {
  app.component('TyMenu', TyMenu), 
  app.component('TySubMenu', TySubMenu),
  app.component('TyMenuGroup', TyMenuGroup),
  app.component('TyMenuItem', TyMenuItem)

}
export  {
  TyMenu,
  TySubMenu,
  TyMenuGroup,
  TyMenuItem
}
