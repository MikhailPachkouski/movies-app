import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector} from 'react-redux';
import { changePage } from '../../redux/moviesSlice';
import { createTheme, ThemeProvider } from '@mui/material';


const BottomPagination = () => {
	const dispatch = useDispatch();
	const { numberOfPages } = useSelector(state => state.movies);


	const theme = createTheme({
		palette: {
			mode: 'dark'
		}
	})

const handleChange = page => {
	window.scroll(0,0);
	dispatch(changePage(page));
}

	return (
		<div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px', color: 'white'}}>
		<ThemeProvider theme={theme}>
			<Pagination 
			sx={{ color: 'text.secondary' }} count={numberOfPages} shape='rounded' color='success' onChange={e => handleChange(e.target.textContent)}/>
			</ThemeProvider>
		</div>
	);
};

export default BottomPagination;
