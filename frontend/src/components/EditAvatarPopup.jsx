import React, { useEffect, useRef } from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const ref = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  };

  useEffect(() => {
    ref.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        submitText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="input-avatar-link"
          className="popup__input popup__input_type_avatar-link"
          type="url"
          placeholder="Ссылка на аватар"
          name="input-avatar-link"
          ref={ref}
          required
        />
        <span className="input-avatar-link-error popup__error" />
      </PopupWithForm>
  )
}

export default EditAvatarPopup