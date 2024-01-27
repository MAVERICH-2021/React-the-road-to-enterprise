//对use-context-selector封装
import {
  createContext,
  useContext,
  useContextSelector,
} from 'use-context-selector'

//CtxState是context的state类型
export const contextFactory = <CtxState>() => {
  //这里用到的时use-context-selector中的createContext
  const context = createContext<CtxState | undefined>(undefined)

  const useCtx = () => {
    //也是代替了官方的useContext方案
    const ctx = useContext(context)
    if (ctx === undefined)
      throw new Error(
        'useContextSelector must be used within a context provider'
      )
    return ctx
  }
  //Selected是你要选择的state类型
  type ContextSelector<Selected, CtxState> = (ctxState: CtxState) => Selected

  const useCtxSelector = <Selected>(
    contextSelector: ContextSelector<Selected, CtxState>
  ) => {
    const selector = (state: CtxState | undefined) => {
      if (state === undefined)
        throw new Error('useContext must be used within a context provider')
      return contextSelector(state)
    }
    return useContextSelector<
      CtxState | undefined,
      ReturnType<typeof selector>
    >(context, selector)
  }
  return [context, useCtx, useCtxSelector] as const
}