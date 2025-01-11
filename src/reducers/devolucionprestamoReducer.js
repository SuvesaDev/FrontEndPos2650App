import { types } from "../types/types";

const initialState = {
    devolucionprestamo: []
  };

  export const devolucionprestamoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.devolucionprestamoAddNew:
  
        return {
          ...state,
          devolucionprestamo: [ ...state.devolucionprestamo, action.payload ]
        };
  
      default:
        return state;
    }
  
  };