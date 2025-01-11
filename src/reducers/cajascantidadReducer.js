import { types } from "../types/types";

const initialState = {
    cajascantidad: []
  };

  export const cajascantidadReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.cajascantidadAddNew:
  
        return {
          ...state,
          cajascantidad: [ ...state.cajascantidad, action.payload ]
        };
  
      default:
        return state;
    }
  
  };