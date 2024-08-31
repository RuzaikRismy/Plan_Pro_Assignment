import { SAVE_CLICKED_EVENT, CLEAR_CLICKED_EVENT} from '../types';

export const saveClickedEventData = (clickedEventData) => (dispatch, getState)=>{
    
    dispatch({
        type: SAVE_CLICKED_EVENT,
        payload: clickedEventData
    });
};

export const clearClickeEventData = (clickedEventData)=> (dispatch, getState)=>{
    dispatch({
        type: CLEAR_CLICKED_EVENT,
        payload: clickedEventData
    });
}