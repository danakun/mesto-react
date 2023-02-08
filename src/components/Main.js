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
  cards
}) {
  const { currentUser } = useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile container">
        <div
          className="profile__change-avatar-button"
          aria-label="Открыть попап редактирования аватара"
          tabIndex="1"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
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
        <ul className="photo-grid">{cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}</ul>
      </section>
    </main>
  );
}

export default Main;





// const cardElements = cards.map((card) => {
  //   return (
  //     <li key={card._id}>
  //       <Card
  //         card={card}
  //         onCardClick={onCardClick}
  //         onCardLike={onCardLike}
  //         onCardDelete={onCardDelete}
  //
  //       />
  //     </li>
  //   );
  // });

  // Переменные состояния информации профиля
  //const [userName, setUserName] = useState('');
  //const [userDescription, setUserDescription] = useState('');
  // const [userAvatar, setUserAvatar] = useState('#');

  // Переменные состояния массива карточек
 //const [cards, setCards] = useState([]);

  // Функция эффекта для данных профиля и карточки
  // useEffect(() => {
  //   Promise.all([api.getUserProfile(), api.getInitialCards()])
  //     .then(([userData, cards]) => {
  //       setUserName(userData.name);
  //       setUserDescription(userData.about);
  //       setUserAvatar(userData.avatar);
  //       setCards(cards);
  //     })
  //     .catch((error) => console.log(`Ошибка: ${error}`));
  // }, []);
