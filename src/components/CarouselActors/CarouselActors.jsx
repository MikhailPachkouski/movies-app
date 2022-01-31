import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./CarouselActors.css";
import { useSelector } from 'react-redux';


const handleDragStart = (e) => e.preventDefault();

const CarouselActors = ({ id, type }) => {
  const [actors, setActors] = useState([]);
	const {locale} = useSelector(state=>state.movies);


	const img_w300 = 'https://image.tmdb.org/t/p/w300';
	const unavailableImage =
		'https://www.movienewz.com/img/films/poster-holder.jpg';

  const items = actors.map((el) => (
    <div className="actorslItem">
      <img
        src={el.profile_path ? `${img_w300}/${el.profile_path}` : unavailableImage}
        alt={el?.name}
        onDragStart={handleDragStart}
        className="actorslItem__img"
      />
      <p>{el?.name}</p>
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

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}`
    );
    setActors(data.cast);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      // autoPlay
			autoPlayInterval='2000'
    />
  );
};

export default CarouselActors;
