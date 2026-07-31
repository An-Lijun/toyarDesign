#!/usr/bin/env node
/**
 * 从 _tokens.scss 生成 defaultTokens.js
 * _tokens.scss 是 Design Token 的单一真源，此脚本确保 JS 侧产物与 SCSS 同步。
 * 运行：pnpm generate:tokens
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TOKENS_SCSS = path.join(__dirname, '../src/package/assets/tokens/_tokens.scss')
const OUTPUT_JS = path.join(__dirname, '../src/package/tokens/defaultTokens.js')

const scss = fs.readFileSync(TOKENS_SCSS, 'utf-8')

/**
 * 提取 $var: (...) !default; 中括号内内容
 * 用平衡括号匹配，正确处理 rgba() 等嵌套括号
 */
function extractMap(varName) {
  const startRe = new RegExp(`\\$${varName}:\\s*\\(`)
  const startMatch = scss.match(startRe)
  if (!startMatch) return ''
  const startIdx = startMatch.index + startMatch[0].length
  let depth = 1
  let endIdx = startIdx
  for (let i = startIdx; i < scss.length; i++) {
    if (scss[i] === '(') depth++
    else if (scss[i] === ')') {
      depth--
      if (depth === 0) { endIdx = i; break }
    }
  }
  return scss.slice(startIdx, endIdx).trim()
}

/** 按顶层逗号分割（跳过括号内逗号） */
function splitTopLevel(content) {
  const items = []
  let depth = 0
  let current = ''
  for (const ch of content) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      if (current.trim()) items.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  if (current.trim()) items.push(current.trim())
  return items
}

/** 去除首尾引号 */
function unquote(s) {
  return s.replace(/^['"]|['"]$/g, '')
}

/** 解析标量值：纯数字转 number，否则字符串 */
function parseScalar(s) {
  s = unquote(s.trim())
  return /^-?\d+$/.test(s) ? Number(s) : s
}

/**
 * 解析 SCSS map 为 JS 对象
 * 支持：
 *   "key": (#hex, #hex)  → { key: ['#hex', '#hex'] }
 *   key: ('val')         → { key: 'val' }
 *   key: (10)            → { key: 10 }
 *   key: 0 0 1px rgba()  → { key: '0 0 1px rgba()' }
 */
function parseMap(content) {
  const result = {}
  for (const item of splitTopLevel(content)) {
    const kvMatch = item.match(/^["']?([\w-]+)["']?\s*:\s*([\s\S]+)$/s)
    if (!kvMatch) continue
    const key = kvMatch[1]
    const val = kvMatch[2].trim()

    if (val.startsWith('(') && val.endsWith(')')) {
      // 元组值
      const inner = val.slice(1, -1).trim()
      if (inner.includes(',')) {
        // 数组（如颜色色阶）
        result[key] = splitTopLevel(inner).map((v) => unquote(v.trim()))
      } else {
        // 单值元组
        result[key] = parseScalar(inner)
      }
    } else {
      // 标量值（如阴影表达式）
      result[key] = val
    }
  }
  return result
}

/** 解析纯值列表为 JS 数组（如字体族、背景色） */
function parseList(content) {
  return splitTopLevel(content).map((v) => unquote(v.trim()))
}

// === 解析各 token（SCSS 变量 → JS 字段） ===
const tokens = {
  lightColors: parseMap(extractMap('toyar-light-colors')),
  darkColors: parseMap(extractMap('toyar-dark-colors')),
  themeColorMap: parseMap(extractMap('toyar-theme-color-map')),
  lightThemeColorMap: parseMap(extractMap('toyar-light-theme-color-map')),
  darkThemeColorMap: parseMap(extractMap('toyar-dark-theme-color-map')),
  textLevels: parseMap(extractMap('toyar-text-levels')),
  borderLevels: parseMap(extractMap('toyar-border-levels')),
  shadowLight: parseMap(extractMap('toyar-shadow-light')),
  shadowDark: parseMap(extractMap('toyar-shadow-dark')),
  opacityLight: parseMap(extractMap('toyar-opacity-light')),
  opacityDark: parseMap(extractMap('toyar-opacity-dark')),
  bgLight: parseList(extractMap('toyar-bg-light')),
  bgDark: parseList(extractMap('toyar-bg-dark')),
  zIndex: parseMap(extractMap('toyar-z-index')),
  sizes: parseMap(extractMap('toyar-sizes')),
  fontFamily: parseList(extractMap('toyar-font-family')),
  fontSize: parseMap(extractMap('toyar-font-size')),
  fontWeight: parseMap(extractMap('fontWeightLs')),
  radius: parseMap(extractMap('borderRadiusList')),
  borderWidth: parseMap(extractMap('toyar-border-width')),
}

// === 生成 JS 文件 ===
let body = JSON.stringify(tokens, null, 2)
// 数字键去引号，贴近手写格式
body = body.replace(/^(\s*)"(\d+)":/gm, '$1$2:')

const output = `/**
 * 此文件由 scripts/generate-tokens.js 从 _tokens.scss 自动生成。
 * 请勿手动编辑——修改 _tokens.scss 后运行 pnpm generate:tokens 重新生成。
 * 生成时间：${new Date().toISOString()}
 */
export const defaultTokens = ${body}

export default defaultTokens
`

fs.writeFileSync(OUTPUT_JS, output, 'utf-8')
console.log('✓ defaultTokens.js 已从 _tokens.scss 生成')
