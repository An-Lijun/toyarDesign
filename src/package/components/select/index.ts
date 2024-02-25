import TySelect from './src/select.vue'
import TyOption from './src/option.vue'
TySelect.install = app=>{
    app.component('TySelect',TySelect)
    app.component('TyOption',TyOption)
}
export default TySelect 