import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [], // Inicialize como um array vazio
        loading: false,
        error: null,
    },
    reducers: {
        fetchMessagesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMessagesSuccess: (state, action) => {
            state.loading = false;
            state.messages = action.payload;
        },
        fetchMessagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchMessagesStart, fetchMessagesSuccess, fetchMessagesFailure } = chatSlice.actions;

// Thunk para buscar mensagens
export const fetchMessages = () => async (dispatch) => {
    dispatch(fetchMessagesStart());
    try {
        const response = await axios.get('https://backend-bcc-2-b.vercel.app/mensagem');
        dispatch(fetchMessagesSuccess(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
        dispatch(fetchMessagesFailure('Erro ao carregar mensagens.'));
    }
};

// Thunk para deletar mensagem
export const deleteMessage = (id) => async (dispatch) => {
    try {
        await axios.delete(`https://backend-bcc-2-b.vercel.app/mensagem/${id}`);
        dispatch(fetchMessages()); // Atualize as mensagens após deletar
    } catch (error) {
        console.error('Erro ao deletar mensagem:', error);
    }
};

export default chatSlice.reducer;
