import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './ContentModal.css';
import Carousel from './Carousel/Carousel';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	// width: 400,
	// bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	width: '90%',
	height: '80%',
	backgroundColor: '#0b140f',
	// border: '1px solid #282c34',
	borderRadius: 5,
	color: 'white',
	padding: '10px',
	outline: '1px solid #00a048',
};

export default function ContentModal({
	children,
	type,
	id,
	isFavorite,
	handleClick,
	movie,
}) {
	const [open, setOpen] = React.useState(false);

	const [dataMovie, setDataMovie] = React.useState();
	const [dataRecommedation, setDataRecommedation] = React.useState();

	const img_w500 = 'https://image.tmdb.org/t/p/w500';
	const unavailableImage =
		'https://www.movienewz.com/img/films/poster-holder.jpg';
	const unavailableImageLandscape =
		'https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg';

	const handleOpen = () => {
		setOpen(true);
		fetchRecommedations();
	};
	const handleClose = () => setOpen(false);

	const fetchData = async () => {
		type = type ==='tv' ? type : 'movie'
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ru-RU`
		);

		setDataMovie(data);
	};

	const fetchRecommedations = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${
				type === 'movie' ? 'movie' : 'tv'
			}/${id}/recommendations?api_key=${
				process.env.REACT_APP_API_KEY
			}&language=ru-RU&page=1`
		);

		setDataRecommedation(data);
	};

	React.useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	return (
		<>
		
			<div onClick={handleOpen} className='modal__wrapper'>
				{/* </div> className='contentBlock'> */}
				{children}
			</div>
			{dataMovie && 
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
			>
				<Fade in={open}>
					{/* {dataMovie && (
						
					)} */}
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

								{isFavorite ? (
									<StarIcon
										className='movieModal__star'
										color='success'
										onClick={() => handleClick(movie)}
									/>
								) : (
									<StarBorderIcon
										className='movieModal__star'
										onClick={() => handleClick(movie)}
									/>
								)}
								<div className='movieModal__about'>
									<Typography
										id='transition-modal-title'
										variant='h6'
										component='h2'
										className='movieModal__title movieModal__text'
									>
										{dataMovie.name || dataMovie.title}
									</Typography>
									<i className='movieModal__tagline'>{dataMovie.tagline}</i>
									{/* {dataMovie.tagline && (
										<i className='movieModal__tagline'>{dataMovie.tagline}</i>
									)} */}
									<Box>
										<p>
											<span className='movieModal__text'>Дата выхода:{' '}</span>
											{dataMovie.release_date?.split('-').reverse().join('.') ||
												dataMovie.first_air_date
													?.split('-')
													.reverse()
													.join('.')}
										</p>
										<p>
										<span className='movieModal__text'>Жанр:{' '}</span>
											{dataMovie.genres?.map(el => (
												<span key={el.id}>{el.name} </span>
											))}
										</p>
										<p>
										<span className='movieModal__text'>Рейтинг IMDB:</span> {dataMovie?.vote_average} (
											{dataMovie?.vote_count})
										</p>
									</Box>
									<Box>
										<p className='movieModal__description'>
											{dataMovie?.overview}
										</p>
									</Box>
									<div style={{marginBottom: '10px'}}>
										<span className='movieModal__text'>Рекомендации: </span>
										{dataRecommedation?.results.length ? <Carousel dataRecommedation={dataRecommedation?.results} /> : <span>отсутствуют.</span>}
									</div>
									<Button
										color='success'
										variant='contained'
										onClick={handleClose}
									>
										Закрыть
									</Button>
								</div>
							</div>
						</Box>

					{/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
				</Fade>
			</Modal>}
		</>
	);
}
