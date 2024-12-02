import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload; // Usuário retornado pela API
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;

// Thunk para login
export const loginUser = (nickname, senha) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      'https://backend-bcc-2-b.vercel.app/usuario/verificarSenha',
      { nickname, senha }
    );

    if (response.data.status) {
      dispatch(loginSuccess(response.data.usuario)); // Atualiza com o usuário retornado
    } else {
      dispatch(loginFailure(response.data.mensagem || 'Credenciais inválidas'));
    }
  } catch (error) {
    dispatch(loginFailure('Erro ao se conectar ao servidor.'));
  }
};
