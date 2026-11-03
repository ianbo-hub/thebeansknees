import { createContext, useContext, useReducer, useEffect } from 'react'
import { storageGet, storageSet } from '../../shared/lib/storage'
import { CART_KEY, CART_DEBOUNCE } from '../../shared/lib/constants'

/* ─── State Shape ─── */
const initialState = {
  items:  [],    // [{ id, name, type, price_kes, qty, whatsapp_label, imageUrl }]
  isOpen: false,
}

/* ─── Reducer ─── */
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload
      if (qty <= 0) return { ...state, items: state.items.filter(i => i.id !== id) }
      return {
        ...state,
        items: state.items.map(i => i.id === id ? { ...i, qty } : i),
      }
    }

    case 'CLEAR':
      return { ...state, items: [] }

    case 'SET_OPEN':
      return { ...state, isOpen: action.payload }

    case 'HYDRATE':
      return { ...state, items: action.payload }

    default:
      return state
  }
}

/* ─── Context ─── */
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Hydrate from localStorage on mount (safe wrapper handles errors)
  useEffect(() => {
    const saved = storageGet(CART_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'HYDRATE', payload: parsed })
        }
      } catch {
        // Corrupted storage — start fresh
      }
    }
  }, [])

  // Debounced persist to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      storageSet(CART_KEY, JSON.stringify(state.items))
    }, CART_DEBOUNCE)
    return () => clearTimeout(timer)
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + (i.price_kes || 0) * i.qty, 0)

  const addItem    = (item)    => dispatch({ type: 'ADD_ITEM',    payload: item })
  const removeItem = (id)      => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQty  = (id, qty) => dispatch({ type: 'UPDATE_QTY',  payload: { id, qty } })
  const clearCart  = ()        => dispatch({ type: 'CLEAR' })
  const openCart   = ()        => dispatch({ type: 'SET_OPEN', payload: true })
  const closeCart  = ()        => dispatch({ type: 'SET_OPEN', payload: false })

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
      dispatch,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside <CartProvider>')
  return ctx
}
