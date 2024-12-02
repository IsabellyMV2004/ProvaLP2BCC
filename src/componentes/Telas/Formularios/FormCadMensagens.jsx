import { Button, Spinner, Col, Form, InputGroup,
    Row
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { alterarMensagens, gravarMensagens } from '../../../servicos/servicoMensagens';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadMensagens(props) {
const [mensagens, setMensagens] = useState(props.mensagensSelecionado);
const [formValidado, setFormValidado] = useState(false);

   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       // Formatar a data de validade para o formato "yyyy-mm-dd"
       const dataValidadeFormatada = new Date(mensagens.dataValidade).toLocaleDateString('pt-BR');
       mensagens.dataValidade = dataValidadeFormatada;

       if (!props.modoEdicao) {
           // Cadastrar o mensagens
           gravarMensagens(mensagens)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       } else {
           // Editar o mensagens
           alterarMensagens(mensagens)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setListaDeMensagens(
                           props.listaDeMensagens.map((item) => {
                               if (item.codigo !== mensagens.codigo) return item;
                               else return mensagens;
                           })
                       );

                       // Após a alteração, resetar o estado para o modo de adição
                       props.setModoEdicao(false); // Mudar para o modo de adicionar
                       
                       // Resetar o mensagens selecionado
                       props.setMensagensSelecionado({
                           codigo: 0,
                           descricao: ""
                       });

                       // Mostrar a tabela novamente
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       }
   } else {
       setFormValidado(true);
   }
   evento.preventDefault();
   evento.stopPropagation();
}

function manipularMudanca(evento) {
   const elemento = evento.target.name;
   const valor = evento.target.value;
   setMensagens({ ...mensagens, [elemento]: valor });
}

return (
   
   <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
       <Row className="mb-4">
           <Form.Group as={Col} md="4">
               <Form.Label>Código</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="codigo"
                   name="codigo"
                   value={mensagens.codigo}
                   disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do mensagens!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Descrição</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="descricao"
                   name="descricao"
                   value={mensagens.descricao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do mensagens!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className='mt-2 mb-2'>
           <Col md={1}>
               <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
           </Col>
           <Col md={{ offset: 1 }}>
               <Button onClick={() => {
                   props.setExibirTabela(true);
               }}>Voltar</Button>
           </Col>
       </Row>
       <Toaster position="top-right"/>
   </Form>
);
}