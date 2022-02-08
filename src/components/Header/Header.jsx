import React from 'react';
import './Header.css';

const Header = () => {
	return (
		<div className='header__wrapper'>
			<span onClick={() => window.scroll(0, 0)} className='header'>
				The Movie Base
			</span>
		</div>
	);
};

export default Header;
