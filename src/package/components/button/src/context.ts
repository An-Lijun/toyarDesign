import useNmSpace from '../../../hooks/useBem'
import { buildProps } from '@/package/utils/buildProps';
import { TY_STATE, TY_SIZE } from '../../../constant';

export const buttonProps = buildProps(
  {
    state: {
      type: String,
      values: TY_STATE,
      default: "primary",
    },
    type: {
      type: String,
      default: "normal",
      values: ["normal", "secondary", "dashed", 'text', 'link']
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
      valuse: ["square", "round", "circle"]
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
)

export const nm = useNmSpace('button')
