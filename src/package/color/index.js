
import { colorPalette, colorPaletteDark } from './computed/index.js'

export default function generate(color, options = {}) {
  const { dark, list, index = 6, format = 'hex' } = options;

  if(list){
    let colors =[]
    for (let index = 1; index < 11; index++) {
      if(index ===6){
        colors.push(color)
      }
       colors.push(dark ? colorPaletteDark(color, index, format) : colorPalette(color, index, format))
    }

    return colors
  }

  return dark ? colorPaletteDark(color, index, format) : colorPalette(color, index, format);
}
