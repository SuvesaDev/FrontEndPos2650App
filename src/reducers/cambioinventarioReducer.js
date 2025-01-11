import { types } from "../types/types";

const initialState = {
    cambioinventario: []
  };

  export const cambioinventarioReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.cambioinventarioAddNew:
  
        return {
          ...state,
          cambioinventario: [ ...state.cambioinventario, action.payload ]
        };
  
      default:
        return state;
    }
  
  };