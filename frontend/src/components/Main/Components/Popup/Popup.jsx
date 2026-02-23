export default function Popup({ onClose, title, children }) {
  return (
    <div className="popup popup__confirm" id="popup__confirm">
      <div className="popup__container">
        <button
          type="button"
          id="popup__close-button"
          className="popup__fechar-botao"
          aria-label="Fechar popup"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        {/* EditAvatar.jsx ou NewCard.jsx ou EditProfile.jsx ou RemoverCard.jsx*/}
      </div>
    </div>
  );
}
