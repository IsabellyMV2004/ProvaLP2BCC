import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://backend-bcc-2-b.vercel.app/usuario';
export const buscarUsuarios = createAsyncThunk('usuarios/buscarUsuarios', async () => 
{
  const response = await axios.get(BASE_URL);
  return response.data.listaUsuarios;  
});
export const adicionarUsuario = createAsyncThunk('usuarios/adicionarUsuario', async (usuario) => 
{
  const response = await axios.post(BASE_URL, usuario);
  return response.data; 
});
export const atualizarUsuario = createAsyncThunk('usuarios/atualizarUsuario', async (usuario) => 
{
  const response = await axios.put(BASE_URL, usuario);
  return response.data;
});
export const excluirUsuario = createAsyncThunk('usuarios/excluirUsuario', async (usuario) =>
{
  const response = await axios.delete(BASE_URL, { data: usuario });
  return response.data;
});
const controleUsuario = createSlice({
  name: 'usuarios',
  initialState: { list: [], activeUser: null },
  reducers: {
    setUsuarioAtivo: (state, action) => {state.activeUser = action.payload;},
  },
  extraReducers: (builder) => 
  {
    builder
      .addCase(buscarUsuarios.fulfilled, (state, action) => {state.list = action.payload;  })
      .addCase(adicionarUsuario.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(atualizarUsuario.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload; 
        }
      })
      .addCase(excluirUsuario.fulfilled, (state, action) => {state.list = state.list.filter(user => user.id !== action.payload.id);});
  },
});

export const { setUsuarioAtivo } = controleUsuario.actions;
export default controleUsuario.reducer;
