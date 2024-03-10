import TyProgress from './src/progress.vue'
TyProgress.install = app=>{
    app.component('TyProgress',TyProgress)
}
export default TyProgress 