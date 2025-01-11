import { types } from "../types/types";

const initialState = {
    ordencompra: []
  };

  export const ordencompraReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.ordencompraAddNew:
  
        return {
          ...state,
          ordencompra: [ ...state.ordencompra, action.payload ]
        };
  
      default:
        return state;
    }
  
  };