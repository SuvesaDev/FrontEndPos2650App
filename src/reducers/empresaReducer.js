import { types } from "../types/types";

const initialState = {
    empresa: []
  };

  export const empresaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.empresaAddNew:
  
        return {
          ...state,
          empresa: [ ...state.empresa, action.payload ]
        };
  
      default:
        return state;
    }
  
  };