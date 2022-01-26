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
			state.selectedGenres = state.selectedGenres.filter((g) => g.id !== action.payload.id);
		},
		changeFavorites(state, action) {
			state.favorites = [...action.payload]
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
} = moviesSlice.actions;
