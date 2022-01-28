import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ContentModal.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Zoom } from '@mui/material';
// import '../ContentElement/ContentElement.css';


const style = {
	width: '90%',
	height: '80%',
	backgroundColor: '#0b140f',
	border: '1px solid #282c34',
	borderRadius: 10,
	color: 'white',
  padding: '10px',
	// boxShadow: shadows[5],
	// padding: spacing(1, 1, 3),
};

export default function ContentModal({ children, type, id }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [dataMovie, setDataMovie] = React.useState();

	const img_w500 = 'https://image.tmdb.org/t/p/w500';
	const unavailableImage =
		'https://www.movienewz.com/img/films/poster-holder.jpg';
	const unavailableImageLandscape =
		'https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg';

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ru-RU`
		);

		setDataMovie(data);
		console.log(data);
	};

	React.useEffect(() => {
		fetchData();
		// fetchVideo();
		// eslint-disable-next-line
	}, [open]);

	return (
		<div>
			<div onClick={handleOpen} className='contentBlock'>
				{children}
			</div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				className='modal'
        PaperProps={{
    style: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      opacity: 0,
      color: 'red'
    }}}
			>
				<Fade in={open}>
					{dataMovie && (
						<Box sx={style}>
							<div className='movieModal'>
								<img
									src={
										dataMovie.poster_path
											? `${img_w500}/${dataMovie.poster_path}`
											: unavailableImage
									}
									alt={dataMovie.name || dataMovie.title}
									className='movieModal__img__portrait'
								/>
								<img
									src={
										dataMovie.backdrop_path
											? `${img_w500}/${dataMovie.backdrop_path}`
											: unavailableImageLandscape
									}
									alt={dataMovie.name || dataMovie.title}
									className='movieModal__img__landscape'
								/>
								<div className='movieModal__about'>
									<Typography
										id='transition-modal-title'
										variant='h6'
										component='h2'
                    className='movieModal__title'
									>
										{dataMovie.name || dataMovie.title}
									</Typography>
									{dataMovie.tagline && (
										<i className='movieModal__tagline'>{dataMovie.tagline}</i>
									)}
                  <p className="movieModal__description">
                    {dataMovie?.overview}
                  </p>
								</div>
							</div>
						</Box>
					)}

					{/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
				</Fade>
			</Modal>
		</div>
	);
}
