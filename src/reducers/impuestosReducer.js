import { types } from '../types/types';

const initialState = {
    impuestosInventory: null
};

export const ImpuestosReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllImpuestosInventory:
            return {
                ...state,
                impuestosInventory : action.payload
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