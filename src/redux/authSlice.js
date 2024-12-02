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
      state.user = action.payload;
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

export const loginUser = (nickname, senha) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      'https://backend-bcc-2-b.vercel.app/usuario/verificarSenha',
      { nickname, senha }
    );

    if (response.data.status) {
      dispatch(loginSuccess({ nickname }));
    } else {
      dispatch(loginFailure('Credenciais inválidas'));
    }
  } catch (error) {
    dispatch(loginFailure('Erro ao se conectar ao servidor.'));
  }
};
