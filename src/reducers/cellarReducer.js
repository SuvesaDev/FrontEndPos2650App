import { types } from "../types/types";

//cellar = bodegas (debe ser en ingles)

const initialState = {
    cellar: []
  };

  export const cellarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.cellarAddNew:
  
        return {
          ...state,
          cellar: [ ...state.cellar, action.payload ]
        };
  
      default:
        return state;
    }
  
  };