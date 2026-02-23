import SignForm from "../SignForm/SignForm";
import "../../blocks/register.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Register({ handleRegistration }) {
  return (
    <div className="register">
      <div className="register__titulo">Inscrever-se</div>
      <SignForm
        name="register"
        title="Inscrever-se"
        onSubmit={handleRegistration}
      />
      <Link className="register__signin-link" to="/signin">
        Já é membro? Faça o login aqui!
      </Link>
    </div>
  );
}

Register.propTypes = {
  handleRegistration: PropTypes.func,
};
