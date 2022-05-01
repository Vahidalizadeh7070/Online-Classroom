import AuthForm from '../Components/Auth/AuthForm';
import Image from '../AuthPageImage.jpg';
import React from 'react';

const AuthPage = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='mt-5 col-md-6'>
          <div className='shadow rounded-3'>
            <div className='p-3'>
              <h3 className='text-center pt-5 text-danger'>
                Online Classroom
              </h3>
              <img src={Image} className='img-fluid h-100' alt='AuthLogingPage'/>
            </div>
          </div>
        </div>
        <div className='col-md-6 rounded-3'>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
