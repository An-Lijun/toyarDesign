import { version } from '../../package.json'

import './assets/index.scss'
import '../package/icon/toyaricon.css'
import TyButton from './components/button'
import TyButtonGroup from './components/button-group'
import TyDivider from './components/divider'
import TyRow from './components/row'
import TyCol from './components/col'
import TyForm from './components/form'
import TyFormItem from './components/form-item'
import TyInput from './components/input'
import TySelect,{TySelectOption} from './components/select'
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
import TyLogConsole from './components/logConsole'
import TyAffix from './components/affix'
import TyCircle from './components/circle'
import TyUpload from './components/upload'
import TyTimePicker from './components/time-picker'
import TyColorPicker from './components/color-picker'
// import TyTrigger from './components/trigger'
import generateColor from './color/index.js'

import allIcons from './iconList.js'

const install = app => {
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
    app.use(TyLogConsole),
    app.use(TyAffix),
    app.use(TyCircle),
    app.use(TyUpload),
    app.use(TyTimePicker),
    app.use(TyColorPicker)
  }
  // app.use(TyTrigger)
document.getElementsByTagName('html')[0].setAttribute('toyar-theme', 'light')




export default {
  version,
  install
} //全量引入

export {
  TyThemeChange,
  TyButton,
  TyButtonGroup,
  TyDivider,
  TyRow,
  TyCol,
  TyForm,
  TyFormItem,
  TyInput,
  TySelect,
  TyCheckBox,
  TyCheckBoxGroup,
  TyRadio,
  TyRadioGroup,
  TyDatePicker,
  TyDialog,
  TyBackTop,
  TyCard,
  TyTable,
  TyInputNumber,
  TyInputPassword,
  TyContainer,
  TyMain,
  TyAside,
  TyHeader,
  TyFooter,
  TyMenu,
  TySubMenu,
  TyMenuGroup,
  TyMenuItem,
  TyMessage,
  TyNotification,
  TyAlert,
  TyResult,
  TyImage,
  TyWaterMark,
  TyCollapse,TyCollapseItem,
  TyTabs,TyTabItem,
  TyBadge,
  TyPageHeader,
  TySwitch,
  TyPagination,
  TyLoading,
  TyEmpty,
  TyProgress,
  TySlider,
  TySkeleton,TySkeletonItem,
  TyCarousel,
  TyTooltip,
  TyPopconfirm,
  TyList,TyListItem ,
  TyRate,
  TyTransfer,
  TyPoppover,
  TyBreadcrumb,TyBreadcrumbItem,
  TyDescriptions,
  TyCaution,
  TyConfigProvider,
  TyDrawer,
  generateColor,
  TyCalendar,
  TySpace,
  TyAvatar,TyAvatarGroup,
  TyScrollBar,
  TyLogConsole,
  TyAffix,
  TyCircle,
  TyUpload,
  TyTimePicker,
  allIcons,
  TySelectOption,
  TyColorPicker
} //按需引入
// TyTrigger,
