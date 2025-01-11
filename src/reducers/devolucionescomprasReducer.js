import { types } from "../types/types";

const initialState = {
    devolucionescompras: []
  };

  export const devolucionescomprasReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.devolucionescomprasAddNew:
  
        return {
          ...state,
          devolucionescompras: [ ...state.devolucionescompras, action.payload ]
        };
  
      default:
        return state;
    }
  
  };