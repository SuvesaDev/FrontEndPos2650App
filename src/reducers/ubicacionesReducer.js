import { types } from "../types/types";

const initialState = {
    ubicaciones: []
  };

  export const ubicacionesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.ubicacionesAddNew:
  
        return {
          ...state,
          ubicaciones: [ ...state.ubicaciones, action.payload ]
        };
  
      default:
        return state;
    }
  
  };