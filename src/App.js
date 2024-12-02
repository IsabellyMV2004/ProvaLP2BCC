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
        <Route path="/telaPrincipal" element={<TelaPrincipal />} /> 
        <Route path="/usuarios" element={<CadastroUsuario />} />
        <Route path="/chat" element={<CHAT />} /> 
      </Routes>
    </Router>
  );
};

export default App;
