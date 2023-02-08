import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const { link, name, owner, likes } = card;

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((like) => like._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-grid__like ${
    isLiked && 'photo-grid__like_active'
  }`;
  // Функция обработчик клика по карточке
  function handleCardClick() {
    onCardClick(card);
  }
  // Функция обработчик клика по сердечку
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__element">
      <img
        className="photo-grid__image"
        src={link}
        alt={name}
        onClick={handleCardClick}
      />
      <div className="photo-grid__info">
        <h2 className="photo-grid__text">{name}</h2>
        <div className="counter">
          <button
            className={cardLikeButtonClassName} //"photo-grid__like"
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="photo-grid__like-counter">{likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="photo-grid__delete"
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить фото"
        ></button>
      )}
    </li>
  );
}

export default Card;
