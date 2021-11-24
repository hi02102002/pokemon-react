import React from 'react';
import './Loading.scss';

function Loading(props) {
    return (
        <div
            className={`o-pokeball c-loader u-bounce ${
                props.className ? props.className : ''
            }`}
        ></div>
    );
}

export default Loading;
