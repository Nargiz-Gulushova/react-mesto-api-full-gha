function ImagePopup ({onClose, card}) {
  return (
    <div className={`popup popup_img ${card._id ? 'popup_opened' : ''}`}>
      <div className="popup__container-img">
        <button 
          className="popup__close popup__close_img" 
          aria-label="Закрыть" 
          type="button" 
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img 
            className="popup__image" 
            src={card.link} 
            alt={card.name} 
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
  </div>
    
  )
}

export default ImagePopup;