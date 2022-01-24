import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import './Header.css';

const Header = () => {
	return (
		<div className='header__wrapper'>
		<span onClick={() => window.scroll(0, 0)} className="header">
      The Movie Base
    </span>

		</div>
		
		// <Box className='header'>
		// 	<Typography>The Movie Base</Typography>
		// </Box>
		
	);
};

export default Header;
