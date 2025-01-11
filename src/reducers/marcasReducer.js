import { types } from '../types/types';

const initialState = {
    marcasInventory: null
};

export const MarcasReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllMarcasInventory:
            return {
                ...state,
                marcasInventory : action.payload
            }

        // case types.CleanTiposExoneracion:
        //     return {
        //         ...state,
        //         tiposExoneracion: []
        //     }

        default:
            return state;
    }

}