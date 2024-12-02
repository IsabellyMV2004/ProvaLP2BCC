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
    fetchMessagesStart(state) {
      state.loading = true;
    },
    fetchMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.loading = false;
    },
    fetchMessagesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    updateMessageStatus(state, action) {
      const message = state.messages.find((msg) => msg.id === action.payload);
      if (message) {
        message.lida = true;
      }
    },
  },
});

export const {
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  addMessage,
  updateMessageStatus,
} = chatSlice.actions;

export default chatSlice.reducer;

export const fetchMessages = () => async (dispatch) => {
  dispatch(fetchMessagesStart());
  try {
    const response = await axios.get('https://backend-bcc-2-b.vercel.app/mensagem');
    dispatch(fetchMessagesSuccess(response.data));
  } catch (error) {
    dispatch(fetchMessagesFailure('Erro ao carregar mensagens.'));
  }
};

export const sendMessage = (nickname, conteudo) => async (dispatch) => {
  try {
    const response = await axios.post('https://backend-bcc-2-b.vercel.app/mensagem', {
      nickname,
      conteudo,
    });
    dispatch(addMessage(response.data));
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
};
