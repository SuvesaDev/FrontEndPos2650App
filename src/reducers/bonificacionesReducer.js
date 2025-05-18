import { types } from "../types/types";

const initialState = {
    disableInputs: true,
    claveInterna : '',
    visibleClaveInterna : false,
    disableInputsUser : false,
    nameUser: ''
};

export const BonificacionesReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case types.SetDisableInputsBonificaciones:
            return {
                ...state,
                disableInputs : action.payload
            }

        case types.SetClaveInternaBonificaciones:
            return {
                ...state,
                claveInterna : action.payload
            }

        case types.SetVisibleClaveInternaBonificaciones:
            return {
                ...state,
                visibleClaveInterna : action.payload
            }

        case types.SetDisableInputsUserBonificaciones:
            return {
                ...state,
                disableInputsUser : action.payload
            }

        case types.SetNameUserBonificaciones:
            return {
                ...state,
                nameUser : action.payload
            }
          
        case types.CleanStateBonificaciones:
            return {
                disableInputs: true,
                claveInterna : '',
                visibleClaveInterna : false,
                disableInputsUser : false,
                nameUser: ''
            }

        default:
            return state;
    }
};