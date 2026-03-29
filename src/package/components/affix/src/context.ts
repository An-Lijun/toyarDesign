import buildProps  from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'
export const staticProps ={
  tag:{
    type:String,
    default:'div'
  },
  offsetTop: {
    type: Number,
    default: 0
  },
  offsetBottom: {
    type: Number
  },
  target:{
    type:Element,
  }
}
export const affixProps = buildProps(staticProps)
// "circle" //square

export const nm = useNmSpace('affix')
export interface AffixEmits {
  fixedChange: [event: MouseEvent]
}

export const AffixEmits: AffixEmits = {
  fixedChange: (event: MouseEvent) => true
}
