import { types } from "../types/types";

const initialState = {
    devolucionesventas: []
  };

  export const devolucionesventasReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.devolucionesventasAddNew:
  
        return {
          ...state,
          devolucionesventas: [ ...state.devolucionesventas, action.payload ]
        };
  
      default:
        return state;
    }
  
  };