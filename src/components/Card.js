function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <li className="photo-grid__element">
      <img
        className="photo-grid__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="photo-grid__info">
        <h2 className="photo-grid__text">{card.name}</h2>
        <div className="counter">
          <button
            className="photo-grid__like"
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="photo-grid__like-counter"></span>
        </div>
      </div>
      <button
        className="photo-grid__delete"
        type="button"
        aria-label="Удалить фото"
      ></button>
    </li>
  );
}

export default Card;
