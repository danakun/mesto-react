import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, onOverlayClick, isOpen, onAddPlace }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleInput(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkInput(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(title, link);
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <label className="popup__input-label">
        <input
          name="name"
          id="title"
          onChange={handleTitleInput}
          value={title}
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
          onChange={handleLinkInput}
          value={link}
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
  );
}

export default AddPlacePopup;
