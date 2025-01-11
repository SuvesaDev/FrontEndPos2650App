import { types } from '../types/types';

const initialState = {
    tiposIdentificacion: []
};

export const TiposIdentificacionReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllTiposIdentificacion:
            return {
                ...state,
                tiposIdentificacion : action.payload
            }

        case types.CleanTiposIdentificacion:
            return {
                ...state,
                tiposIdentificacion: []
            }

        default:
            return state;
    }

}