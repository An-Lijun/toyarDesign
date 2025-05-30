
import './assets/index.scss'
import './icon/toyaricon.css'
import {version} from'../../package.json'

import TyIcon from './components/icon'
import TyButton from './components/button'
import TyButtonGroup from './components/button-group'
import TyDivider from './components/divider'
import TyRow from './components/row'
import TyCol from './components/col'
import TyForm from './components/form'
import TyFormItem from './components/form-item'
import TyInput from './components/input'
import TySelect from './components/select'
import {TyCheckBox,TyCheckBoxGroup} from './components/check-box'
import {TyRadio,TyRadioGroup} from './components/radio'
import TyDatePicker from './components/date-picker'
import TyDialog from './components/dialog'
import TyBackTop from './components/back-top'
import TyCard from './components/card'
import TyTable from './components/table'
import TyInputNumber from './components/input-number'
import TyInputPassword from './components/input-password'
import {
  TyContainer,
  TyMain,
  TyAside,
  TyHeader,
  TyFooter
} from './components/container'
import { TyMenu, TySubMenu, TyMenuGroup, TyMenuItem } from './components/menu'
import TyMessage from './components/message'
import TyAlert from './components/alert'
import TyResult from './components/result'
import TyImage from './components/image'
import TyNotification from './components/notification'
import TyWaterMark from './components/waterMark'
import {TyCollapse,TyCollapseItem} from './components/collapse'
import {TyTabs,TyTabItem} from './components/tabs'
import TyBadge from './components/badge'
import TyPageHeader from './components/page-header'
import TySwitch from './components/switch'
import TyPagination from './components/pagination'
import {LoadingJs as TyLoading} from './components/loading'
import TyLoadingDirc from './components/loading'
import TyEmpty from './components/empty'
import TyProgress from './components/progress'
import TySlider from './components/slider'
import {TySkeleton,TySkeletonItem} from './components/skeleton'
import TyCarousel from './components/carousel'
import TyTooltip from './components/tooltip'
import TyPopconfirm from './components/popconfirm'
import { TyList,TyListItem } from './components/list'
import TyRate from './components/rate'
import TyTransfer from './components/transfer'
import TyPoppover from './components/poppover'
import {TyBreadcrumb,TyBreadcrumbItem} from './components/breadcrumb'
import TyDescriptions from './components/descriptions'
import TyCaution from './components/caution'
import TyConfigProvider from './components/configProvider'
import TyDrawer from './components/drawer'
import TyCalendar from './components/calendar'
import TySpace from './components/space'
import TyAvatar from './components/avatar'
import TyAvatarGroup from './components/avatar-group'
import {TyThemeChange} from './hooks/changeTheme'
import TyScrollBar from './components/scrollbar'


// import TyTrigger from './components/trigger'
import generateColor from './color/index.js'



const install = app => {
    app.use(TyIcon),
    app.use(TyButton),
    app.use(TyButtonGroup),
    app.use(TyDivider),
    app.use(TyRow),
    app.use(TyCol),
    app.use(TyForm),
    app.use(TyFormItem),
    app.use(TyInput),
    app.use(TySelect),
    app.use(TyCheckBox),
    app.use(TyRadio),
    app.use(TyDatePicker),
    app.use(TyDialog),
    app.use(TyBackTop),
    app.use(TyCard),
    app.use(TyTable),
    app.use(TyInputNumber),
    app.use(TyInputPassword),
    app.use(TyContainer),
    app.use(TyMenu),
    app.use(TyResult),
    app.use(TyImage),
    app.use(TyWaterMark),
    app.use(TyCollapse),
    app.use(TyTabs),
    app.use(TyBadge),
    app.use(TyPageHeader),
    app.use(TySwitch),
    app.use(TyPagination),
    app.use(TyLoadingDirc),
    app.use(TyEmpty),
    app.use(TyProgress),
    app.use(TySlider),
    app.use(TySkeleton),
    app.use(TyCarousel),
    app.use(TyTooltip),
    app.use(TyPopconfirm),
    app.use(TyList),
    app.use(TyRate),
    app.use(TyTransfer),
    app.use(TyPoppover),
    app.use(TyBreadcrumb),
    app.use(TyDescriptions),
    app.use(TyCaution),
    app.use(TyConfigProvider),
    app.use(TyDrawer),
    app.use(TyCalendar),
    app.use(TySpace),
    app.use(TyAvatar),
    app.use(TyAvatarGroup),
    app.use(TyScrollBar),
    
  }
  // app.use(TyTrigger)
document.getElementsByTagName('html')[0].setAttribute('toyar-theme', 'light')




export default {
  version,
  install
} //全量引入

export {
  TyThemeChange
}
