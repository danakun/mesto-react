import Card from './Card';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile container">
        <div
          className="profile__change-avatar-button"
          aria-label="Открыть попап редактирования аватара"
          tabIndex="1"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <p className="profile__job">{about}</p>
          <button
            className="profile__edit-button"
            aria-label="Изменить профиль"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements container">
        <ul className="photo-grid">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
