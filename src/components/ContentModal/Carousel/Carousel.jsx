import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	changeSearchText,
	changeTypeContent,
	changeValueNavBar,
} from '../../../redux/moviesSlice';
import './Carousel.css';

const handleDragStart = e => e.preventDefault();

const Carousel = ({ dataRecommedation }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSearch = el => {
		navigate('/search');
		dispatch(changeSearchText(el.title || el.name));
		dispatch(changeTypeContent(el.media_type === 'movie' ? 0 : 1));
		dispatch(changeValueNavBar(4));
	};

	const items = dataRecommedation?.map(el => (
		<div className='recommendationsItem' key={el.id}>
			<img
				onDragStart={handleDragStart}
				onClick={() => handleSearch(el)}
				className='recommendationsItem__img'
				src={
					el.poster_path ? `${process.env.REACT_APP_IMG_W300}/${el.poster_path}` : `${process.env.REACT_APP_IMG_UNAVAILABLE}`
				}
				alt={el.title || el.name}
			/>
			<p>{el.title || el.name}</p>
		</div>
	));

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 5,
		},
	};

	return (
		<AliceCarousel
			responsive={responsive}
			mouseTracking
			items={items}
			infinite
			disableDotsControls
			autoPlay
			disableButtonsControls
			autoPlayInterval='1200'
		/>
	);
};

export default Carousel;
