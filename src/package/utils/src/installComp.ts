import type { Component,Plugin} from 'vue'

export default (component:Component) => {
  (component as Plugin).install = app => {
    app.component(component.name!, component)
  }
  return component
}