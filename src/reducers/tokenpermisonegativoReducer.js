import { types } from "../types/types";

const initialState = {
    tokenpermisonegativo: []
  };

  export const tokenpermisonegativoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.tokenpermisonegativoAddNew:
  
        return {
          ...state,
          tokenpermisonegativo: [ ...state.tokenpermisonegativo, action.payload ]
        };
  
      default:
        return state;
    }
  
  };