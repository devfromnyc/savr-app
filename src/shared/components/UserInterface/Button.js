import React from "react";

import './button.css';

const Button = props => {
    return(
        <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action"
        disabled={props.disabled}>
            {props.innerText}
            <i className="material-icons right">send</i>
        </button>
    );
}

export default Button;