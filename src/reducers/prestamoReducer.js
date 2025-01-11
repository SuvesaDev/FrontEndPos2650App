import { types } from "../types/types";

const initialState = {
    prestamo: []
  };

  export const prestamoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.prestamoAddNew:
  
        return {
          ...state,
          prestamo: [ ...state.prestamo, action.payload ]
        };
  
      default:
        return state;
    }
  
  };