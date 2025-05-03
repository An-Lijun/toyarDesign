import TySubMenu from "./subMenu.vue"
import TyMenuItem from "./menuItem.vue"
import {defineAsyncComponent} from 'vue'
function toPascalCase(str) {
  const words = str.split('-');
  return words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}
const getIcon = (icon) => {
  return defineAsyncComponent(() => import('toyaricon').then((module) => {
    if(icon.includes('-')){
      let str = icon.replace('ty-','tyi-')
      str = toPascalCase(str)
      return module[str]
      }
    return module[icon]
  }));
}

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
          _mItem:item,
        },
        {
          default: () => item.children.map(ite => this.genMenu(h, ite)),
          title: () => {
            return item.label
          },
          icon: () =>
            h(getIcon(item.icon), {
            })
        }
      )
    },
    renderItem(h, item) {
      let option = {
        default: () => item.label
      }
      if (item.icon) {
        option.icon = () =>
          h(getIcon(item.icon), {
            icon: item.icon
          })
      }

      return h(TyMenuItem, {
        mkey: item.key,
        _mItem:item,
        onclick: () => {
          if (item.selClick) {
            return item.selClick(item)
          }
          if (this.$router && item.path) {
            this.$router.push(item.path)
          }
        }
      },
        option
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
