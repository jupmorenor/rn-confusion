import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
//import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Favorites } from './favorites';
//import { InitialFeedack } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

export const ConfigureStore = () => {

    const config = {
        key: 'root',
        storage,
        debug: true,
    };

    const store = createStore(
        persistCombineReducers(config, {
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            favorites: Favorites,
            //...createForms({
            //    feedback: InitialFeedack
            //})
        }), 
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return {persistor, store};
}
 