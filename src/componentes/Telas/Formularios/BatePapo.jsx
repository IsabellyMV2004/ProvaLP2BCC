import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../redux/chatSlice'; // Import correto da action
import { Button, ListGroup, Spinner } from 'react-bootstrap';

export default function BatePapo() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleDeleteMessage = (id) => {
    // Lógica de exclusão (opcional: implementar integração com backend)
    console.log(`Excluir mensagem com ID: ${id}`);
  };

  return (
    <div>
      <h2>Bate-Papo</h2>
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" />
        </div>
      )}
      {error && <p className="text-danger">Erro: {error}</p>}
      <ListGroup>
        {messages.map((msg) => {
          const isOwnMessage = msg.nickname === user.nickname;
          const isWithinTimeLimit =
            Date.now() - new Date(msg.createdAt).getTime() <= 5 * 60 * 1000;

          return (
            <ListGroup.Item key={msg.id}>
              <div>
                <strong>{msg.nickname}: </strong>
                <span>{msg.conteudo}</span>
                {msg.lida && <span className="text-success"> (Lida)</span>}
              </div>
              {isOwnMessage && (
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleDeleteMessage(msg.id)}
                  disabled={!isWithinTimeLimit}
                >
                  Excluir
                </Button>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {messages.length === 0 && !loading && <p>Nenhuma mensagem disponível.</p>}
    </div>
  );
}
