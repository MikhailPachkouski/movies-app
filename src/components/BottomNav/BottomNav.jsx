import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@mui/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from "@mui/icons-material/Search";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function SimpleBottomNavigation() {
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

	// const history = useHistory();

	React.useEffect(() => {
		if (value === 0) {
			navigate('/')
		} else if (value === 1) {
			navigate('/movies')
		} else if (value === 2) {
			navigate('/series')
		} else if (value === 3) {
			navigate('/search')
	}
 } , [value])

	return (
		<Box className={classes.wrap}>
			<BottomNavigation
				className={classes.root}
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
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
