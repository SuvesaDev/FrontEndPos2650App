import { types } from "../types/types";

const initialState = {
    aperturacaja: []
  };

  export const aperturacajaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.aperturacajaAddNew:
  
        return {
          ...state,
          aperturacaja: [ ...state.aperturacaja, action.payload ]
        };
  
      default:
        return state;
    }
  
  };