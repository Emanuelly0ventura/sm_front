import { Link } from "react-router-dom";

export default function Menu(){
    return(
        <nav>
            <Link to="/">SmProjeto</Link> | 
            <Link to="/Login">Login</Link> |
            <Link to="/Perfil">Perfil</Link> |
            <Link to="/Pedidos">Pedidos</Link> |
            <Link to="/Contato">Contato</Link> |
            <Link to="/Ajuda">Ajuda</Link> |
            <Link to="/Solicitar">Solicitar</Link> |
            <Link to="/Faq">Faq</Link> |

        </nav>

    )
}