import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  // Переменные состояний для попапов
  const [isAvatarPopupOpened, setIsAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    useState(false);
  const [isAddPhotoPopupOpened, setIsAddPhotoPopupOpened] = useState(false);
  const [IsConfirmationPopupOpened, setIsConfirmationPopupOpened] =
    useState(false);
  // Переменная состояния для карточек
  const [selectedCard, setSelectedCard] = useState(null);

  // Обработчики открывания попапов по клику
  function handleEditAvatarClick() {
    setIsAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddPlaceClick() {
    setIsAddPhotoPopupOpened(true);
  }
  // Обработчик клика по карточке
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  // Обработчик закрытия попапов
  function closeAllPopups() {
    setSelectedCard(null);
    setIsAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPhotoPopupOpened(false);
    setIsConfirmationPopupOpened(false);
  }

  // Обработчик клика по оверлей
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        isOpen={isAvatarPopupOpened}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        buttonText="Сохранить"
      >
        <label className="popup__input-label">
          <input
            name="link"
            id="avatar-link"
            type="url"
            className="popup__input popup__input_type_photo"
            placeholder="Ссылка на аватар"
            required=""
          />
          <span
            className="popup__error avatar-link-error"
            id="avatar-link-error"
          ></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpened}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        buttonText="Сохранить"
      >
        <label className="popup__input-label">
          <input
            name="name"
            id="name"
            type="text"
            className="popup__input popup__input_type_name"
            placeholder="Ваше имя"
            minLength="2"
            maxLength="40"
            required=""
          />
          <span
            className="popup__error name-error"
            id="name-error"
          ></span>
        </label>
        <label className="popup__input-label">
          <input
            name="job"
            id="job"
            type="text"
            className="popup__input popup__input_type_job"
            placeholder="Ваша профессия"
            minLength="2"
            maxLength="200"
            required=""
          />
          <span
            className="popup__error job-error"
            id="job-error"
          ></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="add-photo"
        title="Новое место"
        isOpen={isAddPhotoPopupOpened}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        buttonText="Создать"
      >
        <label className="popup__input-label">
          <input
            name="name"
            id="title"
            type="text"
            className="popup__input popup__input_type_title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required=""
          />
          <span
            className="popup__error title-error"
            id="title-error"
          ></span>
        </label>
        <label className="popup__input-label">
          <input
            name="link"
            id="photo-link"
            type="url"
            className="popup__input popup__input_type_photo"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span
            className="popup__error photo-link-error"
            id="photo-link-error"
          ></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="confirm-del"
        title="Вы уверены?"
        isOpen={IsConfirmationPopupOpened}
        onClose={closeAllPopups}
        buttonText="Да"
      ></PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      />
    </div>
  );
}

export default App;
