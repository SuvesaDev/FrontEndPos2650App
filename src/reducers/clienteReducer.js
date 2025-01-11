import { types } from "../types/types";

const initialState = {
    clientes: []
  };

  export const clientesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.clientesAddNew:
  
        return {
          ...state,
          clientes: [ ...state.clientes, action.payload ]
        };
  
      default:
        return state;
    }
  
  };