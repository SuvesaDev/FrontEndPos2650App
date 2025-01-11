import { types } from "../types/types";

const initialState = {
    denominacionmoneda: []
  };

  export const denominacionmonedaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.denominacionmonedaAddNew:
  
        return {
          ...state,
          denominacionmoneda: [ ...state.denominacionmoneda, action.payload ]
        };
  
      default:
        return state;
    }
  
  };