import TyContainer from './src/container.vue'
import TyMain from './src/main.vue'
import TyAside from './src/aside.vue'
import TyHeader from './src/header.vue'
import TyFooter from './src/footer.vue'


TyContainer.install = app=>{
    app.component('TyContainer',TyContainer),
    app.component('TyMain',TyMain),
    app.component('TyAside',TyAside),
    app.component('TyHeader',TyHeader),
    app.component('TyFooter',TyFooter)

}

export  {
    TyContainer,
    TyMain,
    TyAside,
    TyHeader,
    TyFooter
} 