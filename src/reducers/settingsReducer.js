import { types } from '../types/types';

const initialState = {
    currentTabSettings: 'Valores',
    porcentajeProntoPago: 0
};

export const SettingsReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.SelectTabSettings:
            // TODO: Added new property of state
            return {
                currentTabSettings : action.payload.nameTab,
            }

        case types.SetPorcentajeProntoPagoSettings:
            return {
                ...state,
                porcentajeProntoPago: action.payload
            }
    
        default:
            return state;
    }

}