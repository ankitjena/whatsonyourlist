import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducer'

const middleware = applyMiddleware(thunkMiddleware)
const Store = createStore(
  rootReducer,
  composeWithDevTools(middleware),
)

export default Store
