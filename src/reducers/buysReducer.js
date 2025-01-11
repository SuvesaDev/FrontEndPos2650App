import { types } from '../types/types';

const initialState = {
    modalImportarFOpen: false,
};

export const BuysReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.buysOpenModelImportarF:
            return {
               ...state,
                modalImportarFOpen: true,
            }

        case types.buysCloseModelImportarF:
            return {
                ...state,
                modalImportarFOpen: false,
            }
    
        default:
            return state;
    }

}