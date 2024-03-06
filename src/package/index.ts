import TyIcon from './components/icon'
import TyButton from './components/button'
import TyButtonGroup from './components/buttonGroup'
import TyDivider from './components/divider'
import TyRow from './components/row'
import TyCol from './components/col'
import TyForm from './components/form'
import TyFormItem from './components/form-item'
import TyInput from './components/input'
import TySelect from './components/select'
import TyCheckBox from './components/check-box'
import TyRadio from './components/radio'
import TyCalendar from './components/calendar'
import TyDialog from './components/dialog'
import TyBackTop from './components/backTop'
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



import './icon/toyaricon.css'
import './assets/index.scss'
document.getElementsByTagName('html')[0].setAttribute('toyar-theme', 'light')

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
    app.use(TyCalendar),
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
    app.use(TySwitch)
}

export default {
  version: '0.0.1',
  install
} //全量引入

export {
  TyIcon,
  TyButton,
  TyButtonGroup,
  TyDivider,
  TyRow,
  TyCol,
  TyForm,
  TyFormItem,
  TyInput,
  TyCheckBox,
  TyRadio,
  TyCalendar,
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
  TySwitch
} //按需引入
