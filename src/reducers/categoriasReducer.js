import { types } from '../types/types';

const initialState = {
    categoriasInventory: null,
    newCategory: '',
};

export const CategoriasReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllCategoriasInventory:
            return {
                ...state,
                categoriasInventory : action.payload
            }

        case types.SetNewCategoria:
            return {
                ...state,
                newCategory : action.payload
            }

        case types.CleanNewCategoria:
            return {
                ...state,
                newCategory : ''
            }

        default:
            return state;
    }

}