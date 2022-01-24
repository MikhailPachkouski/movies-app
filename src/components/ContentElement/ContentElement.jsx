import { Badge } from '@mui/material';
import React from 'react';
import './ContentElement.css';

const ContentElement = ({ poster, title, date, media_type, vote }) => {
	const img_300 = 'https://image.tmdb.org/t/p/w300';

	return (
		<div className='contentBlock'>
		<Badge color={vote>=7 ? 'success' : 'secondary'} badgeContent={vote}/>
			<img className='contentBlock__poster' src={`${img_300}${poster}`} alt={title} />
			<strong className='contentBlock__title'>{title}</strong>
			<span className='contentBlock__subTitle'>
				{media_type === 'tv' ? 'TV Series' : 'Movie'}
				<span className='contentBlock__subTitle'>{date}</span>
			</span>
			
		</div>
	);
};

export default ContentElement;
