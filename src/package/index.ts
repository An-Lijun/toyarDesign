import TyIcon from './components/icon';
import TyButton from './components/button';
const install = app => {
  app.use(TyIcon),
  app.use(TyButton)

}
const toyarUI = {
    install
}
export { TyIcon, TyButton}; //按需引入
export default toyarUI //全量引入