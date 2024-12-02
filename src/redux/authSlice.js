/*import { createSlice } from '@reduxjs/toolkit';
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
};*/

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Slice para autenticação e registro de usuário
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    // Ação para iniciar o processo de login ou registro
    loginStart(state) {
      state.loading = true;
    },
    // Ação para sucesso no login ou registro
    loginSuccess(state, action) {
      state.user = action.payload; // Usuário retornado pela API
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // Ação para falha no login ou registro
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Ação para logout
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Ação para iniciar o processo de registro
    registerStart(state) {
      state.loading = true;
    },
    // Ação para sucesso no registro
    registerSuccess(state, action) {
      state.user = action.payload; // Usuário retornado após o cadastro
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // Ação para falha no registro
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } = authSlice.actions;

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
    console.error('Erro ao se conectar ao servidor:', error);
    dispatch(loginFailure('Erro ao se conectar ao servidor.'));
  }
};

// Thunk para registro de usuário
export const registerUser = (user) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axios.post(
      'https://backend-bcc-2-b.vercel.app/usuario/gravar', // Substitua pela URL correta de cadastro
      user // Passando o objeto completo com dados do usuário
    );

    if (response.data.status) {
      dispatch(registerSuccess(response.data.usuario)); // Usuário retornado após cadastro
    } else {
      dispatch(registerFailure(response.data.mensagem || 'Erro ao cadastrar usuário'));
    }
  } catch (error) {
    console.error('Erro ao se conectar ao servidor:', error);
    dispatch(registerFailure('Erro ao se conectar ao servidor.'));
  }
};

