import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentElement from '../../components/ContentElement/ContentElement';
import BottomPagination from '../../components/Pagination/BottomPagination';
import { fetchContent } from '../../redux/moviesSlice';
import './Trending.css'

const Trending = () => {
	const { content, page } = useSelector(state => state.movies);
	const dispatch = useDispatch();
	// let trendUrl = `3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=ru&page=${page}`
		);
		dispatch(fetchContent(data.results));
	};

	useEffect(() => {
		fetchTrending();
	}, [page]);

	return (
		<div>
			<div className='trending__title'>Trending</div>
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
						/>
					))}
			</div>
			<BottomPagination/>
		</div>
	);
};

export default Trending;
