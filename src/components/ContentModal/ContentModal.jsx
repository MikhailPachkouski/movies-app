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
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useDispatch, useSelector } from 'react-redux';
import CarouselActors from '../CarouselActors/CarouselActors';
import { changeTypeContent } from '../../redux/moviesSlice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	boxShadow: 24,
	p: 4,
	width: '90%',
	height: '80%',
	backgroundColor: '#0b140f',
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
	const {locale} = useSelector(state=>state.movies);
	const [dataMovie, setDataMovie] = React.useState();
	const [dataVideo, setDataVideo] = React.useState();
	const [dataRecommedation, setDataRecommedation] = React.useState();

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(changeTypeContent(type==='movie' ? 1 : 0));
				// eslint-disable-next-line
	}, []);
	
	const handleOpen = () => {
		setOpen(true);
		fetchRecommedations();
		fetchVideo();
	};
	const handleClose = () => setOpen(false);

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}`
		);
		setDataMovie(data);
	};

	const fetchRecommedations = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${
				type
			}/${id}/recommendations?api_key=${
				process.env.REACT_APP_API_KEY
			}&language=${locale}&page=1`
		);

		setDataRecommedation(data);
	};

	const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}`
    );

    setDataVideo(data.results[0]?.key);
  };

	React.useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, [locale]);

	return (
		<>
		
			<div onClick={handleOpen} className='modal__wrapper'>
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
											? `${process.env.REACT_APP_IMG_W500}/${dataMovie.poster_path}`
											: `${process.env.REACT_APP_IMG_UNAVAILABLE}`
									}
									alt={dataMovie.name || dataMovie.title}
									className='movieModal__img__portrait'
								/>
								<img
									src={
										dataMovie.backdrop_path
											? `${process.env.REACT_APP_IMG_W500}/${dataMovie.backdrop_path}`
											: `${process.env.REACT_APP_IMG_UNAVAILABLE_LANDSCAPE}`
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
										variant='h5'
										component='h2'
										className='movieModal__title movieModal__text'
									>
										{dataMovie.name || dataMovie.title}
									</Typography>
									<i className='movieModal__tagline'>{dataMovie.tagline}</i>
									<Box>
										<p>
											<span className='movieModal__text'>{locale==='ru-RU' ? 'Дата выхода:' : 'Release date:'}{' '}</span>
											{dataMovie.release_date?.split('-').reverse().join('.') ||
												dataMovie.first_air_date
													?.split('-')
													.reverse()
													.join('.')}
										</p>
										<p>
										<span className='movieModal__text'>{locale==='ru-RU' ? 'Жанр:' : 'Genre:'}{' '}</span>
											{dataMovie.genres?.map(el => (
												<span key={el.id}>{el.name} </span>
											))}
										</p>
										<p>
										<span className='movieModal__text'>{locale==='ru-RU' ? 'Рейтинг IMDB:' : 'Rating IMDB:'}</span> {dataMovie?.vote_average} (
											{dataMovie?.vote_count})
										</p>
										<Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="success"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${dataVideo}`}
                  >
                    Watch the Trailer
                  </Button>
									<div style={{marginBottom: '10px', marginTop: '10px'}}>
										<span className='movieModal__text'>{locale==='ru-RU' ? 'Актерский состав: ' : 'Starring: '}</span>
										{dataMovie ? <CarouselActors type={type} id={dataMovie.id}/> : <span>{locale==='ru-RU' ? 'отсутствуют.' : 'not found.'}</span>}
									</div>
									</Box>
									<Box>
										<p className='movieModal__description'>
											{dataMovie?.overview}
										</p>
									</Box>
									<div style={{marginBottom: '10px'}}>
										<span className='movieModal__text'>{locale==='ru-RU' ? 'Рекомендации: ' : 'Recommendations: '}</span>
										{dataRecommedation?.results.length ? <Carousel dataRecommedation={dataRecommedation?.results} /> : <span>{locale==='ru-RU' ? 'отсутствуют.' : 'not found.'}</span>}
									</div>
									<Button
										color='success'
										variant='contained'
										onClick={handleClose}
									>
										{locale==='ru-RU' ? 'Закрыть' : 'Close'}
									</Button>
								</div>
							</div>
						</Box>

				</Fade>
			</Modal>}
		</>
	);
}
