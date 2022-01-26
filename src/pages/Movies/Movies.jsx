import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentElement from '../../components/ContentElement/ContentElement';
import Genres from '../../components/Genres/Genres';
import BottomPagination from '../../components/Pagination/BottomPagination';
import { changeNumberOfPages, fetchContent } from '../../redux/moviesSlice';


const Movies = () => {
	const dispatch = useDispatch();
	const { content, page, selectedGenres } = useSelector(state => state.movies);
	let genreUrl = '';

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrl}`
		);
		dispatch(fetchContent(data.results));
		dispatch(changeNumberOfPages(data.total_pages))
	};
	useEffect(() => {
		genreUrl = selectedGenres.map((g) =>  g.id).join(',')
	}, [page, selectedGenres])

	useEffect(() => {
		fetchMovies();
		console.log('movies content', content);
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
							media_type={el.media_type}
							vote={el.vote_average}
							name={el.name}
							tvdate={el.first_air_date}
							movie={el}
						/>
					))}
			</div>
			<BottomPagination/>
		</div>
	
};

export default Movies;
