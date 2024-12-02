import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import FormCadUsuario from './FormCadUsuario';
import BatePapo from './BatePapo'; // Importar o componente correto

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/cadastro">Cadastro</Link> |{' '}
        <Link to="/dashboard">Bate-Papo</Link> {/* Atualize o texto do link */}
      </nav>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<FormCadUsuario />} />
        <Route path="/dashboard" element={<BatePapo />} /> {/* Troca para BatePapo */}
      </Routes>
    </Router>
  );
}
