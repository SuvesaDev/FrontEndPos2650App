import { types } from '../types/types';

const initialState = {
    modalSearchProvidersOpen: false,
    modalAssingCabysCodeOpen: false,
};

export const AssingCabysCodeReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.assingCabysCodeOpenModelSearchProviders:
            return {
               ...state,
                modalSearchProvidersOpen: true,
            }

        case types.assingCabysCodeCloseModelSearchProviders:
            return {
                ...state,
                modalSearchProvidersOpen: false,
            }

        case types.assingCabysCodeOpenModelAssingCabysCode:
            return {
                ...state,
                modalAssingCabysCodeOpen: true,
            }

        case types.assingCabysCodeCloseModelAssingCabysCode:
            return {
                ...state,
                modalAssingCabysCodeOpen: false,
            }

        default:
            return state;
    }

}