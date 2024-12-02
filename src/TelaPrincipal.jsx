import React from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TelaPrincipal = () => {
  const navigate = useNavigate();

  const handleCadastro = () => {
    navigate('/usuarios');  
  };

  const handleLogin = () => {
    navigate('/'); 
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Alert variant="info" className="text-center">
            <h2>Bem-vindo ao Sistema</h2>
            <p>Escolha uma opção para começar:</p>
          </Alert>
          
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleCadastro}>
              Cadastre-se
            </Button>
            <Button variant="secondary" onClick={handleLogin}>
              Fazer Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TelaPrincipal;
