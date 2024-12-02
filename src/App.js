import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import FormCadUsuario from './componentes/Telas/Formularios/FormCadUsuario';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Cadastro</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<FormCadUsuario />} />
      </Routes>
    </Router>
  );
}
