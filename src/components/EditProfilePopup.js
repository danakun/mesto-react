import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onOverlayClick, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange({ target }) {
    setName(target.value);
  }

  function handleDescriptChange({ target }) {
    setDescription(target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__input-label">
        <input
          name="name"
          id="name"
          value={name}
          onChange={handleNameChange}
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
          value={description}
          onChange={handleDescriptChange}
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
  );
}

export default EditProfilePopup;
