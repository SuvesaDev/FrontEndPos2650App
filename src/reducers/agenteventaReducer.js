import { types } from '../types/types';

const initialState = {
    agentesBilling: null
};

export const AgenteVentaReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllAgentesBilling:
            return {
                ...state,
                agentesBilling : action.payload
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