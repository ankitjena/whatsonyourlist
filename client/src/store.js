import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import {userReducer} from "./reducer";

const middleware = applyMiddleware(thunkMiddleware);
const Store = createStore(userReducer, composeWithDevTools(middleware));

export default Store;
