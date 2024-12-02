/*import { createSlice } from '@reduxjs/toolkit';
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

export default chatSlice.reducer;*/
/*
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
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

// Thunk para enviar mensagens
export const sendMessage = (message) => async (dispatch) => {
    try {
        const response = await axios.post('https://backend-bcc-2-b.vercel.app/mensagem', message);
        if (response.status === 201) {
            dispatch(fetchMessages()); // Atualiza mensagens após envio
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};

// Thunk para deletar mensagens
export const deleteMessage = (id) => async (dispatch) => {
    try {
        await axios.delete(`https://backend-bcc-2-b.vercel.app/mensagem/${id}`);
        dispatch(fetchMessages()); // Atualiza mensagens após deletar
    } catch (error) {
        console.error('Erro ao deletar mensagem:', error);
    }
};

export default chatSlice.reducer;
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks para lidar com chamadas assíncronas
export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
    const response = await fetch('/api/messages');
    return await response.json();
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message) => {
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
    });
    return await response.json();
});

export const deleteMessage = createAsyncThunk('chat/deleteMessage', async (id) => {
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    return id;
});

// Slice do chat
const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.messages = state.messages.filter((msg) => msg.id !== action.payload);
            });
    },
});

export default chatSlice.reducer;

