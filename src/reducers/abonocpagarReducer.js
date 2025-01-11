import { types } from "../types/types";

const initialState = {
    abonocpagar: []
  };

  export const abonocpagarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.abonocpagarAddNew:
  
        return {
          ...state,
          abonocpagar: [ ...state.abonocpagar, action.payload ]
        };
  
      default:
        return state;
    }
  
  };