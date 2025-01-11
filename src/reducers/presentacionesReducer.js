import { types } from '../types/types';

const initialState = {
    presentacionesInventory: null
};

export const PresentacionesReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllPresentacionesInventory:
            return {
                ...state,
                presentacionesInventory : action.payload
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