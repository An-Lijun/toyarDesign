

let strokeWidth ='0.5'
let strokeLinecap ='round' // butt round square
let strokeLinejoin ='round' // arcs bevel miter miter-clip round


export const parseSvg = (svg:SVGAElement) => {
  svg.setAttribute('stroke','currentColor')
  svg.setAttribute('stroke-width',strokeWidth)
  svg.setAttribute('stroke-linecap',strokeLinecap)
  svg.setAttribute('stroke-linejoin',strokeLinejoin)
};

export const strToSvg =(svgStr:string)=>{
  let parser = new DOMParser();
  return parser.parseFromString(svgStr.replace('<path fill="none" d="M0 0h24v24H0z"/>',''), "image/svg+xml").documentElement;
}