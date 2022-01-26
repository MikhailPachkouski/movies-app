import React, { useEffect, useState } from 'react';
import {
	Button,
	createTheme,
	Input,
	Tab,
	Tabs,
	TextField,
} from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { Box } from '@mui/system';
import './Search.css';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumberOfPages, changePage, fetchContent } from '../../redux/moviesSlice';
import axios from 'axios';
import ContentElement from '../../components/ContentElement/ContentElement';
import BottomPagination from '../../components/Pagination/BottomPagination';

const Search = () => {
	const [type, setType] = useState(0);
	const [searchText, setSearchText] = useState('');

	const { content, page, numberOfPages } = useSelector(state => state.movies);
	const dispatch = useDispatch();

	const useStyles = makeStyles({
		root: {
			width: '90%',
			backgroundColor: '#262726',
			textAlign: 'center',
			color: 'whitesmoke',
		},
		wrap: {
			display: 'flex',
			justifyContent: 'center',
		},
	});
	const classes = useStyles();


	const fetchSearch = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=ru-RU&page=${page}&include_adult=false&query=${searchText}`
		);
		console.log('data', data);
		dispatch(fetchContent(data.results));
		dispatch(changeNumberOfPages(data.total_pages));
	};

	useEffect(() => {
		window.scroll(0,0)
		searchText && fetchSearch()
	}, [searchText])

	const handleChange = (text) => {
		setSearchText(text)
		if (text === '') {
			dispatch(fetchContent([]));
		dispatch(changeNumberOfPages(1));
		}
		console.log('text', text);
	}
	return (
		<div>
			<div className='trending__title'>Поиск</div>
			<div className='trending__content'>
				<TextField
				className={classes.root}
				fullWidth
					variant='outlined'
					color='success'
					focused
					inputProps={{
						style: {
							
						},
					}}
					onChange={(e)=>handleChange(e.target.value)}
				/>
				{/* <Button
					// onClick={fetchSearch}
					variant='contained'
					color='success'
					style={{ marginLeft: 10 }}
				>
					<SearchIcon fontSize='large' />
				</Button> */}
			</div>
			<Box fullWidth>
			<Tabs
				value={type}
				indicatorColor='primary'
				textColor='success'
				onChange={(event, newValue) => {
					console.log(newValue);
					setType(newValue);
					dispatch(changePage(1));
					dispatch(fetchContent([]));
		dispatch(changeNumberOfPages(1));
				}}
				style={{ paddingBottom: 5 }}
				aria-label='disabled tabs example'
				centered
			>
				<Tab style={{ width: '50%' }} label='Search Movies' />
				<Tab style={{ width: '50%' }} label='Search TV Series' />
			</Tabs>
			</Box>

			<div className='trending__content'>
				{searchText &&
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
			{numberOfPages>1 && <BottomPagination/>}
		</div>
	);
};

export default Search;
