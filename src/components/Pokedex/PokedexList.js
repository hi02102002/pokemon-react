import React, { useEffect, useState } from 'react';
import PokedexItem from './PokedexItem';
import Loading from '../Loading/Loading';
import classes from './PokedexList.module.scss';

function PokedexList(props) {
    const [pokemonDex, setPokemonDex] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async urls => {
            setIsLoading(true);
            const res = await Promise.all(urls.map(u => fetch(u)));
            const data = await Promise.all(res.map(r => r.json()));

            setPokemonDex([...data]);
            setIsLoading(false);
        };
        fetchAll(props.pokemonUrls);
    }, [props.pokemonUrls]);

    return (
        <ul className={classes['pokedex-list']}>
            {isLoading ? (
                <Loading className={classes.loading} />
            ) : (
                pokemonDex.map(pokedex => {
                    return (
                        <li key={pokedex.name}>
                            <PokedexItem
                                types={pokedex.types}
                                id={pokedex.id}
                                name={pokedex.name}
                                url={`pokemon/${pokedex.id}`}
                            />
                        </li>
                    );
                })
            )}
        </ul>
    );
}

export default PokedexList;
