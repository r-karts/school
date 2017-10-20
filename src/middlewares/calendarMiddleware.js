import {
    CHANGE_WEEK
} from '../constants/Calendar'

export const  myFirstMiddleware = store => next => action => {
    if(action.type == CHANGE_WEEK)
    {
        console.log('CHANGE_WEEK');
    }
    store;
    next(action);
};