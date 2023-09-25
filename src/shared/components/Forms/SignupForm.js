import React from 'react';

import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../../shared/util/validators';

import { useForm } from '../../../shared/hooks/form-hook';

import Input from './Inputs/Input';
import Button from '../UserInterface/Button';

import './Form.css';


const SignupForm = () =>{

    const [formState, inputHandler] = useForm(
        {
            name: {
            value: '',
            isValid: false
            },
            email_signup: {
            value: '',
            isValid: false
            },
            password_signup: {
            value: '',
            isValid: false
            }
        },
        false
        );
    
        const signSubmitHandler = async event => {
            event.preventDefault();
            // console.log(formState.inputs);

            const inputData = {
                name: formState.inputs.name.value,
                email: formState.inputs.email_signup.value,
                password: formState.inputs.password_signup.value
            }

            try{
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputData)
                });

                const responseData = await response.json();
                alert(responseData.message);

            } catch (err){
                console.log(err);
            }
        };

    return(
        <form className="basic-form" onSubmit={signSubmitHandler}>
            <h2 className="text-center">Sign Up</h2>
            <Input
            element="input" 
            id="name"
            name="Name"
            type="text"
            label="Full Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="This field is required"
            onInput={inputHandler}
            />
            <Input
            element="input" 
            id="email_signup"
            name="Email"
            type="email"
            label="Email Address"
            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email address for your Username."
            onInput={inputHandler}
            />
            <Input
            element="input" 
            id="password_signup"
            name="username"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
            errorText="Please enter a valid password, at least 6 characters."
            />
            <Button innerText="Sign Up" disabled={!formState.isValid}/>
        </form>
    );
}

export default SignupForm;