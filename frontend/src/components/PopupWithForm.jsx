function PopupWithForm({
  title,
  name,
  children,
  submitText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className={`popup__close popup__close_${name}`}
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          <form
            className={`popup__form popup__form_${name}`}
            name={`form-${name}`}
            onSubmit={onSubmit}
          >
            {children}
            <button
              className={`popup__submit-button popup__submit-button_${name}`}
              type="submit"
            >
              {submitText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
