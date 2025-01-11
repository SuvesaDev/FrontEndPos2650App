import { types } from "../types/types";

const initialState = {
    abonoccobrar: []
  };

  export const abonoccobrarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.abonoccobrarAddNew:
  
        return {
          ...state,
          abonoccobrar: [ ...state.abonoccobrar, action.payload ]
        };
  
      default:
        return state;
    }
  
  };