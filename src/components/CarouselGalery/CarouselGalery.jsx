import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = e => e.preventDefault();

const CarouselGalery = ({ id }) => {
	const [dataGalery, setDataGalery] = useState();

	const fetchGalery = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setDataGalery(data.profiles);
  };

	useEffect(() => {
    fetchGalery();
    // eslint-disable-next-line
  }, []);


	const items = dataGalery?.slice(1).map((el, index) => (
		<div className='recommendationsItem' key={index}>
			<img
				onDragStart={handleDragStart}
				// onClick={() => handleSearch(el)}
				className='recommendationsItem__img'
				src={
					el.file_path ? `${process.env.REACT_APP_IMG_W300}/${el.file_path}` : `${process.env.REACT_APP_IMG_UNAVAILABLE}`
				}
				alt={el.vote_average}
			/>
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
			// autoPlay
			disableButtonsControls
			autoPlayInterval='3000'
		/>
	);
};

export default CarouselGalery;
