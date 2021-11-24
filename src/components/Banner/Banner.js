import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Banner.module.scss';
import BannerImg from '../../asset/img/BannerComplete.svg';
import Button from '../Button/Button';

function Banner() {
    const [imgLoading, setImgLoading] = useState(true);
    const navigate = useNavigate();
    const gotoPageHandler = () => {
        navigate('/Pokedex');
    };

    return (
        <section className={classes.banner}>
            <div className="container">
                <div className={classes.container}>
                    <div className={classes.content}>
                        <h1 className={classes.title}>
                            <span>Find </span>
                            all your favorite
                            <span> Pokemon</span>
                        </h1>

                        <p className={classes.text}>
                            You can know the type of Pokemon, its strengths,
                            disadvantages and abilities
                        </p>
                        <Button onClick={gotoPageHandler}>See Pokemons</Button>
                    </div>

                    <div className={classes.img}>
                        <img
                            src={BannerImg}
                            alt="banner-img"
                            onLoad={() => setImgLoading(false)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;
