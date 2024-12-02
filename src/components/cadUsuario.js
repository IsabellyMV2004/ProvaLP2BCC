import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "react-bootstrap";
import { buscarUsuarios, adicionarUsuario, atualizarUsuario, excluirUsuario } from '../redux/controleUsuario';

const CadastroUsuario = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios.list);
  const [nickname, setNickname] = useState('');
  const [urlAvatar, setUrlAvatar] = useState('');
  const [senha, setSenha] = useState('');
  const [editarUsuario, setEditarUsuario] = useState(null);

  useEffect(() => {
    dispatch(buscarUsuarios());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editarUsuario) {
      dispatch(atualizarUsuario({ id: editarUsuario.id, nickname, urlAvatar, senha }));
    } else {
      dispatch(adicionarUsuario({ nickname, urlAvatar, senha }));
    }
    resetForm();
  };

  const handleEdit = (user) => {
    setEditarUsuario(user);
    setNickname(user.nickname);
    setUrlAvatar(user.urlAvatar);
  };

  const handleDelete = (id) => {
    const confirmarSenha = prompt('Digite a senha para excluir:');
    if (confirmarSenha) {
      dispatch(excluirUsuario({ id, senha: confirmarSenha }));
    }
  };

  const resetForm = () => {
    setNickname('');
    setUrlAvatar('');
    setSenha('');
    setEditarUsuario(null);
  };

  return (
    <div>
      <h1>Cadastrar Usuario</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nome"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="avatar"
          value={urlAvatar}
          onChange={(e) => setUrlAvatar(e.target.value)}
        />
        <input
          type="password"
          placeholder="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">{editarUsuario ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={resetForm}>
          Cancelar
        </button>
      </form>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            <img src={user.urlAvatar} alt={user.nickname} style={{ width: 50 }} />
            <td>{user.nickname}</td>
            <td>
              <Button onClick={()=>{handleEdit(user)}
              }variant="warning">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
              </Button> <Button onClick={ ()=> {
                  handleDelete(user.id)}
              } variant="danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>           
              </Button>
          </td>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CadastroUsuario;
