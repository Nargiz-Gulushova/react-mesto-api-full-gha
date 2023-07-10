import React, { useContext } from "react";
import addBtn from "../images/add-button.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user-container">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name} </h1>
              <button
                className="profile__edit-button"
                aria-label="Редактировать"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить"
          type="button"
          onClick={onAddPlace}
        >
          <img src={addBtn} alt="Кнопка Добавить" />
        </button>
      </section>
      <section className="mesto">
        <ul className="mesto__list">
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
