import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { Button, Form, Alert } from 'react-bootstrap';

export default function LoginForm() {
  const [nickname, setNickname] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(nickname, senha));
  };

  return (
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
  );
}
