import { types } from "../types/types";

const initialState = {
    ajustecpagar: []
  };

  export const ajustecpagarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.ajustecpagarAddNew:
  
        return {
          ...state,
          ajustecpagar: [ ...state.ajustecpagar, action.payload ]
        };
  
      default:
        return state;
    }
  
  };