import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../../../constant/constant';
import Loading from '../../Loading/Loading';
import classes from './PokemonPage.module.scss';

function PokemonPage(props) {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const id = params.id;

  const [pokemon, setPokemon] = useState({
    imgUrl: '',
    id: '',
    name: '',
    height: '',
    weight: '',
    description: '',
    stats: [
      { infoIndex: '', name: '' },
      { infoIndex: '', name: '' },
      { infoIndex: '', name: '' },
      { infoIndex: '', name: '' },
      { infoIndex: '', name: '' },
      { infoIndex: '', name: '' },
    ],
    types: [],
    eggsGroup: [],
    abilities: [],
  });

  useEffect(() => {
    const pokemonUrls = [
      `${API_BASE}pokemon/${id}`,
      `${API_BASE}pokemon-species/${id}`,
    ];
    const fetchAll = async urls => {
      setIsLoading(true);

      const res = await Promise.all(urls.map(u => fetch(u)));
      const [pokemonData, pokemonSpecies] = await Promise.all(
        res.map(r => r.json())
      );

      const eggGroups = pokemonSpecies.egg_groups.map(egg => egg.name);

      const types = pokemonData.types.map(type => type.type.name);

      let description = '';
      pokemonSpecies.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
        }
      });

      console.log(pokemonData.types, pokemonSpecies);

      let [hp, attack, defense, specialAttack, specialDefense, speed] = '';

      const abilities = pokemonData.abilities.map(
        ability => ability.ability.name
      );

      pokemonData.stats.forEach(stat => {
        switch (stat.stat.name) {
          case 'hp':
            hp = stat['base_stat'];
            break;
          case 'attack':
            attack = stat['base_stat'];
            break;
          case 'defense':
            defense = stat['base_stat'];
            break;
          case 'special-attack':
            specialAttack = stat['base_stat'];
            break;
          case 'special-defense':
            specialDefense = stat['base_stat'];
            break;
          case 'speed':
            speed = stat['base_stat'];
            break;
          default:
            break;
        }
      });
      setPokemon({
        imgUrl: pokemonData.sprites.front_default,
        id: pokemonData.id,
        name: pokemonData.name,
        height: Math.round(pokemonData.height * 10),
        weight: Math.round(pokemonData.weight / 10),
        description: description,
        stats: [
          { infoIndex: hp, name: 'hp' },
          { infoIndex: attack, name: 'attack' },
          { infoIndex: defense, name: 'defense' },
          { infoIndex: specialAttack, name: 'special-attack' },
          { infoIndex: specialDefense, name: 'special-defense' },
          { infoIndex: speed, name: 'speed' },
        ],
        types: types,
        eggsGroup: eggGroups,
        abilities,
      });

      setIsLoading(false);
    };

    fetchAll(pokemonUrls);
  }, [id]);

  return (
    <section className={classes.pokemonPage}>
      {isLoading ? (
        <Loading className={classes.loading} />
      ) : (
        <React.Fragment>
          <div className="container">
            <div className={classes.container}>
              <div className={classes.header}>
                <span className={classes.id}>{pokemon.id}</span>
                <div className={classes.types}>
                  {pokemon.types.map(type => {
                    return (
                      <div key={type} className={`${classes.type} ${type}`}>
                        {type}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={classes.content}>
                <div className={classes.img}>
                  <img src={pokemon.imgUrl} alt={pokemon.name} />
                </div>
                <div>
                  <span className={classes.name}>{pokemon.name}</span>
                  <div style={{ marginBottom: '2rem	' }}>
                    {pokemon.stats.map(stat => {
                      return (
                        <div
                          className={classes.progressContainer}
                          key={`${pokemon.name}${stat.name} ${Math.random()}`}
                        >
                          <span
                            style={{
                              textTransform: 'capitalize',
                              marginBottom: '0.5rem',
                              display: 'block',
                              fontSize: '1.8rem',
                              fontWeight: '500',
                            }}
                          >
                            {stat.name.replace('-', ' ')}
                          </span>
                          <div
                            className={`${stat.name} ${classes.progressBar}`}
                            style={{
                              width: `${
                                stat.infoIndex > 100
                                  ? '100%'
                                  : (stat.infoIndex / 100) * 100
                              }%`,
                            }}
                          >
                            <small
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                              }}
                            >
                              {stat.infoIndex}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className={classes.desc}>{pokemon.description}</p>
                </div>
              </div>
              <div className={classes.profile}>
                <div>
                  <span className={classes.name}>Height</span>
                  <span>{pokemon.height} cm</span>
                </div>
                <div>
                  <span className={classes.name}>Height</span>
                  <span>{pokemon.weight} kg</span>
                </div>
                <div>
                  <span className={classes.name}>eggs group</span>
                  <div>
                    {pokemon.eggsGroup.map(egg => {
                      return <span key={egg}>{egg}</span>;
                    })}
                  </div>
                </div>
                <div>
                  <span className={classes.name}>Abilities</span>
                  <div>
                    {pokemon.abilities.map(ability => {
                      return <span key={ability}>{ability}</span>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
}

export default PokemonPage;
