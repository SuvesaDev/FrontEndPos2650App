import { types } from "../types/types";

const initialState = {
    cotizaciones: []
  };

  export const cotizacionesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.cotizacionesAddNew:
  
        return {
          ...state,
          cotizaciones: [ ...state.cotizaciones, action.payload ]
        };
  
      default:
        return state;
    }
  
  };