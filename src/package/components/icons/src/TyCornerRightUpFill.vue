
      <template>
        <i
          :class="['toyar', nm.b(), icon]"
          :style="{
            fontSize: props.size > 0 ? size + 'px' : 'unset',
            color: color?color :'var(--toyar-gray-10)',
            width: props.size > 0? size + 'px' : 'unset',
          }"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.9999 19.0001L5.00003 19.0002L5 17.0002L11.9999 17.0001L12 9.41405H6.58581L13 2.99985L19.4142 9.41405L14 9.41406L13.9999 19.0001Z"/></svg>
        </i>
      </template>
      <script  setup>
      import useNmSpace from "../../../hooks/useBem"
      defineOptions({
        name:"TyCornerRightUpFill"
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