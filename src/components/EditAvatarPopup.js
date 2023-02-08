import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, onOverlayClick }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      buttonText="Сохранить"
    >
      <label className="popup__input-label">
        <input
          name="avatar"
          id="avatar-link"
          ref={inputRef}
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
  );
}

export default EditAvatarPopup;
