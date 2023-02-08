import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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

  function handleUpdateUser({ name, about }) {
    // Внутри этого обработчика вызовите api.setUserInfo.
    // После завершения запроса обновите стейт currentUser из полученных данных
    //  и закройте все модальные окна.
    api
      .editProfile(name, about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  // Обработчик смены аватара
  function handleUpdateAvatar(avatar) {
    api
      .updateProfilePicture(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  // Обработчик добавления новой карточки
  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
        <EditAvatarPopup
          isOpen={isAvatarPopupOpened}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPhotoPopupOpened}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
        />

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
