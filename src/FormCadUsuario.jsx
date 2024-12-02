import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './redux/authSlice'; // Nova action para registro
import { Button, Form, Alert } from 'react-bootstrap';

export default function FormCadUsuario() {
  const [nickname, setNickname] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [urlAvatar, setUrlAvatar] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    const newUser = { nickname, senha, urlAvatar };
    dispatch(loginUser(newUser));
  };

  return (
    <Form onSubmit={handleRegister}>
      <h2>Cadastro de Usuário</h2>
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
      <Form.Group>
        <Form.Label>Confirmar Senha</Form.Label>
        <Form.Control
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL do Avatar</Form.Label>
        <Form.Control
          type="text"
          value={urlAvatar}
          onChange={(e) => setUrlAvatar(e.target.value)}
        />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </Form>
  );
}
