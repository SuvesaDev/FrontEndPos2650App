import { types } from "../types/types";

const initialState = {
    activeButtonsFooter: false,
    usuarioFacturacion: {
        id: 0,
        claveInterna: '',
        nameUser: ''
    },
    visiblePassword: false,
    startOpening: false,
    plazos: []
};

export const followingConsignmentReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonFooterFollowingConsignment:
            return {
                ...state,
                activeButtonsFooter: action.payload
            }

        case types.SetIdUserFollowingConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    id: action.payload
                }
            }

        case types.SetClaveInternaFollowingConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    claveInterna: action.payload
                }
            }

        case types.SetNameUserFollowingConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    nameUser: action.payload
                }
            }

        case types.SetVisiblePasswordFollowingConsignment:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetStartOpeningFollowingConsignment:
            return {
                ...state,
                startOpening: action.payload
            }

        case types.SetPlazosFollowingConsignment:
            return {
                ...state,
                plazos: action.payload
            }
        
        default:
            return state;
    }
};