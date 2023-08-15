import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../../shared/util/validators';

import { useForm } from '../../../shared/hooks/form-hook';

import Input from './Inputs/Input';
import Button from '../UserInterface/Button';

import './Form.css';

const LoginForm = () =>{
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
    {
        email: {
        value: '',
        isValid: false
        },
        password: {
        value: '',
        isValid: false
        }
    },
    false
    );

    const authSubmitHandler = async event => {
        event.preventDefault();
        
        const inputData = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        }

        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            const responseData = await response.json();

            if (response.ok){
                auth.login(responseData.user.id);
            }

        } catch (err){
            console.log(err);
        }
    };


    return(
        <form className="basic-form" onSubmit={authSubmitHandler}>
            <h2 className="text-center">Login</h2>
            <Input
            element="input" 
            id="email"
            name="email"
            type="email"
            label="Username"
            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            />
            <Input
            element="input" 
            id="password"
            name="username"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
            errorText="Please enter a valid password, at least 6 characters."
            />
            <Button innerText="Log In" disabled={!formState.isValid}/>
        </form>
    );
}

export default LoginForm;