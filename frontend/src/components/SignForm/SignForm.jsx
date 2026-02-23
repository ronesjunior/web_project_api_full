import "../../blocks/signform.css";
import { useState } from "react";
import PropTypes from "prop-types";

export default function SignForm(props) {
  const { name, title, onSubmit } = props;

  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data); //  esse onSubmit que é a props recebida de Login.jsx, ou seja, executa o handleLogin com o data
  };

  const formClass = `form form_sign form__${name}`;

  return (
    <form className={formClass} name={name} onSubmit={handleSubmit}>
      <div></div>
      <fieldset className="form__fieldset">
        <input
          type="email"
          name="email"
          id="email-input"
          className="form__input form__input_sign form__input_el_email"
          placeholder="E-mail"
          onChange={handleChange} // Adicionar manipulador onChange
          required
        />
        <span className="email-input-error form__input-error"></span>

        <input
          type="password"
          name="password"
          id="password-input"
          className="form__input form__input_sign form__input_el_password"
          placeholder="Senha"
          onChange={handleChange} // Adicionar manipulador onChange
          required
        />
        <span className="password-input-error form__input-error"></span>

        <button
          type="submit"
          id="submit"
          className="form__button form__button_sign"
        >
          {title}
        </button>
      </fieldset>
    </form>
  );
}

SignForm.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
};
