import { SAVE_CLICKED_ACTIVITY,CLEAR_CLICKED_ACTIVITY } from '../types';

const initalState={
    clickedActivityData: {}
};

export const clickedActivityReducer = (state=initalState, action) => {
    switch(action.type){
        case SAVE_CLICKED_ACTIVITY:
            return {
                clickedActivityData: action.payload
            }
        case CLEAR_CLICKED_ACTIVITY:
            return {
                clickedEventData: initalState
        }
        default:
            return state;
    }
};