import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import classes from './PokedexItem.module.scss';

function PokedexItem(props) {
    const [imgLoading, setImgLoading] = useState(true);
    const [isManyRequest, setIsManyRequest] = useState(false);

    let id;
    if (props.id < 10) {
        id = `00${props.id}`;
    } else if (props.id >= 10 && props.id < 100) {
        id = `0${props.id}`;
    } else {
        id = props.id;
    }

    return (
        <Link
            to={`pokemon/${props.id}`}
            style={{ display: 'block', height: '100%' }}
        >
            <div className={classes['pokedex-item']}>
                <div
                    className={`${classes.img} ${props.types[0].type.name}`}
                    style={isManyRequest ? { flexDirection: 'column' } : null}
                >
                    {imgLoading ? (
                        <Loading className={classes.loading} />
                    ) : null}
                    <img
                        src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${props.id}.png?raw=true`}
                        alt={props.name}
                        onLoad={() => setImgLoading(false)}
                        onError={() => setIsManyRequest(true)}
                        style={
                            isManyRequest
                                ? { display: 'none' }
                                : imgLoading
                                ? { display: 'none' }
                                : { display: 'block' }
                        }
                    />
                    {isManyRequest ? (
                        <p
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'red',
                                color: '#fff',
                                borderRadius: '1.6rem',
                            }}
                        >
                            To many request
                        </p>
                    ) : null}
                </div>

                <div className={classes.content}>
                    <span className={classes.id}>{`#${id}`}</span>

                    <h4 className={classes.name}>{props.name}</h4>

                    <div className={classes.types}>
                        {props.types.map(type => {
                            return (
                                <div
                                    key={type.type.name}
                                    className={type.type.name}
                                >
                                    {type.type.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PokedexItem;
