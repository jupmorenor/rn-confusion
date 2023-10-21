import * as ActionTypes from './ActionTypes';

export const Favorites = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITES:
            return state.some(fav => fav === action.payload) ? state : state.concat(action.payload);
        default:
            return state;
    }
}
