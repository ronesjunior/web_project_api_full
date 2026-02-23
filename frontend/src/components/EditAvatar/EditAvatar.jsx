import { useState, useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);

  const { currentUser, handleUpdateAvatar } = userContext;

  const [avatar, setAvatar] = useState(currentUser.avatar); // Adicione variável de estado para nome

  const [avatarError, setAvatarError] = useState("");

  const [isValid, setIsValid] = useState(false);

  const handleAvatarChange = (event) => {
    const input = event.target;
    setAvatar(event.target.value); // Atualiza o nome (avatar) quando a entrada for alterada

    // Usando validity.valid
    if (!input.validity.valid) {
      setAvatarError(input.validationMessage);
      setIsValid(false);
    } else {
      setAvatarError("");
      setIsValid(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    handleUpdateAvatar({ avatar }); // Atualiza as informações do usuário
  };

  return (
    <form
      className="popup__form-avatar"
      name="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar-url"
        id="avatar-url-input"
        type="url"
        name="avatar"
        placeholder="Link do avatar"
        required
        value={avatar} // Vincular nome ao campo de entrada
        onChange={handleAvatarChange}
      />
      <span className="avatar-error">{avatarError}</span>
      <button
        type="submit"
        className={`popup__button ${!isValid ? "popup__button_disabled" : ""}`}
        disabled={!isValid}
      >
        Salvar
      </button>
    </form>
  );
}
