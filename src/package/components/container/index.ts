import TyContainer from './src/container.vue'
import TyMain from './src/main.vue'
import TyAside from './src/aside.vue'
import TyHeader from './src/header.vue'
import TyFooter from './src/footer.vue'

import {installComp} from '../../utils'

installComp([TyContainer,TyMain,TyAside,TyHeader,TyFooter])

export  {
    TyContainer,
    TyMain,
    TyAside,
    TyHeader,
    TyFooter
} 