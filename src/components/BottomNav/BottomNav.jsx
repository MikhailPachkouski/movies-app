import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@mui/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { changeNumberOfPages, changePage, changeSearchText, changeTypeContent, changeValueNavBar, fetchContent, getGenres } from '../../redux/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function SimpleBottomNavigation() {
	const dispatch = useDispatch();

	const useStyles = makeStyles({
		root: {
			width: '95%',
			position: 'fixed',
			bottom: 0,
			backgroundColor: '#262726',
			zIndex: 100,
			borderRadius: '10px 10px 0 0',
		},
		wrap: {
			display: 'flex',
			justifyContent: 'center',
		},
	});

	const classes = useStyles();
	const {valueNavBar, locale} = useSelector(state=> state.movies)
	const navigate = useNavigate()

	const clearState = () => {
		dispatch(fetchContent([]));
		dispatch(changeNumberOfPages(1));
		dispatch(changePage(1))
		dispatch(getGenres([]))
		dispatch(changeTypeContent(0))
		dispatch(changeSearchText(''))
	}

	useEffect(() => {
		if (valueNavBar === 0) {
			navigate('/')
			clearState()
		} else if (valueNavBar === 1) {
			navigate('/movies')
			clearState()
		} else if (valueNavBar === 2) {
			navigate('/series')
			clearState()
		} else if (valueNavBar === 3) {
			navigate('/favorites')
		} else if (valueNavBar === 4) {
			navigate('/search')
			dispatch(changeNumberOfPages(1));
		dispatch(changePage(1))
		dispatch(getGenres([]))
	}
	   // eslint-disable-next-line
 } , [valueNavBar])

	return (
		<Box className={classes.wrap}>
			<BottomNavigation
				className={classes.root}
				showLabels
				value={valueNavBar}
				onChange={(event, newValue) => {
					window.scroll(0,0);
					dispatch(changeValueNavBar(newValue))
				}}
			>
				<BottomNavigationAction
					label={locale==='ru-RU' ? 'Тренды' : 'Trending'}
					style={{ color: '#00d167', }}
					icon={<WhatshotIcon />}
				/>
				<BottomNavigationAction
					style={{ color: '#00d167' }}
					label={locale==='ru-RU' ? 'Фильмы' : 'Movies'}
        icon={<MovieIcon />}
				/>
				<BottomNavigationAction
					style={{ color: '#00d167' }}
					label={locale==='ru-RU' ? 'Сериалы' : 'Series'}
        icon={<MovieIcon />}
				/>
         <BottomNavigationAction
        style={{ color: "#00d167" }}
        label={locale==='ru-RU' ? 'Избранное' : 'Favorites'}
        icon={<StarIcon />}
      />
				<BottomNavigationAction
					style={{ color: '#00d167' }}
					label={locale==='ru-RU' ? 'Поиск' : 'Search'}
        icon={<SearchIcon />}
				/>
			</BottomNavigation>
		</Box>
	);
}
