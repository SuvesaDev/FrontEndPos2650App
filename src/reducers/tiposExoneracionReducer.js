import { types } from '../types/types';

const initialState = {
    tiposExoneracion: null
};

export const TiposExoneracionReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllTiposExoneracion:
            return {
                ...state,
                tiposExoneracion : action.payload
            }

        case types.CleanTiposExoneracion:
            return {
                ...state,
                tiposExoneracion: []
            }

        default:
            return state;
    }

}