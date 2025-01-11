import { types } from "../types/types";

const initialState = {
    ajusteccobrar: []
  };

  export const ajusteccobrarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.ajusteccobrarAddNew:
  
        return {
          ...state,
          ajusteccobrar: [ ...state.ajusteccobrar, action.payload ]
        };
  
      default:
        return state;
    }
  
  };