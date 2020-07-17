import _ from 'lodash'
import { 
	ADD_WATCH, 
	CLEAR_WATCHES,
	COST_HIGH_TO_LOW_SORT,
	COST_LOW_TO_HIGH_SORT,
	DELETE_WATCH,
	GET_WATCHES, 
	NEWEST_TO_OLDEST_SORT,
	OLDEST_TO_NEWEST_SORT,
	RESET_SEARCH_FAILED,
	RESET_SORT,
	RESET_WATCHES,
	SEARCH_WATCHES,
	WATCH_MAKER_SORT,
	WATCH_NAME_SORT
} from '../actions/types'

const initialState = {
	isSearchFailed: false,
	isSort: false,
	savedWatches: [],
	sortDefaultText: 'Select a sort option...',
	watchRelated: 'Watch-Related' // For records that are not related to a specific watch.
}
let sortedWatches

// Used when sorting watches by cost,
// converting it to a floating point number
const costToNumber = (watch) => {
	if (watch.cost) {
		return parseFloat(watch.cost)
	} else return 0.00
}

export default (state = initialState, { type, payload } ) => {

	switch(type) {

		// UPDATE WATCHES & WATCH-RELATED

		case GET_WATCHES:
			if (payload) {
				return ({
					...state,
					WatchRelated: state.WatchRelated,
					isSearchFailed: payload.isSearchFailed,
					savedWatches: payload.sortedWatches,
					watches: payload.sortedWatches
				})
			} else return state

		case RESET_WATCHES:		
			return ({
				...state,
				watches: state.savedWatches
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
					state: state.watches.concat(payload)
				}) 	
			} else return state

		case DELETE_WATCH:
			if (payload) {
				return ({
					...state,
					savedWatches: state.savedWatches.filter(watch => watch.id !== payload),
					watches: state.watches.filter(watch => watch.id !== payload)
				})
			} else return state		

		case CLEAR_WATCHES:
				state = initialState
				return state

		// SEARCH WATCHES & WATCH-RELATED

		case SEARCH_WATCHES:

			if (payload === '') {
				alert('Please enter a search value!')
				return state
			}

			let searchArray
			const searchText = payload.toLowerCase()

			return ({
				...state,
				watches: state.watches.filter(watch => {
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
		
		// SORT WATCHES & WATCH-RELATED

		case WATCH_MAKER_SORT: // sort by name within maker
			sortedWatches = _.chain( state.watches )
			.sortBy('watch_name')
			.sortBy('watch_maker')
			.value()
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})
	
		case WATCH_NAME_SORT:
			sortedWatches = _.sortBy( state.watches, 'watch_name' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})

		case	NEWEST_TO_OLDEST_SORT:
			sortedWatches = _.sortBy( state.watches, 'date_bought' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches.reverse()
			})

		case	OLDEST_TO_NEWEST_SORT:
			sortedWatches = _.sortBy( state.watches, 'date_bought' )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})

		case	COST_LOW_TO_HIGH_SORT:
			sortedWatches = _.sortBy( state.watches, costToNumber )
			return ({
				...state,
				isSort: true,
				watches: sortedWatches
			})

		case	COST_HIGH_TO_LOW_SORT:
			sortedWatches = _.sortBy( state.watches, costToNumber)
			return ({
				...state,
				isSort: true,
				watches: sortedWatches.reverse()
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