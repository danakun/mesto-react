import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  // Переменная состояния для инфо пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Переменные состояний для попапов
  const [isAvatarPopupOpened, setIsAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    useState(false);
  const [isAddPhotoPopupOpened, setIsAddPhotoPopupOpened] = useState(false);
  const [IsConfirmationPopupOpened, setIsConfirmationPopupOpened] =
    useState(false);
  // Переменная состояния для карточки
  const [selectedCard, setSelectedCard] = useState(null);
  // Переменная состояния для массива карточек
  const [cards, setCards] = useState([]);

  // Функция с промисом для данных профиля и карточки
  useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
        // console.log(currentUser)
        //console.log(cards)
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

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

  function handleUserUpdate(currentUser) {
    setCurrentUser(currentUser);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в api для данных о лайке
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
    // console.log('myId ' + currentUser._id)
    //console.log('cardlikes ' + card.likes)
    // console.log('card ' + card)
    // console.log(cards)
    // console.log({ card });
    // console.log(card._id, isLiked);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((thisCard) => thisCard._id !== card._id)
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
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
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          onUpdateUser={handleUserUpdate}
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
    </CurrentUserContext.Provider>
  );
}

export default App;

//   // Обработчик клика для пользователя
//  function handleUserUpdate({ name, about }) {
//   api.editProfile(name, about)
//   .then((newUser) => {
//   setCurrentUser(newUser)
//   closeAllPopups();
// })
// .catch((error) => console.log(`Ошибка: ${error}`));
// }
