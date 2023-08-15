import React from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './FormContainer.css';

const HomepageFormContainer = () =>{
    return(
        <section className="form-container">
            <LoginForm />
            <SignupForm />
        </section>
    );
}

export default HomepageFormContainer;