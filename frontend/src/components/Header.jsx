import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header ({ loggedIn, email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <div className='header__wrapper'>
        {
          loggedIn
            ?
              <>
                <p className='header__email'>{email}</p>
                <button type='button' className='header__button' onClick={onSignOut}>Выйти</button>
              </>
            :
              <>
                <NavLink
                  to="/sign-in"
                  className={({isActive}) => `${!isActive ? 'header__link header__link_active' : 'header__link'}`}>
                    Войти
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className={({isActive}) => `${!isActive ? 'header__link header__link_active' : 'header__link'}`}>
                    Регистрация
                </NavLink>
              </>
        }
        
      </div>
    </header>
  )
}

export default Header;