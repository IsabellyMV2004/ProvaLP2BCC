import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./usuarioReducer";
import mensagensReducer from "./mensagensReducer";
import fornecedorReducer from "./fornecedorReducer";
import clienteReducer from "./clienteReducer";
import privilegioReducer from "./privilegioReducer";
import usuarioReducer from "./usuarioReducer";

const store = configureStore({
    reducer:{
        'usuario':usuarioReducer,
        'mensagens':mensagensReducer,
        'fornecedor':fornecedorReducer,
        'cliente':clienteReducer,
        'privilegio':privilegioReducer,
        'usuario':usuarioReducer
    }
});

export default store;