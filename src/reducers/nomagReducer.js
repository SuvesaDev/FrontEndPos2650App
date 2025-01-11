import { types } from "../types/types";

const initialState = {
    nomag: []
  };

  export const nomagReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.nomagAddNew:
  
        return {
          ...state,
          nomag: [ ...state.nomag, action.payload ]
        };
  
      default:
        return state;
    }
  
  };