import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginUsuario.js';
import CHAT from './components/batePapo.js';
import CadastroUsuario from './components/cadUsuario.js';
import TelaPrincipal from './TelaPrincipal';  // Importa a Tela Principal

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaPrincipal />} /> {/* Tela Principal */}
        <Route path="/usuarios" element={<CadastroUsuario />} /> {/* Página de Cadastro */}
        <Route path="/chat" element={<CHAT />} /> {/* Página de Chat */}
      </Routes>
    </Router>
  );
};

export default App;
