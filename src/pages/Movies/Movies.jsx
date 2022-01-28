import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentElement from '../../components/ContentElement/ContentElement';
import Genres from '../../components/Genres/Genres';
import BottomPagination from '../../components/Pagination/BottomPagination';
import { changeFavorites, changeNumberOfPages, fetchContent } from '../../redux/moviesSlice';


const Movies = () => {
	const dispatch = useDispatch();
	const { content, page, selectedGenres } = useSelector(state => state.movies);
	let genreUrl = '';


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



	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrl}`
		);
		dispatch(fetchContent(data.results));
		dispatch(changeNumberOfPages(data.total_pages))
		console.log('movie content', content);
	};

	useEffect(() => {
		genreUrl = selectedGenres.map((g) =>  g.id).join(',')
	}, [page, selectedGenres])

	useEffect(() => {
		fetchMovies();
	}, [page, selectedGenres]);


	return <div>
		<div  className='trending__title'>
			Фильмы по жанрам
		</div>
		<Genres/>
		<div className='trending__content'>
				{content &&
					content.map(el => (
						<ContentElement
							key={el.id}
							poster={el.poster_path}
							title={el.title}
							date={el.release_date}
							media_type={el.media_type ? el.media_type : 'movie'}
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
			<BottomPagination/>
		</div>
	
};

export default Movies;
