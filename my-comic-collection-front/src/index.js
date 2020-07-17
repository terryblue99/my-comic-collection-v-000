import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger' // https://www.npmjs.com/package/redux-logger
import thunk from 'redux-thunk'
import currentUserReducer from './reducers/currentUserReducer'
import watchReducer from './reducers/watchReducer'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    myWatches: watchReducer 
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, createLogger())
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
