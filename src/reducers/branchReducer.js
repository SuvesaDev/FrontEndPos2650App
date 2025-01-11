import { types } from "../types/types";

const initialState = {
    activeButtonNewBranch: true,
    activeButtonSaveBranch: false,
    activeButtonSearchBranch: false,
    activeButtonRemoveBranch: false,
    disableInputs: true,
    startOpening: false,
    surcursal: {
        id: 0,
        nombreComercial: '',
        nombreFiscal: '',
        tipoDocumento: 0,
        numeroDocumento: '',
        alias: '',
        telefono: '',
        email: ''
    }
};

export const branchReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetNombreComercialBranch:
            return {
                ...state,
                surcursal: {
                    ...state.surcursal,
                    nombreComercial: action.payload
                }
            }

        case types.SetNombreFiscalBranch:
            return {
                ...state,
                surcursal: {
                    ...state.surcursal,
                    nombreFiscal: action.payload
                }
            }

        case types.SetTipoDocumentoBranch:
            return {
                ...state,
                surcursal: {
                    ...state.surcursal,
                    tipoDocumento: action.payload
                }
            }

        case types.SetNumeroDocumentoBranch:
            return {
                ...state,
                surcursal: {
                    ...state.surcursal,
                    numeroDocumento: action.payload
                }
            }

        case types.SetAliasBranch:
            return {
                ...state,
                surcursal: {
                    ...state.surcursal,
                    alias: action.payload
                }
            }

        case types.SetTelefonoBranch:
            return {
                ...state,
                surcursal: {
                    ...state.surcursal,
                    telefono: action.payload
                }
            }

        case types.SetEmailBranch:
            return {
                ...state,
                surcursal: {
                    ...state.surcursal,
                    email: action.payload
                }
            }

        case types.SetActiveButtonNewBranch:
            return {
                ...state,
                activeButtonNewBranch: action.payload
            }

        case types.SetActiveButtonSaveBranch:
            return {
                ...state,
                activeButtonSaveBranch: action.payload
            }

        case types.SetActiveButtonSearchBranch:
            return {
                ...state,
                activeButtonSearchBranch: action.payload
            }

        case types.SetActiveButtonRemoveBranch:
            return {
                ...state,
                activeButtonRemoveBranch: action.payload
            }

        case types.SetDisableInputsBranch:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetStartOpeningBranch:
            return {
                ...state,
                startOpening: action.payload
            }

        case types.SetCleanBranch:
            return {
                activeButtonNewBranch: true,
                activeButtonSaveBranch: false,
                activeButtonSearchBranch: false,
                activeButtonRemoveBranch: false,
                disableInputs: true,
                startOpening: false,
                surcursal: {
                    id: 0,
                    nombreComercial: '',
                    nombreFiscal: '',
                    tipoDocumento: 0,
                    numeroDocumento: '',
                    alias: '',
                    telefono: '',
                    email: ''
                }
            }

        default:
            return state;
    }
};