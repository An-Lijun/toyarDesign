
      <template>
        <i
          :class="['toyar', nm.b(), icon]"
          :style="{
            fontSize: props.size > 0 ? size + 'px' : 'unset',
            color: color?color :'var(--toyar-gray-10)',
            width: props.size > 0? size + 'px' : 'unset',
          }"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6909 12.9147L17.4587 14.6824C11.4482 20.6929 6.4985 20.6929 2.25586 19.2786L17.8122 3.72229L21.3477 7.25782L15.6909 12.9147ZM12.8625 12.9147L18.5193 7.25782L17.8122 6.55072L6.3145 18.0484C9.04606 18.1558 11.6722 17.142 14.5808 14.633L12.8625 12.9147Z"/></svg>
        </i>
      </template>
      <script  setup>
      import useNmSpace from "../../../hooks/useBem"
      defineOptions({
        name:"TySliceLine"
      })
      const props = defineProps({
          icon: {
            type: String,
            default: ""
          },
          size: {
            type:Number,
            default: 0
          },
          color:{
            type:String
          }
      })
      const nm =useNmSpace('icon')
      </script>
      <style lang="scss" scoped>
      .ty-icon {
        font-size: 1em;
        color: var(--toyar-gray-10);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: bottom;
      }
      </style>