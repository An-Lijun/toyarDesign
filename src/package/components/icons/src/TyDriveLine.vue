
      <template>
        <i
          :class="['toyar', nm.b(), icon]"
          :style="{
            fontSize: props.size > 0 ? size + 'px' : 'unset',
            color: color?color :'var(--toyar-gray-10)',
            width: props.size > 0? size + 'px' : 'unset',
          }"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.09742 6.15015L4.31009 14.4431L6.06471 17.4746L10.8502 9.18597L9.09742 6.15015ZM7.79701 18.4742H17.3651L19.1162 15.44H9.54877L7.79701 18.4742ZM19.1109 13.44L14.3252 5.15002H10.8294L15.6156 13.44H19.1109ZM8.52 3.15002H15.48L22 14.4444L18.52 20.4742H5.49L2 14.4444L8.52 3.15002ZM12.0049 11.186L10.7035 13.44H13.3062L12.0049 11.186Z"/></svg>
        </i>
      </template>
      <script  setup>
      import useNmSpace from "../../../hooks/useBem"
      defineOptions({
        name:"TyDriveLine"
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