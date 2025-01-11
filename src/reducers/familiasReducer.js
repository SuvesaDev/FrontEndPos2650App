import { types } from "../types/types";

const initialState = {
    familias: []
  };

  export const familiasReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.familiasAddNew:
  
        return {
          ...state,
          familias: [ ...state.familias, action.payload ]
        };
  
      default:
        return state;
    }
  
  };