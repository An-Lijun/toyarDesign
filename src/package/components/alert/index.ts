import type { IOption } from './src/type'
import useAlert, { UseAlertReturn } from './src/use-alert'

export default function AlertJs(content: string, options: IOption) {
  const { destroy } = useAlert(content, options)
  return {
    destroy
  }
}

export { useAlert }
export type { UseAlertReturn }
