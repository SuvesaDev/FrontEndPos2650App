import { types } from "../types/types";

const initialState = {
    fichasxusuario: []
  };

  export const fichasxusuarioReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.fichasxusuarioAddNew:
  
        return {
          ...state,
          fichasxusuario: [ ...state.fichasxusuario, action.payload ]
        };
  
      default:
        return state;
    }
  
  };