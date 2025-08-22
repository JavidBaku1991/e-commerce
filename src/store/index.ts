import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import compareReducer from './compareSlice';

function loadState() {
  try {
    const state = localStorage.getItem('appState');
    if (!state) return undefined;
    return JSON.parse(state);
  } catch {
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    cart: cartReducer,
    compare: compareReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('appState', JSON.stringify(state));
  } catch {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
