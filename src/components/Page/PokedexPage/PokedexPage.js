import React, { useEffect, useState } from 'react';
import PokedexList from '../../Pokedex/PokedexList';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import { API_BASE } from '../../../constant/constant';
import classes from './Pokedex.module.scss';

function PokedexPage() {
    const [pokemonUrls, setPokemonUrls] = useState([]);
    const [totalPokedex, setTotalPokedex] = useState(0);
    const [filter, setFilter] = useState({
        limit: 20,
        offset: 0,
    });

    useEffect(() => {
        const fecthPokedex = async function () {
            try {
                const queryStr = queryString.stringify(filter);

                const response = await fetch(`${API_BASE}pokemon?${queryStr}`);

                if (!response.ok) {
                    throw new Error('Something went wrong!!!');
                }

                const dataResponse = await response.json();

                setTotalPokedex(dataResponse.count);

                const { results } = dataResponse;

                const urls = results.map(result => result.url);

                setPokemonUrls([...urls]);
            } catch (error) {
                console.error(error);
            }
        };

        fecthPokedex();
    }, [filter]);

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [filter]);

    const paginationClickHandler = data => {
        setFilter({
            ...filter,
            offset: data.selected * filter.limit,
        });
    };

    return (
        <section className={classes.pokedex}>
            <div className="container">
                <div className={classes.container}>
                    <div>
                        <h3 className={classes.title}>
                            1000+ <span>Pokemons</span> for you to choose your
                            favorite
                        </h3>
                    </div>

                    <div className={classes.list}>
                        <PokedexList pokemonUrls={pokemonUrls} />
                    </div>
                </div>
                {pokemonUrls.length > 0 ? (
                    <ReactPaginate
                        pageCount={Math.ceil(totalPokedex / 20)}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={5}
                        onPageChange={paginationClickHandler}
                        containerClassName={classes.containerClassName}
                        pageLinkClassName={classes.pageLinkClassName}
                        previousLinkClassName={classes.previousLinkClassName}
                        nextLinkClassName={classes.nextLinkClassName}
                        disabledLinkClassName={classes.disabledLinkClassName}
                        activeLinkClassName={classes.activeLinkClassName}
                        breakLinkClassName={classes.breakLinkClassName}
                    />
                ) : null}
            </div>
        </section>
    );
}

export default PokedexPage;
