import React from 'react';
import classes from './Button.module.scss';

function Button(props) {
    return (
        <button
            className={`${classes.button} ${
                props.className ? props.className : ''
            }`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;
