// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth';
import categories from './categories';
import seller from './seller';
import cart from './cart';
import products from './products';

// ==============================|| COMBINE REDUCERS ||============================== //

const appReducer = combineReducers({ auth, categories, seller, cart, products });

const rootReducer = (state, action) => {   
    // Clear all data in redux store to initial.
    if(action.type === 'auth/logout')
       state = undefined;
    
    return appReducer(state, action);
};

export default rootReducer;
