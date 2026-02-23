export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <div
      id="popup_img"
      className="popup-img popup-img__opened_img"
      onClick={onClose}
    >
      <div
        className="popup-img__content_content_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="popup-img__close"
          className="popup-img__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        ></button>

        <img className="popup-img__image" src={card.link} alt={card.name} />
        <p className="popup-img__caption">{card.name}</p>
      </div>
    </div>
  );
}
