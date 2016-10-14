import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

//web
import welcomeReducer from './pages/reducers/welcome'

//h5
import App from './pages/containers/app'
import Home from './pages/containers/home'
import QA from './pages/containers/QA'

const reducer = combineReducers({
  welcomeReducer,
  routing: routerReducer
})

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(browserHistory)
    )
  )
)

const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="home" component={Home}/>
          <Route path="QA" component={QA}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('content')
)
