import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoToolTip';
import * as apiAuth from '../utils/apiAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user.data);
          setCards(cards.data.toReversed());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c))))
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .changeUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar({ avatar })
      .then((user) => {
        setCurrentUser((userData) => ({ ...userData, avatar: user.data.avatar }));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleLogin = ({ email, password }) => {
    apiAuth
      .login({ email, password })
      .then(() => {
        setEmail(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsInfoToolTipOpen(true);
      });
  };

  const handleRegister = ({ email, password }) => {
    apiAuth
      .register({ email, password })
      .then((res) => {
        setEmail(res.email);
        setError(false);
        setIsInfoToolTipOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsInfoToolTipOpen(true);
      });
  };

  const handleSignOut = () => {
    apiAuth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => console.error(err));
  };

  const checkCookie = () => {
    apiAuth
      .checkCookie()
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        email={email}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <Login
              btnName={'Войти'}
              onSignIn={handleLogin}
            />
          }
        />
        <Route
          path='/sign-up'
          element={
            <Register
              btnName={'Зарегистрироваться'}
              onSignUp={handleRegister}
            />
          }
        />
        <Route />
      </Routes>
      {/* <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      /> */}
      <Footer loggedIn={loggedIn} />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        isError={isError}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
