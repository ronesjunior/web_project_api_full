import SignForm from "../SignForm/SignForm";
import "../../blocks/login.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Login({ handleLogin }) {
  return (
    <div className="login">
      <div className="login__titulo">Entrar</div>
      <SignForm name="login" title="Entrar" onSubmit={handleLogin} />{" "}
      {/* “Passe a função handleLogin como prop chamada onSubmit” */}
      <Link className="login__signin-link" to="/signup">
        Ainda não é membro? Inscreva-se aqui!
      </Link>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func,
};
