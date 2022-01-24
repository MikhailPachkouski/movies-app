// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { fetchContent } from '../redux/moviesSlice'

// axios.defaults.baseURL = 'https://api.themoviedb.org/'

// const useAxios = ({url}) => {
// const [response, setResponse] = useState(null)
// const [error, setError] = useState('')
// const [loading, setLoading] = useState(true)

// const dispatch = useDispatch();

// useEffect(() => {
// 	const fetchData = () => {
// 		axios.get(url)
// 		.then(res => dispatch(fetchContent(res.data)))
// 		.catch(err => setError(err))
// 		.finally(() => setLoading(false))
// 	}
// fetchData()
// }, [url])

// 	return {response, error, loading}
// }

// export default useAxios
