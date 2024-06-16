import TySubMenu from "./subMenu.vue"
import TyMenuItem from "./menuItem.vue"
import TyIcon from "../../icon/index"
import { defineComponent, defineProps, renderSlot, h } from "vue"

export default defineComponent({
  name: 'optionsRender',
  props: {
    option: {
      type: Array
    }
  },
  methods: {
    genMenu(h, item) {
      if (item.type === 'subMenu') {
        return this.renderSub(h, item)
      } else {
        return this.renderItem(h, item)
      }
    },
    renderSub(h, item) {
      return h(TySubMenu,
        {

        }, 
        {
        default: () => {
          return item.children.map(ite => this.genMenu(h, ite))
        },
        title: () => {
          return item.label
        },
        icon:()=>{
          return h(TyIcon,{
            icon:'ty-palette-fill'
          })
        }
      }
      )
    },
    renderItem(h, item) {
      return h(TyMenuItem, {}, item.label)
    },
  },
  render(props) {
    return h('div', {},
      props.option.map(item => {
        return this.genMenu(h, item)
      })
    )
  }
})
