import { types } from "../types/types";

const initialState = {
    rifa: []
  };

  export const rifaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.rifaAddNew:
  
        return {
          ...state,
          rifa: [ ...state.rifa, action.payload ]
        };
  
      default:
        return state;
    }
  
  };