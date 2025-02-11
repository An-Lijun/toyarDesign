
      <template>
        <i
          :class="['toyar', nm.b(), icon]"
          :style="{
            fontSize: props.size > 0 ? size + 'px' : 'unset',
            color: color?color :'var(--toyar-gray-10)',
            width: props.size > 0? size + 'px' : 'unset',
          }"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15 3H21V21H3V15H7V11H11V7H15V3ZM17 5V9H13V13H9V17H5V19H19V5H17Z"/></svg>
        </i>
      </template>
      <script  setup>
      import useNmSpace from "../../../hooks/useBem"
      defineOptions({
        name:"TyStairsLine"
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