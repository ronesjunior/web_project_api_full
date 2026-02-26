import buttonTrash from "../../images/lixeira.png";
import buttonLike from "../../images/like_button.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card(props) {
  // props = {card: {_id:'699999', name:'Latemar', link:'https://practicum-content.s3.us-west-1.am'}, onImageClick: 'handleImageClick', onCardLike: 'handleCardLike'}

  const { name, link, isLiked } = props.card; // desestruturação do objeto props.card em 'name e 'link' e 'isLiked'
  const { onImageClick, onCardLike, onCardDelete } = props;
  const cardLikeButtonClassName = `element__like-icon ${
    isLiked ? "element__like-icon_active" : ""
  }`;

  return (
    <div className="element">
      <button
        className="element__delete-button"
        type="button"
        aria-label="Excluir cartão"
        onClick={() => onCardDelete(props.card)}
      >
        <img
          src={buttonTrash}
          alt="botão lixeira"
          className="element__lixeira-icon"
        />
      </button>
      <img
        className="element__image"
        src={link}
        alt="Imagem do card"
        onClick={() => onImageClick(props.card)}
      />
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <button
          className="element__like-button"
          type="button"
          aria-label="Curtir"
          onClick={() => onCardLike(props.card)}
        >
          <img
            src={buttonLike}
            alt="botão like"
            className={cardLikeButtonClassName}
          />
        </button>
      </div>
    </div>
  );
}
