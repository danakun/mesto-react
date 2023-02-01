import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  // Переменные состояния информации профиля
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('#');

  // Переменные состояния массива карточек
  const [cards, setCards] = useState([]);

  // Функция эффекта для данных профиля и карточки
  useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  return (
    <main className="main">
      <section className="profile container">
        <div
          className="profile__change-avatar-button"
          aria-label="Открыть попап редактирования аватара"
          tabIndex="1"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${userAvatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
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
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
