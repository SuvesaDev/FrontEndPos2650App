import { types } from "../types/types";

const initialState = {
    descuentos: []
  };

  export const descuentosReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.descuentosAddNew:
  
        return {
          ...state,
          descuentos: [ ...state.descuentos, action.payload ]
        };
  
      default:
        return state;
    }
  
  };