import { combineReducers } from "redux";

import {clickedActivityReducer,} from "../reducers/saveClickedActivityDataReducer";

import {saveClickedEventReducer} from "../reducers/saveClickedEventReducer";
import {clearClickedEventReducer} from "../reducers/saveClickedEventReducer";




const rootReducer = combineReducers({
    
    clickedActivityReducer: clickedActivityReducer,
    saveClickedEventReducer: saveClickedEventReducer,

});

export default rootReducer;