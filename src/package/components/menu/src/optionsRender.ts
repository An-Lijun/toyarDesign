import TySubMenu from "./subMenu.vue"
import TyMenuItem from "./menuItem.vue"
import TyIcon from "../../icon/index"
import { defineComponent, getCurrentInstance, h } from "vue"
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
          default: () => item.children.map(ite => this.genMenu(h, ite)),
          title: () => {
            return item.label
          },
          icon: () =>
            h(TyIcon, {
              icon: item.icon
            })
        }
      )
    },
    renderItem(h, item) {
      return h(TyMenuItem, {
        mkey: item.key,
        onclick: () => {
          if (item.selClick) {
            return item.selClick(item)
          }
          if (this.$router && item.path) {
            this.$router.push(item.path)
          }
        }
      },
        {
          icon: () =>
            h(TyIcon, {
              icon: item.icon
            }),
          default: () => item.label
        }
      )
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
