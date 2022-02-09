import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeSearchText, changeTypeContent, changeValueNavBar } from '../../redux/moviesSlice';

const handleDragStart = e => e.preventDefault();

const CarouselCredits = ({ id }) => {
	const {locale} = useSelector(state=>state.movies);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [dataCredits, setDataCredits] = useState();

	const handleSearch = el => {
		navigate('/search');
		dispatch(changeSearchText(el.title || el.name));
		dispatch(changeTypeContent(el.media_type === 'movie' ? 0 : 1));
		dispatch(changeValueNavBar(4));
	};

	const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}`
    );
    setDataCredits(data.cast);
  };

	useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);


	const items = dataCredits?.map((el) => (
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
			items: 7,
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

export default CarouselCredits;
