import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarMensagens, excluirMensagens } from "../servicos/servicoMensagens";

import ESTADO from "./estados";

export const buscarMensagens = createAsyncThunk('buscarMensagens', async ()=>{
    //lista de mensagens
    const resultado = await consultarMensagens();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"mensagens recuperados com sucesso",
                "listaDeMensagens":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os mensagens do backend.",
                "listaDeMensagens":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeMensagens":[]
        }
    }
});

export const apagarMensagens = createAsyncThunk('apagarMensagens', async (mensagens)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de mensagens
    console.log(mensagens);
    const resultado = await excluirMensagens(mensagens);
    //se for um array/lista a consulta funcionou
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

const mensagensReducer = createSlice({
    name:'mensagens',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeMensagens:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarMensagens.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando mensagens)"
        })
        .addCase(buscarMensagens.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeMensagens=action.payload.listaDeMensagens;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeMensagens=action.payload.listaDeMensagens;
          } 
        })
        .addCase(buscarMensagens.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeMensagens=action.payload.listaDeMensagens;
        })
        .addCase(apagarMensagens.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarMensagens.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de mensagens?
        })
        .addCase(apagarMensagens.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
    }
});

export default mensagensReducer.reducer;