import { createContext, useContext, useMemo, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":    return [...state, action.payload];
    case "REMOVE": return state.filter(b => b.id !== action.id);
    default:       return state;
  }
}

function useLocalStorage(key, initial) {
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
  })();
  const [state, dispatchLocal] = useReducer(reducer, saved ?? initial);
  // mirror to localStorage whenever state changes
  useMemo(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, (action) => dispatchLocal(action)];
}

const BookingCtx = createContext(null);

export function BookingProvider({ children }) {
  // start from LS ([]) and expose bookings + dispatch
  const [bookings, dispatch] = useLocalStorage("bookings", []);
  const value = useMemo(() => ({ bookings, dispatch }), [bookings]);
  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingCtx);
  if (!ctx) {
    throw new Error("useBookings must be used within <BookingProvider>");
  }
  return ctx;
}