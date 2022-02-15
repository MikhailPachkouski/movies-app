import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = e => e.preventDefault();

const CarouselImg = ({ type, id }) => {
    const [dataGalery, setDataGalery] = useState();

    const fetchGalery = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setDataGalery(data.backdrops);
    };

    useEffect(() => {
        fetchGalery();
        // eslint-disable-next-line
    }, []);


    const items = dataGalery?.map((el, index) => (
        <div className='recommendationsItem' key={index}>
            <img
                onDragStart={handleDragStart}
                // onClick={() => handleSearch(el)}
                className='recommendationsItem__img'
                src={
                    el.file_path ? `${process.env.REACT_APP_IMG_W500}/${el.file_path}` : `${process.env.REACT_APP_IMG_UNAVAILABLE}`
                }
                alt={el.vote_average}
            />
        </div>
    ));

    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 2,
        },
        1024: {
            items: 2,
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
            autoPlayInterval='5000'
        />
    );
};

export default CarouselImg;
