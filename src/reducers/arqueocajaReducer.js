import { types } from "../types/types";

const initialState = {
    arqueocaja: []
  };

  export const arqueocajaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.arqueocajaAddNew:
  
        return {
          ...state,
          arqueocaja: [ ...state.arqueocaja, action.payload ]
        };
  
      default:
        return state;
    }
  
  };