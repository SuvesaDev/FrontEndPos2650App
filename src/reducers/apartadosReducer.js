import { types } from "../types/types";

const initialState = {
    apartados: []
  };

  export const apartadosReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.apartadosAddNew:
  
        return {
          ...state,
          apartados: [ ...state.apartados, action.payload ]
        };
  
      default:
        return state;
    }
  
  };