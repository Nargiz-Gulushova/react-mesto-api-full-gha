import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({
      name: currentUser.name,
      job: currentUser.about,
    })
  }, [isOpen, currentUser]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setValues({  ...values, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.job,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Ваше имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleInputChange}
        value={values.name ?? ''}
      />
      <span className="input-name-error popup__error" />
      <input
        id="input-job"
        className="popup__input popup__input_type_job"
        type="text"
        placeholder="Род занятий"
        name="job"
        required
        minLength="2"
        maxLength="200"
        onChange={handleInputChange}
        value={values.job ?? ''}
      />
      <span className="input-job-error popup__error" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
