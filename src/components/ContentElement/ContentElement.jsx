import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ContentElement.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import ContentModal from '../ContentModal/ContentModal';
import { Link } from 'react-router-dom';

const ContentElement = ({ poster, title, date, media_type, vote, name, tvdate, movie, handleClick, checkFavorite, id }) => {
	const img_w300 = 'https://image.tmdb.org/t/p/w300';
	const unavailableImage = "https://www.movienewz.com/img/films/poster-holder.jpg";
	const {favorites} = useSelector(state => state.movies)

	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setIsFavorite(checkFavorite(movie))
				// eslint-disable-next-line
	}, [favorites])
	

	return (
		<>
		<div className='contentBlock'>
		<Badge color={vote>=7 ? 'success' : 'secondary'} badgeContent={vote}/>

		<ContentModal type={media_type} id={id} isFavorite={isFavorite} handleClick={handleClick} movie={movie}>
			<img className='contentBlock__poster' src={poster ? `${img_w300}${poster}` : unavailableImage} alt={title} />
		</ContentModal>

			<Link to={`/${media_type}/${id}`} className='contentBlock__title'>
			<strong className='contentBlock__title'>{title || name}</strong>
			</Link>
			<div className='contentBlock__subtitle__wrapper'>
			<span className='contentBlock__subTitle'>
				{isFavorite ? <StarIcon color='success' onClick={() => handleClick(movie)}/> : <StarBorderIcon onClick={() => handleClick(movie)}/>} 
			</span>
				<span className='contentBlock__subTitle'>{date?.split('-').reverse().join('.') || tvdate?.split('-').reverse().join('.')}</span>
				</div>
				</div>
		</>
	);
};

export default ContentElement;
