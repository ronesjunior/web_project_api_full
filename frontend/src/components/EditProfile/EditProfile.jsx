import { useState, useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext); // Obtém o objeto de usuário atual

  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name); // Adicione variável de estado para nome

  const [description, setDescription] = useState(currentUser.about); // Adicione variável de estado para descrição

  const [nameError, setNameError] = useState("");

  const [descriptionError, setDescriptionError] = useState("");

  const handleNameChange = (event) => {
    const input = event.target;
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada

    // Usando validity.valid
    if (!input.validity.valid) {
      setNameError(input.validationMessage);
    } else {
      setNameError("");
    }
  };

  const handleDescriptionChange = (event) => {
    const input = event.target;
    setDescription(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada

    // Usando validity.valid
    if (!input.validity.valid) {
      setDescriptionError(input.validationMessage);
    } else {
      setDescriptionError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    handleUpdateUser({ name, about: description }); // Atualiza as informações do usuário
  };

  return (
    <form
      id="popup__form"
      className="popup__form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        id="nome"
        name="nome"
        placeholder="Nome"
        required
        minLength="2"
        maxLength="40"
        value={name} // Vincular nome ao campo de entrada
        onChange={handleNameChange} // Adicionar manipulador onChange
      />
      <span className="nome-error">{nameError}</span>

      <input
        className="popup__input"
        type="text"
        id="sobre"
        name="sobre"
        placeholder="Sobre mim"
        required
        minLength="4"
        maxLength="200"
        value={description} // Vincular nome ao campo de entrada
        onChange={handleDescriptionChange} // Adicionar manipulador onChange
      />
      <span className="sobre-error">{descriptionError}</span>

      <button
        type="submit"
        id="popup__button"
        className={`popup__button ${
          name === "" ||
          name.trim().length < 2 ||
          name.trim().length > 40 ||
          description === ""
            ? "popup__button_disabled"
            : null
        }`}
        disabled={
          name === "" ||
          name.trim().length < 2 ||
          name.trim().length > 40 ||
          description === ""
        }
      >
        Salvar
      </button>
    </form>
  );
}
