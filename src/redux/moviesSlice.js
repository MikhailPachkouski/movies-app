import { createSlice } from "@reduxjs/toolkit";



const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		content: [],
		page: 1,
	}, 
	reducers: {
		fetchContent(state, action) {
			state.content = [...action.payload]
		},
		changePage(state, action) {
			state.page = action.payload
		}
	}
})

export default moviesSlice.reducer
export const {fetchContent} = moviesSlice.actions