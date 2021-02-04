import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import otherReducer from "./otherReducer";



const rootReducer = combineReducers({
    user: userReducer,
    other:otherReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))