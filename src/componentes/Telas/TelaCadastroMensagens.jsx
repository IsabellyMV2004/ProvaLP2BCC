import { Alert } from "react-bootstrap";
import FormCadMensagens from "./Formularios/FormCadMensagens";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaMensagens from "./Tabelas/TabelaMensagens";
import { consultarMensagens } from "../../servicos/servicoMensagens";

export default function TelaCadastroMensagens(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeMensagens, setListaDeMensagens] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);

    const [mensagemSelecionada, setMensagemSelecionada] = useState({
        id: 0,
        dataHora: "",
        lida: false,
        mensagem: "",
        idUsuario: 0
    });

    useEffect(() => {
        consultarMensagens().then((lista) => {
            setListaDeMensagens(lista);
        });
    }, []); // Executa ao montar o componente (didMount)

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 text-center" variant="success">
                    <h2>Cadastro de Mensagens</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaMensagens
                        listaDeMensagens={listaDeMensagens}
                        setListaDeMensagens={setListaDeMensagens}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setMensagemSelecionada={setMensagemSelecionada} // Nome correto
                    />
                ) : (
                    <FormCadMensagens
                        listaDeMensagens={listaDeMensagens}
                        setListaDeMensagens={setListaDeMensagens}
                        setExibirTabela={setExibirTabela}
                        mensagemSelecionada={mensagemSelecionada}
                        setMensagemSelecionada={setMensagemSelecionada} // Nome correto
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                )}
            </Pagina>
        </div>
    );
}
