import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ContentElement.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';

const ContentElement = ({ poster, title, date, media_type, vote, name, tvdate, movie }) => {
	const img_300 = 'https://image.tmdb.org/t/p/w300';
	const {content} = useSelector(state => state.movies)

	const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	const handleClick = (movie) => {
		if (favorites.includes(movie)) {
			console.log();
			setFavorites(favorites?.filter((el) => el?.id !== movie?.id))
		} else {
			setFavorites([...favorites, movie])
		}
		// return favorites
	}

	return (
		<div className='contentBlock'>
		<Badge color={vote>=7 ? 'success' : 'secondary'} badgeContent={vote}/>
			<img className='contentBlock__poster' src={`${img_300}${poster}`} alt={title} />
			<strong className='contentBlock__title'>{title || name}</strong>
			<div className='contentBlock__subtitle__wrapper'>
			<span className='contentBlock__subTitle'>
				{/* {media_type === 'tv' ? 'Сериал' : 'Фильм'} */}
				<StarBorderIcon onClick={() => handleClick(movie)}/>
			</span>
				<span className='contentBlock__subTitle'>{date || tvdate}</span>
				</div>
		</div>
	);
};

export default ContentElement;
