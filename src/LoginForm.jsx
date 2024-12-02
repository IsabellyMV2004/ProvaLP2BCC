import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './redux/authSlice';
import { Button, Form, Alert } from 'react-bootstrap';

export default function LoginForm() {
  const [nickname, setNickname] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(nickname, senha));
    if (isAuthenticated) {
      navigate('/dashboard'); // Redireciona para o painel após login bem-sucedido
    }
  };
  const messages = useSelector((state) => state.chat.messages);

  const handleNavigateToRegister = () => {
    navigate('/cadastro');
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Autenticando...' : 'Entrar'}
        </Button>
      </Form>
      <div className="mt-3">
        <Button variant="link" onClick={handleNavigateToRegister}>
          Cadastrar Usuário
        </Button>
      </div>
    </div>
  );
}
