import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import otherReducer from "./otherReducer";
import eventReducer from "./eventReducer";





const rootReducer = combineReducers({
    user: userReducer,
    other:otherReducer,
    event:eventReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))