import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';

const store = configureStore({
    reducer: {
        auth: authReducer, // Certifique-se de adicionar auth
        chat: chatReducer,
    },
});

export default store;
