/*import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, deleteMessage } from './redux/chatSlice';
import { ListGroup, Button, Spinner } from 'react-bootstrap';

const BatePapo = ({ user }) => {
    const dispatch = useDispatch();
    const { messages, loading, error } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    const handleDeleteMessage = (id) => {
        dispatch(deleteMessage(id));
    };

    return (
        <div>
            <h2>Bate-Papo</h2>
            {loading && <Spinner animation="border" />}
            {error && <p className="text-danger">{error}</p>}

            <ListGroup>
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((msg) => {
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
                    })
                ) : (
                    !loading && <p>Nenhuma mensagem disponível.</p>
                )}
            </ListGroup>
        </div>
    );
};

export default BatePapo;*/
/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from './redux/chatSlice';

const BatePapo = () => {
    const dispatch = useDispatch();
    const { messages, loading, error } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    return (
        <div>
            <h1>Bate-Papo</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {messages.length ? (
                messages.map((msg) => (
                    <p key={msg.id}>
                        <strong>{msg.nickname}:</strong> {msg.conteudo}
                    </p>
                ))
            ) : (
                <p>Nenhuma mensagem disponível.</p>
            )}
        </div>
    );
};

export default BatePapo;*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, deleteMessage } from './redux/chatSlice';
import { ListGroup, Button, Spinner } from 'react-bootstrap';

const BatePapo = ({ user }) => {
    const dispatch = useDispatch();
    const { messages, loading, error } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    const handleDeleteMessage = (id) => {
        dispatch(deleteMessage(id));
    };

    return (
        <div>
            <h2>Bate-Papo</h2>
            {loading && <Spinner animation="border" />}
            {error && <p className="text-danger">{error}</p>}

            <ListGroup>
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((msg) => {
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
                    })
                ) : (
                    !loading && <p>Nenhuma mensagem disponível.</p>
                )}
            </ListGroup>
        </div>
    );
};

export default BatePapo;

