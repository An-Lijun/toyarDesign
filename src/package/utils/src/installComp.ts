import type { Component,Plugin} from 'vue'

export default (component:Component|Array<Component>) => {
  if(Array.isArray(component)){
    const base = component[0] as Plugin
    console.log(component,'----');
    
    base.install = app => {
      component.forEach(item=>{
        console.log(item);
        console.log(item.name);

        
        app.component(item.name!, item)
      })
    }
    return base
  }
  (component as Plugin).install = app => {
    app.component(component.name!, component)
  }
  return component
}


