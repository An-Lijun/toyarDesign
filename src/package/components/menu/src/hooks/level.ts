import { isRef, computed, ref,provide,inject } from "vue";
import { MenuLevelProvide } from '../symbol'
export function provideLevel(level) {
  const compLevel = computed(() => (isRef(level) ? level.value : level));
  provide(
    MenuLevelProvide,
    ref(compLevel)
  );
}
export  function injectLevel(provideNext) {
  const levelContext = inject(MenuLevelProvide);
  const compLevel = computed(() => levelContext?.value || 0);
  if (provideNext) {
    const nextLevel = computed(() => compLevel.value + 1);
    provideLevel(nextLevel);
  }
  return compLevel

}
