import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = (props) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValues({
        ...formValues,
        [name]: value,
     })
  };
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSignUp({
      email: formValues.email,
      password: formValues.password,
    })
    setFormValues({});
  };

  return (
    <div className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
      <form name="register" className="authorization__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="authorization__input"
          autoComplete="email"
          onChange={handleChange}
          value={formValues.email ?? ''}
          required
        />
        <span className={`authorization__input-error email-error`}></span>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="authorization__input"
          autoComplete="current-password"
          onChange={handleChange}
          value={formValues.password ?? ''}
          required
        />
        <span className={`authorization__input-error password-error`}></span>
        <button type="submit" className="authorization__submit-button">
          {props.btnName}
        </button>
        <Link to="/sign-in" className="authorization__link">
          Есть аккаунт? Войдите
        </Link>
      </form>
    </div>
  )
}

export default Register