import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@mui/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { changeNumberOfPages, fetchContent } from '../../redux/moviesSlice';
import { useDispatch } from 'react-redux';


export default function SimpleBottomNavigation() {
	const dispatch = useDispatch();

	const useStyles = makeStyles({
		root: {
			width: '90%',
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
	const [value, setValue] = React.useState(0);
	const navigate = useNavigate()

	useEffect(() => {
		if (value === 0) {
			navigate('/')
		} else if (value === 1) {
			navigate('/movies')
		} else if (value === 2) {
			navigate('/series')
		} else if (value === 3) {
			navigate('/search')
		dispatch(fetchContent([]));
		dispatch(changeNumberOfPages(1));

			
	}
 } , [value])

	return (
		<Box className={classes.wrap}>
			<BottomNavigation
				className={classes.root}
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue)
					window.scroll(0,0);
				}}
			>
				<BottomNavigationAction
					label='Trending'
					style={{ color: '#00d167' }}
					icon={<WhatshotIcon />}
				/>
				<BottomNavigationAction
					style={{ color: '#00d167' }}
					label="Movies"
        icon={<MovieIcon />}
				/>
         <BottomNavigationAction
        style={{ color: "#00d167" }}
        label="TV Series"
        icon={<TvIcon />}
      />
				<BottomNavigationAction
					style={{ color: '#00d167' }}
					label="Search"
        icon={<SearchIcon />}
				/>
			</BottomNavigation>
		</Box>
	);
}
