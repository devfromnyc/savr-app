import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../util/validators';

import './Input.css'

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
        <input
        id={props.id}
        name={props.name}
        type={props.type}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        />
    ) : (
        <select id={props.CatId} name={props.CatId} onChange={changeHandler}
        onBlur={touchHandler}>
            <option value="" defaultValue={props.defaultValueName}>{props.defaultValue}</option>
            <option value={props.options[0]}>{props.options[0]}</option>
            <option value={props.options[1]}>{props.options[1]}</option>
            <option value={props.options[2]}>{props.options[2]}</option>
            <option value={props.options[3]}>{props.options[3]}</option>
            <option value={props.options[4]}>{props.options[4]}</option>
        </select>
    );

  return (
    <div className="input-field col s6">
      <label htmlFor={props.id} className={props.accessibility && "sr-only"}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p className="error-text">{props.errorText}</p>}
    </div>
  );
};

export default Input;
