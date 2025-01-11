import { types } from '../types/types';

const initialState = {
    subFamiliasInventory: null
};

export const SubFamiliasReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllSubFamiliasInventory:
            return {
                ...state,
                subFamiliasInventory : action.payload
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