import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ContentElement.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import ContentModal from '../ContentModal/ContentModal';
import { Link } from 'react-router-dom';

const ContentElement = ({
	poster,
	title,
	date,
	media_type,
	vote,
	name,
	tvdate,
	movie,
	handleClick,
	checkFavorite,
	id,
}) => {
	const { favorites } = useSelector(state => state.movies);

	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setIsFavorite(checkFavorite(movie));
		// eslint-disable-next-line
	}, [favorites]);

	return (
		<>
			<div className='contentBlock'>
				<Badge
					color={vote >= 7 ? 'success' : 'secondary'}
					badgeContent={vote}
				/>
				<Link to={`/${media_type}/${id}`}>
					<img
						className='contentBlock__poster'
						src={
							poster
								? `${process.env.REACT_APP_IMG_W300}${poster}`
								: `${process.env.REACT_APP_IMG_UNAVAILABLE}`
						}
						alt={title}
					/>
				</Link>
				<ContentModal
					type={media_type}
					id={id}
					isFavorite={isFavorite}
					handleClick={handleClick}
					movie={movie}
				>
					{/* <img
						className='contentBlock__poster'
						src={poster ? `${process.env.REACT_APP_IMG_W300}${poster}` : `${process.env.REACT_APP_IMG_UNAVAILABLE}`}
						alt={title}
					/> */}
					<div className='contentBlock__title'>
						<div className=''>{title || name}</div>
					</div>
				</ContentModal>

				{/* <Link to={`/${media_type}/${id}`} className='contentBlock__title'>
					<div className=''>{title || name}</div>
				</Link> */}
				<div className='contentBlock__subtitle__wrapper'>
					<span className='contentBlock__subTitle'>
						{isFavorite ? (
							<StarIcon color='success' onClick={() => handleClick(movie)} />
						) : (
							<StarBorderIcon onClick={() => handleClick(movie)} />
						)}
					</span>
					<span className='contentBlock__subTitle'>
						{date?.split('-').reverse().join('.') ||
							tvdate?.split('-').reverse().join('.')}
					</span>
				</div>
			</div>
		</>
	);
};

export default ContentElement;
