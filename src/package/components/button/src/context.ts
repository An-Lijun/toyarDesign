import useNmSpace from '../../../hooks/useBem'
import buildProps from '../../../utils/buildProps';
import { TY_STATE, TY_SIZE } from '../../../constant';


export const staticProps ={
    state: {
      type: String,
      values: TY_STATE,
      default: "primary",
    },
    type: {
      type: String,
      default: "normal",
      values: ["normal", "secondary", 'outline', "dashed", 'text', 'link']
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small",
      values: TY_SIZE
    },
    'html-type': {
      type: String,
      default: "button",
      values: ["button", "submit", "reset"]
    },
    shape: {
      type: String,
      default: "square",
      values: ["square", "round", "circle"]
    },
    loading: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'button',
    },
  }
export const buttonProps = buildProps(staticProps)

export interface ButtonEmits {
  click: [event: MouseEvent]
}

export const buttonEmits: ButtonEmits = {
  click: (event: MouseEvent) => true
}

export const nm = useNmSpace('button')
