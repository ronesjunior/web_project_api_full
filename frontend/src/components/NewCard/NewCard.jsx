import { useState, useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [titulo, setTitulo] = useState(""); // Adicione variável de estado para título

  const [link, setLink] = useState(""); // Adicione variável de estado para link

  const [tituloError, setTituloError] = useState("");

  const [linkError, setLinkError] = useState("");

  const [isLinkValid, setIsLinkValid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    handleAddPlaceSubmit({ name: titulo, link }); // Atualiza as informações do usuário
  };

  const handleTituloChange = (event) => {
    const input = event.target;
    setTitulo(event.target.value); // Atualiza o título (name) quando a entrada for alterada

    // Usando validity.valid
    if (!input.validity.valid) {
      setTituloError(input.validationMessage);
    } else {
      setTituloError("");
    }
  };

  const handleLinkChange = (event) => {
    const input = event.target;
    setLink(input.value);

    if (!input.validity.valid) {
      setLinkError(input.validationMessage);
      setIsLinkValid(false);
    } else {
      setLinkError("");
      setIsLinkValid(true);
    }
  };

  return (
    <form
      id="popup-add-card__form"
      className="popup-add-card__form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup-add-card__entrada"
        type="text"
        id="titulo"
        name="titulo"
        placeholder="Título"
        required
        minLength="2"
        maxLength="30"
        value={titulo} // Vincular nome ao campo de entrada
        onChange={handleTituloChange}
      />
      <span className="titulo-error">{tituloError}</span>

      <input
        className="popup-add-card__entrada"
        type="url"
        id="link"
        name="link"
        placeholder="Link de imagem"
        value={link} // Vincular nome ao campo de entrada
        onChange={handleLinkChange}
        required
      />
      <span className="link-error">{linkError}</span>

      <button
        type="submit"
        className={`popup-add-card__criar-botao ${
          titulo.trim().length < 2 || titulo.trim().length > 30 || !isLinkValid
            ? "popup-add-card__criar-botao_inativo"
            : ""
        }`}
        disabled={
          titulo.trim().length < 2 || titulo.trim().length > 30 || !isLinkValid
        }
      >
        Salvar
      </button>
    </form>
  );
}
