import { types } from "../types/types";

const initialState = {
    ajusteinventario: []
  };

  export const ajusteinventarioReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.ajusteinventarioAddNew:
  
        return {
          ...state,
          ajusteinventario: [ ...state.ajusteinventario, action.payload ]
        };
  
      default:
        return state;
    }
  
  };