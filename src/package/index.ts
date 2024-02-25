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
import TyChcekBox from './components/check-box'
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
    app.use(TyChcekBox),
    app.use(TyRadio),
    app.use(TyCalendar),
    app.use(TyDialog),
    app.use(TyBackTop),
    app.use(TyCard),
    app.use(TyTable),
    app.use(TyInputNumber),
    app.use(TyInputPassword),
    app.use(TyContainer),
    app.use(TyMenu)
}
const toyarUI = {
  version: '1.0.0',
  install
}

export default toyarUI //全量引入

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
  TyChcekBox,
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
  TyMessage
} //按需引入
