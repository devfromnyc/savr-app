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

const EditItemForm = () =>{

    const auth = useContext(AuthContext);

    const uid = auth.userId;

    const [formState, inputHandler] = useForm(
        {
            editTitle: {
            value: '',
            isValid: false
            },
            editCategory: {
            value: '',
            isValid: false
            },
            editCost: {
            value: '',
            isValid: false
            },
            editDate: {
            value: '',
            isValid: false
            },
        },
        false
    );
    
    const editItemHandler = async event => {
        event.preventDefault();

        const editForm = document.getElementById('edit-item-form');

        const editFormId = editForm.getAttribute('data-item-id');

        const editItemId = editFormId.replace("item-container__", "");

        const inputData = {
            title: formState.inputs.editTitle.value,
            category: formState.inputs.editCategory.value,
            cost: formState.inputs.editCost.value,
            date: formState.inputs.editDate.value,
            creator: uid
        }

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/items/${editItemId}`, {
                method: 'PATCH',
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
        <form id="edit-item-form" data-item-id="" className="basic-form-full-width width100" onSubmit={editItemHandler}>
            <Input
            element="input" 
            id="editTitle"
            name="Title"
            type="text"
            label="New Item Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="This field is required"
            onInput={inputHandler}
            />
            <Input
            element="select" 
            id="editCategory"
            name="Category"
            type="text"
            label="New Item Category"
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
            id="editCost"
            name="Cost"
            type="text"
            label="New Item Cost"
            validators={[VALIDATOR_NUMBER(),VALIDATOR_REQUIRE()]}
            errorText="Please Enter In A Valid Number"
            onInput={inputHandler}
            />
            <Input
            element="input" 
            id="editDate"
            name="Item Date"
            type="text"
            label="New Item Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="This field is required"
            onInput={inputHandler}
            />
            <Button innerText="Submit" disabled={!formState.isValid}/>
        </form>
    );
}

export default EditItemForm;