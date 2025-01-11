import { types } from "../types/types";

const initialState = {
    movimientobodega: []
  };

  export const movimientobodegaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.movimientobodegaAddNew:
  
        return {
          ...state,
          movimientobodega: [ ...state.movimientobodega, action.payload ]
        };
  
      default:
        return state;
    }
  
  };