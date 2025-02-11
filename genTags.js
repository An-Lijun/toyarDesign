import tags from './tags.js'
import fs from 'fs'

const genTags = {}

Object.keys(tags).forEach(key => {
  genTags[key] = []

  let obj = tags[key]

  Object.keys(obj).forEach(key2 => {
   if(key!=='Editor'){
    genTags[key].push({
      icon: 'ty-' + key2 +'-line',
      belong: key,
      name: key2,
      alias: [
        ...key2.split('-'),
        ...obj[key2].split(',')
      ]
    })
    genTags[key].push({
      icon: 'ty-' + key2 +'-fill',
      belong: key,
      name: key2,
      alias: [
        ...key2.split('-'),
        ...obj[key2].split(',')
      ]
    })
   }else{
    genTags[key].push({
      icon: 'ty-' + key2,
      belong: key,
      name: key2,
      alias: [
        ...key2.split('-'),
        ...obj[key2].split(',')
      ]
    })
   }
  })

})

Object.keys(genTags).forEach(key => {
  fs.writeFileSync(`./docsBase/.vitepress/icons/${key}.js`, `export const  ${key}=`+JSON.stringify(genTags[key], null, 2))
})
let str=''
Object.keys(genTags).forEach(key => {
    str+=`\n export const  ${key}=`+JSON.stringify(genTags[key], null, 2)
})
str +='\n const all = ['
str += Object.keys(genTags).map(item =>{
  return `...${item}`
})
str += '] \n export default all'
fs.writeFileSync(`./src/package/iconList.js`, str)
