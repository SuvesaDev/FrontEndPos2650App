import { types } from "../types/types";

const initialState = {
    bancos: []
  };

  export const bancosReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.bancosAddNew:
  
        return {
          ...state,
          bancos: [ ...state.bancos, action.payload ]
        };
  
      default:
        return state;
    }
  
  };