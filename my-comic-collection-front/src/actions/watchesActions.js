import {
	GET_WATCHES,
	ADD_WATCH,
	DELETE_WATCH,
	SEARCH_WATCHES,
	RESET_SORT,
	RESET_WATCHES,
	RESET_SEARCH_FAILED
} from './types'
// The underscore library
import _ from 'lodash'

const API_URL = '/api/v0'
let sortedComics

export const getComicsAction = (user_id, isSearchFailed = false) => {
	// Thunk middleware knows how to handle functions.
	// It passes the dispatch method as an argument to the function,
	// thus making it able to dispatch actions itself.
	return dispatch => {

		return fetch(`${API_URL}/comics/?user_id=${user_id}`)
		.then(response => {
			if (response.error) {
				alert('*** getComicsAction ERROR 1: ' + response.error.message)
			} else {
				return response.json()
			}
		})
		.then(response => {
			// Sort the comics using the underscore functions _.chain & _.sortBy
			// Sort by watch name within watch maker for the initial dashboard screen
			sortedComics = _.chain(response)
				.sortBy('watch_name')
				.sortBy('watch_maker')
				.value()
			// Update watch states with the sorted result
			dispatch({
				type: GET_WATCHES, 
				payload: {sortedComics, isSearchFailed}
			})
		})
		.catch(error => {
			console.log('*** getComicsAction ERROR 2: ' + error.message)
		})
	}
}

export const sortComicsAction = (sortKey) => {
	return dispatch => {
		dispatch({
			type: sortKey
		})
	}		
}

export const searchComicsAction = (searchText) => {
	return dispatch => {
		dispatch({
			type: RESET_WATCHES
		})
		
		dispatch({
			type: SEARCH_WATCHES,
			payload: searchText
		})
	}		
}

export const resetComicsAction = () => {
	return dispatch => {
		dispatch({
			type: RESET_WATCHES
		})
	}		
}

export const resetSortAction = () => {
	return dispatch => {
		dispatch({
			type: RESET_SORT
		})
	}		
}

export const resetSearchFailedAction = (isSearchFailed = false) => {
	return dispatch => {
		dispatch({
			type: RESET_SEARCH_FAILED,
			payload: isSearchFailed
		})
	}		
}

export const addWatchAction = (formData, watch) => {
	return dispatch => {
		return fetch(`${API_URL}/comics`, {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (response.error) {
				alert('*** addWatchAction ERROR 1: ' + response.error.message)
			} else {
					dispatch({
							type: ADD_WATCH,
							payload: watch
					})
				}
		})
		.catch(error => {
			console.log('*** addWatchAction ERROR 2: ' + error.message)
		})
	}
}

export const editWatchAction = (formData, watch_id) => {
	// for(let [name, value] of formData) {
	// 	console.log(`${name} = ${value}`)
	// }
	return dispatch => {
		return fetch(`${API_URL}/comics/${watch_id}`, {
			method: 'PATCH',
			body: formData
		})
		.then(response => {
			if (response.error) {
				alert('*** editWatchAction ERROR 1: ' + response.error.message)
			}
		})
		.catch(error => {
			console.log('*** editWatchAction ERROR 2: ' + error.message)
		})
	}
}

export const deleteWatchAction = (id) => {
	return dispatch => {
		return fetch(`${API_URL}/comics/${id}`, {
				method: 'DELETE'
		})
		.then(response => {
			if (response.error) {
				alert('*** deleteWatchAction ERROR 1: ' + response.error.message)
			} else {
				dispatch({
					type: DELETE_WATCH,
					payload: id
				})
			}			
		})
		.catch(error => {
			console.log('*** deleteWatchAction ERROR 2: ' + error.message)
		})
	}
}