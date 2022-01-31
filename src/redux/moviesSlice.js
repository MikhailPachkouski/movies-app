import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		content: [],
		page: 1,
		numberOfPages: 1,
		genres: [{}],
		selectedGenres: [],
		favorites: JSON.parse(localStorage.getItem('favorites')) || [],
		searchText: '',
		typeContent: 0,
		valueNavBar: 0,
		locale: 'ru-RU',
	},
	reducers: {
		fetchContent(state, action) {
			state.content = [...action.payload];
		},
		changePage(state, action) {
			state.page = action.payload;
		},
		changeNumberOfPages(state, action) {
			state.numberOfPages = action.payload;
		},
		getGenres(state, action) {
			state.genres = [...action.payload];
		},
		addSelectedGenres(state, action) {
			state.selectedGenres.push(action.payload);
		},
		removeSelectedGenres(state, action) {
			state.selectedGenres = state.selectedGenres.filter(
				g => g.id !== action.payload.id
			);
		},
		changeFavorites(state, action) {
			state.favorites = [...action.payload];
		},
		changeSearchText(state, action) {
			state.searchText = action.payload;
		},
		changeTypeContent(state, action) {
			state.typeContent = action.payload
		},
		changeValueNavBar(state, action) {
			state.valueNavBar = action.payload
		},
		changeLocale(state, action) {
			state.locale = action.payload
		}
	},
});

export default moviesSlice.reducer;
export const {
	fetchContent,
	changePage,
	changeNumberOfPages,
	getGenres,
	addSelectedGenres,
	removeSelectedGenres,
	changeFavorites,
	changeSearchText,
	changeTypeContent,
	changeValueNavBar,
	changeLocale,
} = moviesSlice.actions;
