// Объект валидации с настройками
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

// Переменные для попапов
const popupProfileOverlay = document.querySelector('.popup-profile');
const popupOverlayPhoto = document.querySelector('.popup-add-photo');
const popupChangeAvatar = document.querySelector('.popup-change-avatar')

// Переменные для кнопок открытия попапов
const buttonProfileEditing = document.querySelector('.profile__edit-button');
const buttonPicAddition = document.querySelector(".profile__add-button");
const buttonAvatarEditing = document.querySelector('.profile__change-avatar-button');

// Переменные для форм попапа
const profileForm = popupProfileOverlay.querySelector('.popup__form');
const photoForm = popupOverlayPhoto.querySelector('.popup__form');
const avatarForm = popupChangeAvatar.querySelector('.popup__form');

const avatar = document.querySelector('.profile__change-avatar-button');

export {
  validationObject,
  popupProfileOverlay,
  popupOverlayPhoto,
  popupChangeAvatar,
  buttonProfileEditing,
  buttonPicAddition,
  buttonAvatarEditing,
  profileForm,
  photoForm,
  avatarForm,
  avatar
};
