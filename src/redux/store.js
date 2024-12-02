import { configureStore } from '@reduxjs/toolkit';
import userReducer from './controleUsuario.js'; 
import messageReducer from './MensagensRedux.js'; 

export const store = configureStore({
  reducer: {
    usuarios: userReducer,
    messages: messageReducer,
  },
});
