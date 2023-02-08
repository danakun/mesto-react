function PopupWithForm({
  isOpen,
  name,
  title,
  children,
  onClose,
  onSubmit,
  onOverlayClick,
  buttonText,
}) {
  return (
    <section
      className={
        isOpen ? `popup popup_opened popup-${name}` : `popup popup-${name}`
      }
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form ${name}-form`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className="popup__save-button"
            type="submit"
            aria-label="Сохранить данные"
          >
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
