import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SimpleBottomNavigation from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import Series from './pages/Series/Series';
import Trending from './pages/Trending/Trending';


function App() {
	return (
		
		<BrowserRouter>
			<Header />
			<div className='App'>
				<Container maxWidth='md'>
					<Routes>
						<Route path='/' element={<Trending/>} exact />
						<Route path='/movies' element={<Movies/>} />
						<Route path='/series' element={<Series/>} />
						<Route path='/search' element={<Search/>} />
					</Routes>
				</Container>
			</div>
			<SimpleBottomNavigation />
		</BrowserRouter>
		
	);
}

export default App;
