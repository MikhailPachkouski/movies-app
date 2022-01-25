import { Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedGenres, changePage, getGenres, removeSelectedGenres } from '../../redux/moviesSlice';

const Genres = () => {
	const dispatch = useDispatch();
	const { genres, selectedGenres } = useSelector(state => state.movies);

	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=ru-RU`
		);
		dispatch(getGenres(data.genres));

	};

	useEffect(() => {
		fetchGenres();

		return () => {
			dispatch(getGenres({}))
		}
	}, []);

	const handleClick = genre => {
		dispatch(addSelectedGenres(genre))
		dispatch(getGenres(genres.filter((g) => g.id !== genre.id))) 
		dispatch(changePage(1))
	}

	const handleDelete = genre => {
		dispatch(removeSelectedGenres(genre))
		dispatch(getGenres([...genres, genre])) 
		dispatch(changePage(1))

	}

	return <div style={{marginTop: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
	{selectedGenres && selectedGenres.map(genre => 
	<Chip
	style={{ margin: 2 }}
  label={genre.name}
	// variant="outlined"
	clickable
	color="info"
  onDelete={() => handleDelete(genre)}
	key={genre.id}
  // onDelete={handleDelete}
  // deleteIcon={<DeleteIcon />}
/>)}
	{genres && genres.map(genre => 
	<Chip
	style={{ margin: 2 }}
  label={genre.name}
	// variant="outlined"
	clickable
	color="success"
  onClick={() => handleClick(genre)}
	key={genre.id}
  // onDelete={handleDelete}
  // deleteIcon={<DoneIcon />}
/>)}

	</div>;
};

export default Genres;
