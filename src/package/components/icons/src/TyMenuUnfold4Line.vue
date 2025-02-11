
      <template>
        <i
          :class="['toyar', nm.b(), icon]"
          :style="{
            fontSize: props.size > 0 ? size + 'px' : 'unset',
            color: color?color :'var(--toyar-gray-10)',
            width: props.size > 0? size + 'px' : 'unset',
          }"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17 4H3V6H17V4ZM13 11H3V13H13V11ZM17 18H3V20H17V18ZM22.0104 8.81412L20.5962 7.3999L16 11.9961L20.5962 16.5923L22.0104 15.1781L18.8284 11.9961L22.0104 8.81412Z"/></svg>
        </i>
      </template>
      <script  setup>
      import useNmSpace from "../../../hooks/useBem"
      defineOptions({
        name:"TyMenuUnfold4Line"
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