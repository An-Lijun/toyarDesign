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
  (event: 'fixed-change', value: boolean): void
}

export const affixEmits: AffixEmits = {
  'fixed-change': (value: boolean) => true
}
