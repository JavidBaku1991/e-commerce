import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import compareReducer from './compareSlice';

// Load state from localStorage
function loadState() {
  try {
    const state = localStorage.getItem('appState');
    if (!state) return undefined;
    return JSON.parse(state);
  } catch {
    return undefined;
  }
}

// Create the store
const store = configureStore({
  reducer: {
    cart: cartReducer,
    compare: compareReducer,
  } as any, // workaround for type error
  preloadedState: loadState(),
});

// Persist to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('appState', JSON.stringify(state));
  } catch {}
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
