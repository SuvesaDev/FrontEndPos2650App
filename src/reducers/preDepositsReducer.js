import { types } from "../types/types";

const date = new Date();
const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

const initialState = {
    activeButtonSave: false,
    activeButtonSearch: false,
    activeButtonRemove: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    startOpeningPreDeposito: false,
    
    isOpenModalSearch: false,
    isEditPreDeposits: false,
    optionsSearchPreDeposito: {
        valorFiltro: '',
        numero: true,
        numeroApertura: false,
        fechas: false,
        fechaDesde: isoDateTime[0],
        fechaHasta: isoDateTime[0]
    },
    resultSearchPreDepositos: [],
    
    cajeros: [],
    empresas: [],
    preDeposito: {
        id: 0,
        fecha: '',
        cajero: '',
        nombreCajero: '',
        cedula: '',
        depositante: '',
        numApertura: 0,
        monto: 0,
        observaciones: ''
    }
};

export const PreDepositsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonSavePreDeposits:
            return {
                ...state,
                activeButtonSave: action.payload,
            }

        case types.SetActiveButtonSearchPreDeposits:
            return {
                ...state,
                activeButtonSearch: action.payload,
            }

        case types.SetActiveButtonRemovePreDeposits:
            return {
                ...state,
                activeButtonRemove: action.payload,
            }

        case types.SetDisableInputsPreDeposits:
            return {
                ...state,
                disableInputs: action.payload,
            }

        case types.SetClaveInternaPreDeposits:
            return {
                ...state,
                claveInterna: action.payload,
            }

        case types.SetVisiblePasswordPreDeposits:
            return {
                ...state,
                visiblePassword: action.payload,
            }

        case types.SetDisableInputsUserPreDeposits:
            return {
                ...state,
                disableInputsUser: action.payload,
            }

        case types.SetIsOpenModalSearchPreDeposits:
            return {
                ...state,
                isOpenModalSearch: action.payload,
            }

        case types.SetValorFiltroSearchPreDeposits:
            return {
                ...state,
                optionsSearchPreDeposito: {
                    ...state.optionsSearchPreDeposito,
                    valorFiltro: action.payload
                }
            }

        case types.SetNumeroSearchPreDeposits:
            return {
                ...state,
                optionsSearchPreDeposito: {
                    ...state.optionsSearchPreDeposito,
                    numero: action.payload
                },
            }

        case types.SetNumeroAperturaSearchPreDeposits:
            return {
                ...state,
                optionsSearchPreDeposito: {
                    ...state.optionsSearchPreDeposito,
                    numeroApertura: action.payload
                },
            }

        case types.SetFechasSearchPreDeposits:
            return {
                ...state,
                optionsSearchPreDeposito: {
                    ...state.optionsSearchPreDeposito,
                    fechas: action.payload
                },
            }

        case types.SetFechaDesdeSearchPreDeposits:
            return {
                ...state,
                optionsSearchPreDeposito: {
                    ...state.optionsSearchPreDeposito,
                    fechaDesde: action.payload
                },
            }

        case types.SetFechaHastaSearchPreDeposits:
            return {
                ...state,
                optionsSearchPreDeposito: {
                    ...state.optionsSearchPreDeposito,
                    fechaHasta: action.payload
                },
            }

        case types.CleanStateSearchPreDeposits:
            return {
                ...state,
                optionsSearchPreDeposito: {
                    valorFiltro: '',
                    numero: true,
                    numeroApertura: false,
                    fechas: false,
                    fechaDesde: isoDateTime[0],
                    fechaHasta: isoDateTime[0]
                },
                resultSearchPreDepositos: [],
            }

        case types.SetResultSearchPreDepositos:
            return {
                ...state,
                resultSearchPreDepositos: action.payload
            }

        case types.SetOneSeletedPreDepositos:
            return {
                ...state,
                preDeposito: action.payload
            }

        case types.SetIsEditPreDeposits:
            return {
                ...state,
                isEditPreDeposits: action.payload
            }

        case types.SetCajerosPreDeposits:
            return {
                ...state,
                cajeros: action.payload,
            }

        case types.SetEmpresasPreDeposits:
            return {
                ...state,
                empresas: action.payload,
            }

        case types.SetIdPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    id: action.payload
                }
            }

        case types.SetFechaPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    fecha: action.payload
                }
            }
            
        case types.SetCajeroPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    cajero: action.payload
                }
            }

        case types.SetNombreCajeroPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    nombreCajero: action.payload
                }
            }

        case types.SetCedulaPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    cedula: action.payload
                }
            }

        case types.SetDepositantePreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    depositante: action.payload
                }
            }

        case types.SetNumAperturaPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    numApertura: action.payload
                }
            }

        case types.SetMontoPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    monto: action.payload
                }
            }

        case types.SetObservacionesPreDeposits:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    observaciones: action.payload
                }
            }

        case types.SetStartOpeningPreDepositoPreDeposits:
            return {
                ...state,
                startOpeningPreDeposito: action.payload,
            }

        case types.CleanPreDeposits:
            return {
                ...state,
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonRemove: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                startOpeningPreDeposito: false,
                isEditPreDeposits: false,
                cajeros: [],
                empresas: [],
                resultSearchPreDepositos: [],
                preDeposito: {
                    id: 0,
                    fecha: '',
                    cajero: '',
                    nombreCajero: '',
                    cedula: '',
                    depositante: '',
                    numApertura: 0,
                    monto: 0,
                    observaciones: ''
                }
            }

        default:
            return state;
    }
};