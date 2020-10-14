import {
	GET_COMICS,
	DELETE_COMIC,
	SEARCH_COMICS,
	RESET_SORT,
	RESET_COMICS,
	RESET_SEARCH_FAILED,
	COMIC_RELATED
} from './types'
// The underscore library
import _ from 'lodash'

const API_URL = '/api/v0'
let sortedComicData

export const getComicsAction = (user_id) => {
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
			// Sort by comic name within comic publisher for the initial dashboard screen
			sortedComicData = _.chain(response)
				.sortBy('comic_name')
				.sortBy('comic_publisher')
				.value()
			// Accumulate the total cost of all comics
			const totalCost = response.reduce((total, cost, index, array) => {
				total += parseFloat(array[index].cost)
				return total
			}, 0)
			// Update comic state
			dispatch({
				type: GET_COMICS, 
				payload: {sortedComicData, totalCost}
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
			type: RESET_COMICS
		})
		
		dispatch({
			type: SEARCH_COMICS,
			payload: searchText
		})
	}		
}

export const resetComicsAction = () => {
	return dispatch => {
		dispatch({
			type: RESET_COMICS
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

export const comicRelatedAction = () => {
	return dispatch => {
		dispatch({
			type: COMIC_RELATED
		})
	}		
}

export const resetSearchFailedAction = () => {
	return dispatch => {
		dispatch({
			type: RESET_SEARCH_FAILED
		})
	}		
}

export const addComicAction = (formData) => {
	return dispatch => {
		return fetch(`${API_URL}/comics`, {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (response.error) {
				alert('*** addComicAction ERROR 1: ' + response.error.message)
			}
		})
		.catch(error => {
			console.log('*** addComicAction ERROR 2: ' + error.message)
		})
	}
}

export const editComicAction = (formData, comic_id) => {
	// for(let [name, value] of formData) {
	// 	console.log(`${name} = ${value}`)
	// }
	return dispatch => {
		return fetch(`${API_URL}/comics/${comic_id}`, {
			method: 'PATCH',
			body: formData
		})
		.then(response => {
			if (response.error) {
				alert('*** editComicAction ERROR 1: ' + response.error.message)
			}
		})
		.catch(error => {
			console.log('*** editComicAction ERROR 2: ' + error.message)
		})
	}
}

export const deleteComicAction = (id) => {
	return dispatch => {
		return fetch(`${API_URL}/comics/${id}`, {
				method: 'DELETE'
		})
		.then(response => {
			if (response.error) {
				alert('*** deleteComicAction ERROR 1: ' + response.error.message)
			} else {
				dispatch({
					type: DELETE_COMIC,
					payload: id
				})
			}			
		})
		.catch(error => {
			console.log('*** deleteComicAction ERROR 2: ' + error.message)
		})
	}
}