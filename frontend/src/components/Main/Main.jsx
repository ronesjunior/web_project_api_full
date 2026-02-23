import { useContext } from "react";
import editButton from "../../images/edit_button.png";
import addButton from "../../images/add_button.png";
import avatar from "../../images/jaques_costeau.jpg";
import Popup from "../Main/Components/Popup/Popup.jsx";
import NewCard from "../NewCard/NewCard.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";
import EditAvatar from "../EditAvatar/EditAvatar.jsx";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";
import Card from "../Card/Card.jsx";

// IMPORTAR O CONTEXTO
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({
  popup,
  selectedImage,
  onOpenPopup,
  onClosePopup,
  setSelectedImage,
  cards,
  onCardLike,
  onCardDelete,
}) {
  // PEGAR O USUÁRIO DO CONTEXTO
  const { currentUser } = useContext(CurrentUserContext); // vai consumir os dados do provider, ou seja, o currentUser passdo em App.jsx para os filhos

  const newCardPopup = { title: "Novo local", children: <NewCard /> };
  const editProfile = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatar = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };

  function handleImageClick(card) {
    setSelectedImage(card);
  }

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={() => onOpenPopup(editAvatar)}
        >
          <img
            className="profile__avatar"
            src={currentUser?.avatar || avatar}
            alt="imagem do avatar"
          />
          <div className="profile__avatar-edit"></div>
        </div>

        <div className="profile__info">
          <p className="profile__title">
            {currentUser?.name || "Jacques Cousteau"}
          </p>

          <p className="profile__description">
            {currentUser?.about || "Explorador"}
          </p>

          <div className="profile__edit-button">
            <div
              className="profile__square"
              onClick={() => onOpenPopup(editProfile)}
            >
              <img
                className="profile__image-button"
                src={editButton}
                alt="botão editar"
              />
            </div>
          </div>
        </div>

        <div className="profile__retangule">
          <div
            className="profile__add-button"
            onClick={() => onOpenPopup(newCardPopup)}
          >
            <img
              className="profile__add-image"
              src={addButton}
              alt="botão editar"
            />
          </div>
        </div>
      </section>

      <div className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleImageClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </div>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          children={popup.children}
        />
      )}

      {selectedImage && (
        <ImagePopup card={selectedImage} onClose={onClosePopup} />
      )}
    </main>
  );
}

export default Main;
