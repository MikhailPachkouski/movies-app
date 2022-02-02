import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import '../../components/ContentModal/ContentModal.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CarouselActors from '../../components/CarouselActors/CarouselActors';
import Carousel from '../../components/ContentModal/Carousel/Carousel';
import { changeFavorites, changeValueNavBar } from '../../redux/moviesSlice';

const MoviePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { locale } = useSelector(state => state.movies);
	const [dataMovie, setDataMovie] = useState();
	const [dataVideo, setDataVideo] = useState();
	const [dataRecommedation, setDataRecommedation] = useState();
	const [favorites, setFavorites] = useState(
		JSON.parse(localStorage.getItem('favorites')) || []
	);
	const [isFavorite, setIsFavorite] = useState(false);

	const { type, id } = useParams();


	const img_w500 = 'https://image.tmdb.org/t/p/w500';
	const unavailableImage =
		'https://www.movienewz.com/img/films/poster-holder.jpg';
	const unavailableImageLandscape =
		'https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg';


	const checkFavorite = movie => {
		if (favorites.some(el => el.id === movie?.id)) {
			return true;
		} else return false;
	};

	const handleClick = movie => {
		if (favorites.some(e => e.id === movie.id)) {
			setFavorites(favorites?.filter(el => el?.id !== movie?.id));
			dispatch(changeFavorites(JSON.parse(localStorage.getItem('favorites'))));
		} else {
			setFavorites([...favorites, movie]);
			dispatch(changeFavorites(JSON.parse(localStorage.getItem('favorites'))));
		}
	};

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}`
		);
		setIsFavorite(checkFavorite(data))
		setDataMovie(data);
	};

	const fetchRecommedations = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}&page=1`
		);
		setDataRecommedation(data);
	};

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}`
		);
		setDataVideo(data.results[0]?.key);
	};

	const handleBack = () => {
		navigate(-1)
	}
	
		useEffect(() => {
			window.scroll(0, 0);
			fetchData();
			fetchRecommedations();
			fetchVideo();
			dispatch(changeValueNavBar(5))
			console.log(dataMovie);
		}, []);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, [locale]);
	
	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
		// setIsFavorite(checkFavorite(dataMovie));
		// eslint-disable-next-line
	}, [favorites]);

	useEffect(() => {
		setIsFavorite(checkFavorite(dataMovie))
				// eslint-disable-next-line
	}, [favorites])


	return (
		<>
			{dataMovie && (
				<Box>
					<div className='movieModal'>
					<div className='movieModal__img'>
						<img
							src={
								dataMovie.poster_path
									? `${img_w500}/${dataMovie.poster_path}`
									: unavailableImage
							}
							alt={dataMovie.name || dataMovie.title}
							className='moviePage__img__portrait'
						/>
						<img
							src={
								dataMovie.backdrop_path
									? `${img_w500}/${dataMovie.backdrop_path}`
									: unavailableImageLandscape
							}
							alt={dataMovie.name || dataMovie.title}
							className='moviePage__img__landscape'
						/>
						</div>
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
							{/* {dataMovie.tagline && (
										<i className='movieModal__tagline'>{dataMovie.tagline}</i>
									)} */}
							<Box>
								<p>
									<span className='movieModal__text'>
										{locale === 'ru-RU' ? 'Дата выхода:' : 'Release date:'}{' '}
									</span>
									{dataMovie.release_date?.split('-').reverse().join('.') ||
										dataMovie.first_air_date?.split('-').reverse().join('.')}
								</p>
								<p>
									<span className='movieModal__text'>
										{locale === 'ru-RU' ? 'Жанр:' : 'Genre:'}{' '}
									</span>
									{dataMovie.genres?.map(el => (
										<span key={el.id}>{el.name} </span>
									))}
								</p>
								<p>
									<span className='movieModal__text'>
										{locale === 'ru-RU' ? 'Рейтинг IMDB:' : 'Rating IMDB:'}
									</span>{' '}
									{dataMovie?.vote_average} ({dataMovie?.vote_count})
								</p>
								<Button
									variant='contained'
									startIcon={<YouTubeIcon />}
									color='success'
									target='__blank'
									href={`https://www.youtube.com/watch?v=${dataVideo}`}
								>
									{locale === 'ru-RU' ? 'Трейлер' : 'Watch the Trailer'}
								</Button>
								{isFavorite ? (
							<StarIcon
								className='moviePage__star'
								color='success'
								onClick={() => handleClick(dataMovie)}
							/>
						) : (
							<StarBorderIcon
								className='moviePage__star'
								onClick={() => handleClick(dataMovie)}
							/>
						)}
								<div style={{ marginBottom: '10px', marginTop: '10px' }}>
									<span className='movieModal__text'>
										{locale === 'ru-RU' ? 'Актерский состав: ' : 'Starring: '}
									</span>
									{dataMovie ? (
										<CarouselActors
											//  type={typeContent===0 ? 'tv' : 'movie'}
											type={type}
											id={dataMovie.id}
										/>
									) : (
										<span>
											{locale === 'ru-RU' ? 'отсутствуют.' : 'not found.'}
										</span>
									)}
								</div>
							</Box>
							<Box>
								<p className='movieModal__description'>{dataMovie?.overview}</p>
							</Box>
							<div style={{ marginBottom: '10px' }}>
								<span className='movieModal__text'>
									{locale === 'ru-RU' ? 'Рекомендации: ' : 'Recommendations: '}
								</span>
								{dataRecommedation?.results.length ? (
									<Carousel dataRecommedation={dataRecommedation?.results} />
								) : (
									<span>
										{locale === 'ru-RU' ? 'отсутствуют.' : 'not found.'}
									</span>
								)}
							</div>
							<Button
										color='success'
										variant='contained'
										onClick={handleBack}
									>
										{locale==='ru-RU' ? 'Назад' : 'Go Back'}
									</Button>
						</div>
					</div>
				</Box>
			)}
		</>
	);
};

export default MoviePage;
