import { types } from '../types/types';

const initialState = {
    provincias: []
};

export const ProvinciasReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllProvincias:
            return {
                ...state,
                provincias: action.payload
            }

        case types.CleanProvincias:
            return {
                ...state,
                provincias: []
            }

        default:
            return state;
    }

}