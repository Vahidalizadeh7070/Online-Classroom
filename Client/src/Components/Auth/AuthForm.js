import React,{ useContext, useRef, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const context = useContext(AuthContext)
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArUT1a_l_Q2wPcvNyyIl3qN_u57cvYppo';
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArUT1a_l_Q2wPcvNyyIl3qN_u57cvYppo';
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(
          {
            email: enteredEmail, password: enteredPassword, returnSecureToken: true
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      if (res.ok) {
        if (isLogin) {
          // do something with login 
          // You can redirect or show a string message
          history.replace('/');
          setMessage('Authentication succeeded.');
        }
        else {
          history.replace('/auth');
          setMessage('Your registration completed successfully.');
        }
        setIsLoading(false);
        return res.json();
      }
      else {
        return res.json().then((data) => {
          let errorMessage = 'Authentication failed';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }).then((data) => {
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
      context.login(data.idToken, expirationTime.toISOString(),data.email);
      
    }).catch((error) => {
      setIsLoading(false);
      setMessage(error.message);
    });
  }

  return (
    <section className='mt-5 shadow rounded-3'>
      <div className='p-3'>
        <h1 className='text-center pt-3'>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {message && <h5 className='text-danger text-center pt-3'>{message}</h5>}
        <h4 className='text-danger text-center'>
          {
            isLoading && <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          }
        </h4>
        <form onSubmit={formSubmitHandler}>
          <div className='pb-3'>
            <label htmlFor='email'>Your Email</label>
            <input className='form-control' type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className='pb-3'>
            <label htmlFor='password'>Your Password</label>
            <input className='form-control' type='password' id='password' required ref={passwordInputRef} />
          </div>
          <div className='pb-3 text-center'>
            <p>
              <button className='btn btn-primary rounded-3'>{isLogin ? 'Login' : 'Create Account'}</button>
            </p>
            <button
              type='button'
              className='btn text-primary'
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
