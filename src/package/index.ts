import TyIcon from './components/icon';
import TyButton from './components/button';
import TyButtonGroup from './components/buttonGroup';
import TyDivider from './components/divider';

import 'remixicon/fonts/remixicon.css'//字体图标
import './assets/index.scss';
document.getElementsByTagName('html')[0].setAttribute('toyar-theme','light');

const install = app => {
  app.use(TyIcon),
  app.use(TyButton),
  app.use(TyButtonGroup),
  app.use(TyDivider)

}
const toyarUI = {
    version:'1.0.0',
    install
}
export { TyIcon, TyButton,TyButtonGroup,TyDivider}; //按需引入
export default toyarUI //全量引入