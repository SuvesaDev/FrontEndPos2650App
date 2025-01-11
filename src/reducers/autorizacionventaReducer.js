import { types } from "../types/types";

const initialState = {
    autorizacionventa: []
  };

  export const autorizacionventaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.autorizacionventaAddNew:
  
        return {
          ...state,
          autorizacionventa: [ ...state.autorizacionventa, action.payload ]
        };
  
      default:
        return state;
    }
  
  };