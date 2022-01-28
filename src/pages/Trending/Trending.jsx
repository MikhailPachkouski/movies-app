import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentElement from '../../components/ContentElement/ContentElement';
import BottomPagination from '../../components/Pagination/BottomPagination';
import { changeFavorites, changeNumberOfPages, fetchContent } from '../../redux/moviesSlice';
import './Trending.css'

const Trending = () => {
	const { content, page, numberOfPages } = useSelector(state => state.movies);
	const dispatch = useDispatch();

	const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	
	const handleClick = (movie) => {
		if (favorites.some(e=> e.id === movie.id)) {
			setFavorites(favorites?.filter((el) => el?.id !== movie?.id))
			dispatch(changeFavorites(JSON.parse(localStorage.getItem('favorites'))))
		} else {
			setFavorites([...favorites, movie])
			dispatch(changeFavorites(JSON.parse(localStorage.getItem('favorites'))))

	}}
	const checkFavorite = (movie) => {
		if (favorites.some(el => el.id === movie.id)) {
			return true
		} else return false
	}


	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=ru&page=${page}`
		);
		dispatch(fetchContent(data.results));
		dispatch(changeNumberOfPages(data.total_pages))
			console.log(content);
	};

	useEffect(() => {
		fetchTrending();
	}, [page]);

	return (
		<div>
			<div className='trending__title'>Популярное</div>
			<div className='trending__content'>
				{content &&
					content.map(el => (
						<ContentElement
							key={el.id}
							poster={el.poster_path}
							title={el.title}
							date={el.release_date}
							media_type={el.media_type}
							vote={el.vote_average}
							name={el.name}
							tvdate={el.first_air_date}
							movie={el}
							handleClick={handleClick}
							checkFavorite={checkFavorite}
							id={el.id}
						/>
					))}
			</div>
			{numberOfPages>1 && <BottomPagination/>}
		</div>
	);
};

export default Trending;
