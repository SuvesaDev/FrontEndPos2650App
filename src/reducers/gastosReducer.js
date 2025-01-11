import { types } from "../types/types";

const initialState = {
    gastos: []
  };

  export const gastosReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.gastosAddNew:
  
        return {
          ...state,
          gastos: [ ...state.gastos, action.payload ]
        };
  
      default:
        return state;
    }
  
  };