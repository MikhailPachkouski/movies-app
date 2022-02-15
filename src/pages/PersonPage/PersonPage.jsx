import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import '../../components/ContentModal/ContentModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { changeValueNavBar } from '../../redux/moviesSlice';
import CarouselGalery from '../../components/CarouselGalery/CarouselGalery';
import CarouselCredits from '../../components/CarouselCredits/CarouselCredits';
import './PersonPage.css';

const PersonPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { locale } = useSelector(state => state.movies);
	const [dataPerson, setDataPerson] = useState();

	const { id } = useParams();

	const fetchDataPerson = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${locale}`
		);
		setDataPerson(data);
		console.log('p', data);
	};

	const handleBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchDataPerson();
		dispatch(changeValueNavBar(6));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchDataPerson();
		// eslint-disable-next-line
	}, [locale]);

	return (
		<>
			{dataPerson && (
				<Box>
					<div>
						<div >
							<Typography
								id='transition-modal-title'
								variant='h5'
								component='h2'
								className='personPage__title personPage__text'
							>
								{dataPerson?.name}
							</Typography>
						</div>

						<div className='personPage__about'>
							<i className='movieModal__tagline'>
								{dataPerson.also_known_as[0]}
							</i>

							<Box>
								<div className='personPage__info'>
									<div className='personPage__description'>
										<p>
											<span className='personPage__text'>
												{locale === 'ru-RU' ? 'Дата рождения:' : 'Birthday:'}{' '}
											</span>
											{dataPerson.birthday?.split('-').reverse().join('.')}
										</p>
										{dataPerson.deathday && (
											<p>
												<span className='personPage__text'>
													{locale === 'ru-RU' ? 'Дата смерти:' : 'Deathday:'}{' '}
												</span>
												{dataPerson.deathday?.split('-').reverse().join('.')}
											</p>
										)}
										<p>
											<span className='personPage__text'>
												{locale === 'ru-RU'
													? 'Место рождения:'
													: 'Place of Birth:'}{' '}
											</span>
											{dataPerson.place_of_birth}
										</p>
										{dataPerson.homepage && (
											<p>
												<span className='personPage__text'>
													{locale === 'ru-RU'
														? 'Домашняя страница:'
														: 'Homepage:'}{' '}
												</span>

												<a
													href={dataPerson.homepage}
													style={{ textDecoration: 'none' }}
												>
													{dataPerson.homepage}
												</a>
											</p>
										)}
										<p>
											<span className='personPage__text'>
												{locale === 'ru-RU' ? 'Популярность:' : 'Popularity:'}{' '}
											</span>
											{dataPerson.popularity}
										</p>
									</div>
									<div className='person__img__wrapper'>
										<img
											src={
												dataPerson.profile_path
													? `${process.env.REACT_APP_IMG_W500}/${dataPerson.profile_path}`
													: `${process.env.REACT_APP_IMG_UNAVAILABLE}`
											}
											alt={dataPerson.name || dataPerson.title}
											className='personPage__img'
										/>
									</div>
								</div>

								<div style={{ marginBottom: '10px', marginTop: '10px' }}>
									
									{dataPerson ? (
										<CarouselGalery id={dataPerson.id} />
									) : (
										<span>
											{locale === 'ru-RU' ? 'отсутствуют.' : 'not found.'}
										</span>
									)}
								</div>
								{dataPerson?.biography &&
								<Box>
								<span className='personPage__text'>
										{locale === 'ru-RU'
											? 'Биография: '
											: 'Biography: '}
									</span>
									<p className='personPage__biography'>
										{dataPerson?.biography}
									</p>
								</Box>}
								<div style={{ marginBottom: '10px', marginTop: '10px' }}>
									<span className='personPage__text'>
										{locale === 'ru-RU'
											? 'Другие фильмы с участием: '
											: 'Movie and TV Credits: '}
									</span>
									{dataPerson ? (
										<CarouselCredits id={dataPerson.id} />
									) : (
										<span>
											{locale === 'ru-RU' ? 'отсутствуют.' : 'not found.'}
										</span>
									)}
								</div>
							</Box>
							<Button color='success' variant='contained' onClick={handleBack}>
								{locale === 'ru-RU' ? 'Назад' : 'Go Back'}
							</Button>
						</div>
					</div>
				</Box>
			)}
		</>
	);
};

export default PersonPage;
