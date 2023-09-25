import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_NUMBER
} from '../../../shared/util/validators';

import { useForm } from '../../../shared/hooks/form-hook';

import Input from './Inputs/Input';
import Button from '../UserInterface/Button';

import './Form.css';

const AddItemForm = () => {

    const auth = useContext(AuthContext);

    const uid = auth.userId;

    const [formState, inputHandler] = useForm(
        {
            title: {
            value: '',
            isValid: false
            },
            category: {
            value: '',
            isValid: false
            },
            cost: {
            value: '',
            isValid: false
            },
            date: {
            value: '',
            isValid: false
            },
        },
        false
    );
    
    const addItemHandler = async event => {
        event.preventDefault();

        const inputData = {
            title: formState.inputs.title.value,
            category: formState.inputs.category.value,
            cost: formState.inputs.cost.value,
            date: formState.inputs.date.value,
            creator: uid
        }

        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/items/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            const responseData = await response.json();

            console.log(responseData);

        } catch (err){
            console.log(err);
        }
    };

    return(
        <form id="add-item-form" className="basic-form-full-width width100" onSubmit={addItemHandler}>
            <Input
            element="input" 
            id="title"
            name="Title"
            type="text"
            label="Item Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="This field is required"
            onInput={inputHandler}
            />
            <Input
            element="select" 
            id="category"
            name="Category"
            type="text"
            label="Item Category"
            defaultValue="Select Category"
            defaultValueName="Select Category"
            options={["Electronics", "Entertainment", "Household", "Restaurant", "Travel"]}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="This field is required"
            accessibility="yes"
            onInput={inputHandler}
            />
            <Input
            element="input" 
            id="cost"
            name="Cost"
            type="text"
            label="Item Cost"
            validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
            errorText="Please enter in a valid number"
            onInput={inputHandler}
            />
            <Input
            element="input" 
            id="date"
            name="Item Date"
            type="text"
            label="Item Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="This field is required"
            onInput={inputHandler}
            />
            <Button innerText="Submit" disabled={!formState.isValid}/>
        </form>
    );
}

export default AddItemForm;