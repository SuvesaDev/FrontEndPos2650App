import { types } from "../types/types";

const initialState = {
    cierrecaja: []
  };

  export const cierrecajaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.cierrecajaAddNew:
  
        return {
          ...state,
          cierrecaja: [ ...state.cierrecaja, action.payload ]
        };
  
      default:
        return state;
    }
  
  };