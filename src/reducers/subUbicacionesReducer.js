import { types } from '../types/types';

const initialState = {
    subUbicacionesInventory: null
};

export const SubUbicacionesReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllSubUbicacionesInventory:
            return {
                ...state,
                subUbicacionesInventory : action.payload
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