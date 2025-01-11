import { types } from '../types/types';

const initialState = {
    modalAddImpuestoOpen: false,
};

export const MagIteamListReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.magIteamListOpenModelAddImpuesto:
            return {
               ...state,
                modalAddImpuestoOpen: true,
            }

        case types.magIteamListCloseModelAddImpuesto:
            return {
                ...state,
                modalAddImpuestoOpen: false,
            }

        default:
            return state;
    }

}