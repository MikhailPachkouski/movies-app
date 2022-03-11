import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SimpleBottomNavigation from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import Trending from './pages/Trending/Trending';
import Series from './pages/Series/Series';
import MoviePage from './pages/MoviePage/MoviePage';
import PersonPage from './pages/PersonPage/PersonPage';


function App() {
	return (
		
		<BrowserRouter
				basename='/movies-app-pmv'>
			<Header />
			<div className='App'>
				<Container maxWidth='lg'>
					<Routes>
						<Route path='/' element={<Trending/>} exact />
						<Route path='/:type/:id' element={<MoviePage/>}/>
						<Route path='/person/:id' element={<PersonPage/>}/>
						<Route path='/movies' element={<Movies/>} />
						<Route path='/series' element={<Series/>} />
						<Route path='/favorites' element={<Favorites/>} />
						<Route path='/search' element={<Search/>} />
					</Routes>
				</Container>
			</div>
			<SimpleBottomNavigation />
		</BrowserRouter>
		
	);
}

export default App;
