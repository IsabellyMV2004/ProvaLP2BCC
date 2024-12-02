import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Sala de BAte Papo" />
                <Menu />
                {
                    props.children
                }
            </Container>
        </>

    );
}