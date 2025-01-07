export const on = (element, event, handler) => {
  element.addEventListener(event, handler)
}
export const off = (element, event, handler) => {
  element.removeEventListener(event, handler)
}