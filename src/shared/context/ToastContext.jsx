import { createContext, useContext, useReducer, useCallback } from 'react'

const ToastContext = createContext(null)

let nextId = 0

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':    return [...state, action.payload]
    case 'REMOVE': return state.filter(t => t.id !== action.payload)
    default:       return state
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, [])

  const toast = useCallback(({ message, type = 'success', duration = 3500 }) => {
    const id = ++nextId
    dispatch({ type: 'ADD', payload: { id, message, type } })
    setTimeout(() => dispatch({ type: 'REMOVE', payload: id }), duration)
    return id
  }, [])

  const dismiss = useCallback((id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside <ToastProvider>')
  return ctx
}
