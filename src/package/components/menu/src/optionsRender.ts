import TySubMenu from "./subMenu.vue"
import TyMenuItem from "./menuItem.vue"
import { defineAsyncComponent } from 'vue'

function toPascalCase(str) {
  const words = str.split('-');
  return words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

const getIcon = (icon) => {
  let pascalName = icon
  if (icon.includes('-')) {
    pascalName = toPascalCase(icon.replace('ty-', 'tyi-'))
  }
  
  // 开发环境：Vite alias 解析到本地 node_modules/toyaricon/dist
  // 生产构建：external 保留原始路径，由消费者项目解析
  return defineAsyncComponent(() => 
    import(`toyaricon/${pascalName}.js`).then(m => m.default)
      .catch(() => {
        console.warn(`Icon ${pascalName} not found in toyaricon`)
        return null
      })
  )
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
