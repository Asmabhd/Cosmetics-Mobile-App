import { createStore, combineReducers } from "redux";
import toggleFavorite from "./Reducers/favoriteReducer";
import toggleHistory from "./Reducers/historyReducer";

export default createStore(combineReducers({ toggleFavorite, toggleHistory }));
