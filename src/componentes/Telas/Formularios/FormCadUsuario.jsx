import { Button, Spinner, Col, Form, InputGroup,
    Row
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarMensagens } from '../../../servicos/servicoMensagens';
import { alterarUsuario, gravarUsuario } from '../../../servicos/servicoUsuario';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadUsuarios(props) {
const [usuario, setUsuario] = useState(props.usuarioSelecionado);
const [formValidado, setFormValidado] = useState(false);
const [mensagens, setMensagens] = useState([]);
const [temMensagens, setTemMensagens] = useState(false);

useEffect(()=>{
   consultarMensagens().then((resultado)=>{
       if (Array.isArray(resultado)){
           setMensagens(resultado);
           setTemMensagens(true);
       }
       else{
           toast.error("Não foi possível carregar as mensagens");
       }
   }).catch((erro)=>{
       setTemMensagens(false);
       toast.error("Não foi possível carregar as mensagens");
   });
   
},[]); //didMount

function selecionarMensagens(evento){
   setUsuario({...usuario, 
                  mensagens:{
                   codigo: evento.currentTarget.value

                  }});
}

   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       // Formatar a data de validade para o formato "yyyy-mm-dd"
       const dataValidadeFormatada = new Date(usuario.dataValidade).toLocaleDateString('pt-BR');
       usuario.dataValidade = dataValidadeFormatada;

       if (!props.modoEdicao) {
           // Cadastrar o usuario
           gravarUsuario(usuario)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       } else {
           // Editar o usuario
           alterarUsuario(usuario)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setListaDeUsuarios(
                           props.listaDeUsuarios.map((item) => {
                               if (item.codigo !== usuario.codigo) return item;
                               else return usuario;
                           })
                       );

                       // Após a alteração, resetar o estado para o modo de adição
                       props.setModoEdicao(false); // Mudar para o modo de adicionar
                       
                       // Resetar o usuario selecionado
                       props.setUsuarioSelecionado({
                           codigo: 0,
                           descricao: "",
                           precoCusto: 0,
                           precoVenda: 0,
                           qtdEstoque: 0,
                           urlImagem: "",
                           dataValidade: "",
                           mensagens: {}
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
   setUsuario({ ...usuario, [elemento]: valor });
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
                   value={usuario.codigo}
                   disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do usuario!</Form.Control.Feedback>
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
                   value={usuario.descricao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do usuario!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="4">
               <Form.Label>Preço de Custo:</Form.Label>
               <InputGroup hasValidation>
                   <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                   <Form.Control
                       type="text"
                       id="precoCusto"
                       name="precoCusto"
                       aria-describedby="precoCusto"
                       value={usuario.precoCusto}
                       onChange={manipularMudanca}
                       required
                   />
                   <Form.Control.Feedback type="invalid">
                       Por favor, informe o preço de custo!
                   </Form.Control.Feedback>
               </InputGroup>
           </Form.Group>
           <Form.Group as={Col} md="4">
               <Form.Label>Preço de Venda:</Form.Label>
               <InputGroup hasValidation>
                   <InputGroup.Text id="precoVenda">R$</InputGroup.Text>
                   <Form.Control
                       type="text"
                       id="precoVenda"
                       name="precoVenda"
                       aria-describedby="precoVenda"
                       value={usuario.precoVenda}
                       onChange={manipularMudanca}
                       required
                   />
                   <Form.Control.Feedback type="invalid">
                       Por favor, informe o preço de venda!
                   </Form.Control.Feedback>
               </InputGroup>
           </Form.Group>
           <Form.Group as={Col} md="4">
               <Form.Label>Qtd em estoque:</Form.Label>
               <InputGroup hasValidation>
                   <InputGroup.Text id="qtdEstoque">+</InputGroup.Text>
                   <Form.Control
                       type="text"
                       id="qtdEstoque"
                       name="qtdEstoque"
                       aria-describedby="qtdEstoque"
                       value={usuario.qtdEstoque}
                       onChange={manipularMudanca}
                       required
                   />
                   <Form.Control.Feedback type="invalid">
                       Por favor, informe a quantidade em estoque!
                   </Form.Control.Feedback>
               </InputGroup>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Url da imagem:</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="urlImagem"
                   name="urlImagem"
                   value={usuario.urlImagem}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do usuario!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
            <Form.Group as={Col} md="4">
           <Form.Label>Válido até:</Form.Label>
           <Form.Control
               required
               type="date" 
               id="dataValidade"
               name="dataValidade"
               value={usuario.dataValidade ? usuario.dataValidade.split('T')[0] : ''}  
               onChange={manipularMudanca}
           />
           <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do usuario!</Form.Control.Feedback>
       </Form.Group>
           <Form.Group as={Col} md={7}>
               <Form.Label>Mensagens:</Form.Label>
               <Form.Select id='mensagens' 
                            name='mensagens'
                            onChange={selecionarMensagens}>
                   {// criar em tempo de execução as mensagens existentes no banco de dados
                       mensagens.map((mensagens) =>{
                           return <option value={mensagens.codigo}>
                                       {mensagens.descricao}
                                  </option>
                       })
                   }
                   
               </Form.Select>
           </Form.Group>
           <Form.Group as={Col} md={1}>
               {
                 !temMensagens ? <Spinner className='mt-4' animation="border" variant="success" />
                 : ""
               }
           </Form.Group>
       </Row>
       <Row className='mt-2 mb-2'>
           <Col md={1}>
               <Button type="submit" disabled={!temMensagens}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
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
