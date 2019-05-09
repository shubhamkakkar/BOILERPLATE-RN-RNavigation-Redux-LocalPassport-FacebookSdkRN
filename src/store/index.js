import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const configureStore = () => {
    const store = createStore(
        rootReducer,
        /* 
        applyMiddleware(
            ...    
        ),
        */
    );
    return store;
};


export default configureStore   