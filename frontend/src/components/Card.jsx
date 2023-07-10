import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { name, link, likes } = card;
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `mesto__like-button ${
    isLiked && "mesto__like-button_active"
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="mesto__item">
      {isOwn && (
        <button
          className="mesto__delete-button"
          aria-label="Удалить"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="mesto__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="mesto__wrap">
        <h2 className="mesto__title">{name}</h2>
        <div className="mesto__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="mesto__like-counter">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
