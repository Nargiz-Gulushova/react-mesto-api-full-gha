import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({
      title: "",
      image: "",
    });
  }, [isOpen]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name: values.title,
      link: values.image,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add-mesto"
      submitText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-title"
        className="popup__input popup__input_type_title"
        type="text"
        placeholder="Название"
        name="title"
        required
        minLength="2"
        maxLength="30"
        value={values.title ?? ""}
        onChange={handleInputChange}
      />
      <span className="input-title-error popup__error" />
      <input
        id="input-image"
        className="popup__input popup__input_type_image"
        type="url"
        placeholder="Ссылка на картинку"
        name="image"
        required
        minLength="2"
        value={values.image ?? ""}
        onChange={handleInputChange}
      />
      <span className="input-image-error popup__error" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
