import TySkeleton from './src/skeleton.vue'
import TySkeletonItem from './src/skeleton-item.vue'


import { installComp } from '../../utils'
export default installComp([TySkeleton,TySkeletonItem])

export {
  TySkeleton,
  TySkeletonItem
}
