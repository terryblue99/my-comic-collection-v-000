import _ from 'lodash'
import { 
	ADD_WATCH, 
	CLEAR_COMICS,
	COST_HIGH_TO_LOW_SORT,
	COST_LOW_TO_HIGH_SORT,
	DELETE_WATCH,
	GET_COMICS, 
	NEWEST_TO_OLDEST_SORT,
	OLDEST_TO_NEWEST_SORT,
	RESET_SEARCH_FAILED,
	RESET_SORT,
	RESET_COMICS,
	SEARCH_COMICS,
	WATCH_MAKER_SORT,
	WATCH_NAME_SORT
} from '../actions/types'

const initialState = {
	isSearchFailed: false,
	isSort: false,
	savedComics: [],
	sortDefaultText: 'Select a sort option...',
	watchRelated: 'Watch-Related' // For records that are not related to a specific watch.
}
let sortedComics

// Used when sorting comics by cost,
// converting it to a floating point number
const costToNumber = (watch) => {
	if (watch.cost) {
		return parseFloat(watch.cost)
	} else return 0.00
}

export default (state = initialState, { type, payload } ) => {

	switch(type) {

		// UPDATE COMICS & WATCH-RELATED

		case GET_COMICS:
			if (payload) {
				return ({
					...state,
					WatchRelated: state.WatchRelated,
					isSearchFailed: payload.isSearchFailed,
					savedComics: payload.sortedComics,
					comics: payload.sortedComics
				})
			} else return state

		case RESET_COMICS:		
			return ({
				...state,
				comics: state.savedComics
			})

		case RESET_SEARCH_FAILED:
			return ({
				...state,
				isSearchFailed: payload
			})

		case ADD_WATCH:
			if (payload) {
				return ({
					...state,
					state: state.comics.concat(payload)
				}) 	
			} else return state

		case DELETE_WATCH:
			if (payload) {
				return ({
					...state,
					savedComics: state.savedComics.filter(watch => watch.id !== payload),
					comics: state.comics.filter(watch => watch.id !== payload)
				})
			} else return state		

		case CLEAR_COMICS:
				state = initialState
				return state

		// SEARCH COMICS & WATCH-RELATED

		case SEARCH_COMICS:

			if (payload === '') {
				alert('Please enter a search value!')
				return state
			}

			let searchArray
			const searchText = payload.toLowerCase()

			return ({
				...state,
				comics: state.comics.filter(watch => {
					searchArray = []
					searchArray.push( watch.watch_name.toLowerCase(),
														watch.watch_maker.toLowerCase(),
														watch.movement.toLowerCase(),
														watch.complications.toLowerCase(),
														watch.band.toLowerCase(),
														watch.model_number.toLowerCase(),
														watch.case_measurement.toLowerCase(),
														watch.water_resistance.toLowerCase(),
														watch.date_bought.toLowerCase(),
														watch.cost,
														watch.notes.toLowerCase()
													)
					// check array of record string fields for searchText string/substring
					return searchArray.some(watchStringField => watchStringField.includes(searchText))
				})
			})
		
		// SORT COMICS & WATCH-RELATED

		case WATCH_MAKER_SORT: // sort by name within maker
			sortedComics = _.chain( state.comics )
			.sortBy('watch_name')
			.sortBy('watch_maker')
			.value()
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})
	
		case WATCH_NAME_SORT:
			sortedComics = _.sortBy( state.comics, 'watch_name' )
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})

		case	NEWEST_TO_OLDEST_SORT:
			sortedComics = _.sortBy( state.comics, 'date_bought' )
			return ({
				...state,
				isSort: true,
				comics: sortedComics.reverse()
			})

		case	OLDEST_TO_NEWEST_SORT:
			sortedComics = _.sortBy( state.comics, 'date_bought' )
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})

		case	COST_LOW_TO_HIGH_SORT:
			sortedComics = _.sortBy( state.comics, costToNumber )
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})

		case	COST_HIGH_TO_LOW_SORT:
			sortedComics = _.sortBy( state.comics, costToNumber)
			return ({
				...state,
				isSort: true,
				comics: sortedComics.reverse()
			})

		case RESET_SORT:
			return ({
				...state,
				isSort: false
			})

		// DEFAULT STATE

		default:
			return state
	}
}