import { SAVE_CLICKED_ACTIVITY,CLEAR_CLICKED_ACTIVITY} from '../types';

export const saveClickedActivityData = (clickedActivityData) => (dispatch, getState)=>{
    
    dispatch({
        type: SAVE_CLICKED_ACTIVITY,
        payload: clickedActivityData
    });
};

export const clearClickedActivityData = (clickedEventData)=> (dispatch, getState)=>{
    dispatch({
        type: CLEAR_CLICKED_ACTIVITY,
        payload: clickedEventData
    });
}