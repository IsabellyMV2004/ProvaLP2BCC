/*import React, { useState } from 'react';
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
}*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './redux/authSlice'; // Importando a ação de registro
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function FormCadUsuario() {
  const [nickname, setNickname] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [urlAvatar, setUrlAvatar] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Navegação
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Obter a data e hora atual
    const now = new Date();

    // Subtrair 3 horas da data atual (ajustando o fuso horário)
    now.setHours(now.getHours() - 3);

    // Formatar data para o formato que o backend espera (caso necessário)
    const dataIngresso = now.toISOString();  // Exemplo de formato ISO (yyyy-MM-ddTHH:mm:ss.sssZ)

    // Adicionar o campo mensagens como lista vazia
    const newUser = {
      nickname,
      senha,
      urlAvatar,
      dataIngresso,
      mensagens: []  // Lista vazia para as mensagens
    };

    // Enviar dados do usuário com a data de ingresso e mensagens vazias
    dispatch(registerUser(newUser))
      .then(() => {
        navigate('/login');  // Redireciona para a página de login após o cadastro bem-sucedido
      })
      .catch((error) => {
        console.error('Erro ao se conectar ao servidor:', error);
      });
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

