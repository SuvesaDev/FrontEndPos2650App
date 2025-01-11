import { types } from "../types/types";

const initialState = {
    temperaturacamara: []
  };

  export const temperaturacamaraReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
      case types.temperaturacamaraAddNew:
  
        return {
          ...state,
          temperaturacamara: [ ...state.temperaturacamara, action.payload ]
        };
  
      default:
        return state;
    }
  
  };