import { types } from "../types/types";

const initialState = {
    pedidobodega: []
  };

  export const pedidobodegaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.pedidobodegaAddNew:
  
        return {
          ...state,
          pedidobodega: [ ...state.pedidobodega, action.payload ]
        };
  
      default:
        return state;
    }
  
  };