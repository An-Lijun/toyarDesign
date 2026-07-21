import type { IOption } from './src/type'
import useAlert, { UseAlertReturn } from './src/use-alert'

export default function AlertJs(
  info: string,
  options: IOption
) {
  const { destroy } = useAlert(info, options)
  return {
    destroy
  }
}

export { useAlert }
export type { UseAlertReturn }