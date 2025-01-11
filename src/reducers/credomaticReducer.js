import { types } from "../types/types";

const initialState = {
    credomatic: []
  };

  export const credomaticReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.credomaticAddNew:
  
        return {
          ...state,
          credomatic: [ ...state.credomatic, action.payload ]
        };
  
      default:
        return state;
    }
  
  };