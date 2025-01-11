import { types } from "../types/types";

const initialState = {
    clientefrecunte: []
  };

  export const clientefrecunteReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.clientefrecunteAddNew:
  
        return {
          ...state,
          clientefrecunte: [ ...state.clientefrecunte, action.payload ]
        };
  
      default:
        return state;
    }
  
  };