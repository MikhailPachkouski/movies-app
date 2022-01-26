import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ContentElement.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';

const ContentElement = ({ poster, title, date, media_type, vote, name, tvdate, movie, handleClick, checkFavorite }) => {
	const img_w300 = 'https://image.tmdb.org/t/p/w300';
	const unavailableImage = "https://www.movienewz.com/img/films/poster-holder.jpg";
	const {favorites} = useSelector(state => state.movies)

	const [isFavorite, setIsFavorite] = useState(false);
	// const checkFavorite = (movie) => {
	// 	if (favorites.some(el => el.id === movie.id)) {
	// 		return true
	// 	} else return false
	// }

	useEffect(() => {
		console.log(favorites);
		// setFavorites(JSON.parse(localStorage.getItem('favorites')))
		setIsFavorite(checkFavorite(movie))
		console.log(isFavorite);
	}, [favorites])
	

	return (
		<div className='contentBlock'>
		<Badge color={vote>=7 ? 'success' : 'secondary'} badgeContent={vote}/>
			<img className='contentBlock__poster' src={poster ? `${img_w300}${poster}` : unavailableImage} alt={title} />
			<strong className='contentBlock__title'>{title || name}</strong>
			<div className='contentBlock__subtitle__wrapper'>
			<span className='contentBlock__subTitle'>
				{/* {media_type === 'tv' ? 'Сериал' : 'Фильм'} */}
				{/* <StarBorderIcon onClick={() => handleClick(movie)}/> */}
				{isFavorite ? <StarIcon color='success' onClick={() => handleClick(movie)}/> : <StarBorderIcon onClick={() => handleClick(movie)}/>} 
			</span>
				<span className='contentBlock__subTitle'>{date || tvdate}</span>
				</div>
		</div>
	);
};

export default ContentElement;
