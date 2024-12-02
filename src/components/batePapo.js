import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buscarMensagens, enviarMensagem, atualizarStatusMensagem, excluirMensagem } from '../redux/MensagensRedux';

const CHAT = () => {
  const dispatch = useDispatch();
  const mensagens = useSelector((state) => state.messages);
  const usuarioAtivo = useSelector((state) => state.usuarios.activeUser);

  const [novaMensagem, setNovaMensagem] = useState('');

  useEffect(() => {
    dispatch(buscarMensagens());
  }, [dispatch]);

  const Horas = (dataHora) => {
    const data = new Date(dataHora);
    data.setHours(data.getHours() + 3);
    return data.toLocaleString('pt-BR', {
      timeZoneName: 'short',
    });
  };

  const podeExcluir = (dataHora) => {
    const dataMensagem = new Date(dataHora);
    const dataAtual = new Date();
    const diferencaEmMinutos = (dataAtual - dataMensagem) / (1000 * 60); 
    return diferencaEmMinutos <= 5; 
  };

  const enviarMensagemFormulario = (e) => {
    e.preventDefault();
    if (novaMensagem.trim()) {
      dispatch(enviarMensagem({ mensagem: novaMensagem, usuario: { id: usuarioAtivo.id } }));
      setNovaMensagem('');
    } else {
      alert('A mensagem não pode estar vazia.');
    }
  };

  const marcarComoLida = (idMensagem) => {
    dispatch(atualizarStatusMensagem(idMensagem));
  };

  const excluirMensagemFormulario = (idMensagem) => {
    const confirmarExclusao = window.confirm('Você tem certeza que deseja excluir esta mensagem?');
    if (confirmarExclusao) {
      dispatch(excluirMensagem(idMensagem));
    }
  };

  return (
    <div>
      <h2>Bate-papo</h2>
      {mensagens.length === 0 ? (
        <p>Sem mensagens ainda.</p>
      ) : (
        mensagens.map((msg) => (
          <div key={msg.id}>
            <p>
              <strong>{msg.usuario.nickname}:</strong> {msg.mensagem}
            </p>
            <small>{Horas(msg.dataHora)}</small>
            {usuarioAtivo.id === msg.usuario.id && podeExcluir(msg.dataHora) && (
              <button onClick={() => excluirMensagemFormulario(msg.id)}>Excluir</button>
            )}
            {!msg.lida && (
              <button onClick={() => marcarComoLida(msg.id)}>Marcar como lida</button>
            )}
          </div>
        ))
      )}

      {usuarioAtivo ? (
        <form onSubmit={enviarMensagemFormulario}>
          <input
            type="text"
            placeholder="Digite sua mensagem"
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <p>Faça login para postar mensagens.</p>
      )}
    </div>
  );
};

export default CHAT;
