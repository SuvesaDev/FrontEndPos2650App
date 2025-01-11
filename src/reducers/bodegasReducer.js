import { types } from '../types/types';

const initialState = {
    bodegasInventory: null
};

export const BodegasReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllBodegasInventory:
            return {
                ...state,
                bodegasInventory : action.payload
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