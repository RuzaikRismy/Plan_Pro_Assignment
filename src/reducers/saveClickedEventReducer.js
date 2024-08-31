import { SAVE_CLICKED_EVENT, CLEAR_CLICKED_EVENT } from '../types';

const initalState={
    clickedEventData: {}
};

export const saveClickedEventReducer = (state=initalState, action) => {
    switch(action.type){
        case SAVE_CLICKED_EVENT:
            return {
                clickedEventData: action.payload
            }
            case CLEAR_CLICKED_EVENT:
                return {
                    clickedEventData: initalState
                }
        default:
            return state;
    }
};

// export const clearClickedEventReducer = (state=initalState, action) => {
//     switch(action.type){
//         case CLEAR_CLICKED_ACTIVITY:
//             return {
//                 clickedEventData: initalState
//             }
//         default:
//             return state;
//     }
// };