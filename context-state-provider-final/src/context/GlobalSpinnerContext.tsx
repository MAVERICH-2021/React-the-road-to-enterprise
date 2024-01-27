import GlobalSpinner from '@/components/GlobalSpinner'
import { contextFactory } from './helpers/contextFactory'
import { useToggleState } from '@/hooks/useToggleState'
type GlobalSpinnerValues = {
  isSpinnerVisible: boolean
  showSpinner: () => void
  hideSpinner: () => void
  toggleSpinner: () => void
}

//這裏進行了重命名
const [
  GlobalSpinnerContext,
  useGlobalSpinnerContext,
  useGlobalSpinnerContextSelector,
] = contextFactory<GlobalSpinnerValues>()

//并不直接暴露GlobalSpinnerContext
export { useGlobalSpinnerContext, useGlobalSpinnerContextSelector }

type GlobalSpinnerContextProviderProps = {
  children: React.ReactNode
}

const GlobalSpinnerContextProvider = ( //ctx provider组件 对context进行了封装
  props: GlobalSpinnerContextProviderProps
) => {
  const { children } = props
  const {
    state: isSpinnerVisible,
    open: showSpinner,
    close: hideSpinner,
    toggle: toggleSpinner,
  } = useToggleState(false)

  return (
    <GlobalSpinnerContext.Provider
      value={{
        isSpinnerVisible,
        showSpinner,
        hideSpinner,
        toggleSpinner,
      }}
    >
      {children}
      {/* 把spinner直接放在context组件当中. 组件本身就是一个范围,一个各个组件的容器 */}
      <GlobalSpinner />
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider
