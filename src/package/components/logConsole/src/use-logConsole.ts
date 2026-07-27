import { ref } from 'vue'
import { downloadByBlob } from 'robinson'
import type { UseLogConsoleReturn, LogItem } from './type'

/**
 * LogConsole 组件的核心逻辑 Hook
 * @returns {UseLogConsoleReturn} 返回日志控制台相关状态和方法
 */
export default function useLogConsole(): UseLogConsoleReturn {
  const contentRef = ref<HTMLElement>()
  let logArr = ref<LogItem[]>([])
  let notRoll = true

  const log = (data: LogItem) => {
    logArr.value.push(data)
    if (contentRef.value && !notRoll) {
      contentRef.value.scrollTop = contentRef.value.scrollHeight
    }
  }

  const handlerMouseEnter = () => {
    notRoll = true
  }

  const handlerMouseLeave = () => {
    notRoll = false
  }

  const handlerClear = () => {
    logArr.value = []
  }

  const handlerExport = () => {
    function downloadText(fileName: string, text: string) {
      downloadByBlob(text, fileName, 'text/plain')
    }
    downloadText('logs11', logArr.value.map(item => {
      return `${itemContent(item)}`
    }).join('\n'))
  }

  const itemContent = (item: LogItem) => {
    let pre = ''
    if (item.custom) {
      pre = '【' + item.custom + '】'
    } else if (['warn', 'error', 'debugger'].includes(item.type?.toLowerCase() || '')) {
      pre = '【' + item.type?.toUpperCase() + '】'
    } else {
      pre = '【INFO】'
    }
    return pre + (item.time ? item.time : '') + ' ' + item.info
  }

  return {
    contentRef,
    logArr,
    log,
    handlerMouseEnter,
    handlerMouseLeave,
    handlerClear,
    handlerExport,
    itemContent
  }
}
