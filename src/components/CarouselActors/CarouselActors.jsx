import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./CarouselActors.css";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


const handleDragStart = (e) => e.preventDefault();

const CarouselActors = ({ id, type }) => {
  const [actors, setActors] = useState([]);
	const {locale} = useSelector(state=>state.movies);

  const items = actors.map((el) => (
    <>
    <Link to={`/person/${el.id}`} style={{ textDecoration: 'none' }}>
    <div className="actorslItem">
      <img
        src={el.profile_path ? `${process.env.REACT_APP_IMG_W300}/${el.profile_path}` : `${process.env.REACT_APP_IMG_UNAVAILABLE}`}
        alt={el?.name}
        onDragStart={handleDragStart}
        className="actorslItem__img"
      />
      <p>{el?.name}</p>
    </div>
    </Link>
    </>
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
    console.log(data);
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
