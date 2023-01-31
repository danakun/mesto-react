function ImagePopup({ card, onClose, onOverlayClick }) {
  return (
    <section
      className={
        card
          ? `popup popup_opened popup-photo popup_type_photo`
          : `popup popup-photo popup_type_photo`
      }
      onClick={onOverlayClick}
    >
      <figure className="popup__lightbox">
        <img
          className="popup__photo"
          src={card ? card.link : '#'}
          alt={card ? card.name : ''}
        />
        <figcaption className="popup__caption">
          {card ? card.name : ''}
        </figcaption>
        <button
          className="popup__close close-photo"
          type="button"
          aria-label="Закрыть полноразмерное фото"
          onClick={onClose}
        ></button>
      </figure>
    </section>
  );
}

export default ImagePopup;
