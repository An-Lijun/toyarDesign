
      <template>
        <i
          :class="['toyar', nm.b(), icon]"
          :style="{
            fontSize: props.size > 0 ? size + 'px' : 'unset',
            color: color?color :'var(--toyar-gray-10)',
            width: props.size > 0? size + 'px' : 'unset',
          }"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 2V11H18V21C18 21.5523 17.5523 22 17 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H11ZM13 7C14.1046 7 15 7.89543 15 9H13V7ZM13 4C15.7614 4 18 6.23858 18 9H16C16 7.34315 14.6569 6 13 6V4ZM13 1C17.4183 1 21 4.58172 21 9H19C19 5.68629 16.3137 3 13 3V1Z"/></svg>
        </i>
      </template>
      <script  setup>
      import useNmSpace from "../../../hooks/useBem"
      defineOptions({
        name:"TyHotspotFill"
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