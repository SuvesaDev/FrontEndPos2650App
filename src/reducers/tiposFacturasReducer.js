import { types } from '../types/types';

const initialState = {
    allTiposFacturas: null,
    onlyContadoTiposFacturas: null
};

export const TiposFacturasReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllTiposFacturas:
            return {
                ...state,
                allTiposFacturas : action.payload
            }

        case types.GetOnlyContadoTiposFacturas:
            return {
                ...state,
                onlyContadoTiposFacturas : action.payload
            }

        default:
            return state;
    }

}