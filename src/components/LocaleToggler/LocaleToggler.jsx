import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocale } from '../../redux/moviesSlice';


export default function LocaleToggler() {
	const dispatch = useDispatch();
	const {locale} = useSelector(state=>state.movies);

  const handleChange = (event, newAlignment) => {
    dispatch(changeLocale(newAlignment));
  };

  return (
    <ToggleButtonGroup
      color="standard"
      value={locale}
      exclusive
      onChange={handleChange}
			selected={true}
			sx={{backgroundColor:'#00a048', opacity: '.8',
			 display:'flex', justifyContent: 'flex-end'
}}
size='small'
    >
      <ToggleButton value="ru-RU">Ru</ToggleButton>
      <ToggleButton value="en-EN">En</ToggleButton>
    </ToggleButtonGroup>
  );
}