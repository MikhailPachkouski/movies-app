import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ContentElement from '../../components/ContentElement/ContentElement';
import LocaleToggler from '../../components/LocaleToggler/LocaleToggler';

const Favorites = () => {
	const {locale} = useSelector(state=>state.movies)
	const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	
	const handleClick = (movie) => {
		if (favorites.some(e=> e.id === movie.id)) {
			setFavorites(favorites?.filter((el) => el?.id !== movie?.id))
		} else {
			setFavorites([...favorites, movie])
	}}
	const checkFavorite = (movie) => {
		if (favorites.some(el => el.id === movie.id)) {
			return true
		} else return false
	}

	return <div>
		
		<div className='trending__title'>{locale==='ru-RU' ? 'Избранное' : 'Favorites'}</div>
		<div className='locale__wrapper'><LocaleToggler/></div>

			<div className='trending__content'>
				{favorites &&
					favorites.map(el => (
						<ContentElement
							key={el.id}
							poster={el.poster_path}
							title={el.title}
							date={el.release_date}
							media_type={el.media_type}
							vote={el.vote_average}
							name={el.name}
							tvdate={el.first_air_date}
							movie={el}
							handleClick={handleClick}
							checkFavorite={checkFavorite}
							id={el.id}

						/>
					))}
			</div>
				</div>;
};

export default Favorites;
