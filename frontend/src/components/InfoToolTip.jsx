import React from "react";
import success from "../images/success.png";
import fail from "../images/fail.png";
import Popup from "./Popup";

const InfoTooltip = (props) => {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <img
        src={props.isError ? fail : success}
        alt="Картинка статуса регистрации"
        className="popup__status-image"
      />
      <h2 className="popup__status-title">
        {props.isError ? "Что-то пошло не так! Попробуйте ещё раз." : `Вы успешно зарегистрировались!`}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;
