import { types } from '../types/types';

const initialState = {
    monedasInventory: null,
    tiposIdentificacion: null
};

export const MonedasReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.GetAllMonedasInventory:
            return {
                ...state,
                monedasInventory: action.payload
            }

        case types.GetAllTiposIdentificacion:
            return {
                ...state,
                tiposIdentificacion: action.payload
            }

        case types.SetCleanAllMonedas:
            return {
                monedasInventory: null,
                tiposIdentificacion: null
            }

        default:
            return state;
    }

}