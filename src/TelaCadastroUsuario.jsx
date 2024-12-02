import { Alert } from "react-bootstrap";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import Pagina from "./componentes/layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import { consultarUsuario } from "./servicos/servicoUsuario";

export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        urlAvatar: "",
        dataIngresso: "",
        mensagens: [] // Adicionando mensagens ao objeto usuário
    });

    useEffect(() => {
        consultarUsuario().then((lista) => {
            setListaDeUsuarios(lista);
        });
    }, []); // Executa ao montar o componente

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 text-center" variant="success">
                    <h2>Cadastro de Usuário</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                    />
                ) : (
                    <FormCadUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                )}
            </Pagina>
        </div>
    );
}
