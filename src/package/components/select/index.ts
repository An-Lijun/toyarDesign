import TySelect from './select.vue'
import TyOption from './option.vue'
TySelect.install = app=>{
    app.component('TySelect',TySelect)
    app.component('TyOption',TyOption)
}
export default TySelect 