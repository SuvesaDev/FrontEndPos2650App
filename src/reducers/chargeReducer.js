import { types } from "../types/types";

const initialState = {
    numeroFichaSearch: '',
    cedulaSearch: '',
    nombreSearch: '',
    disableInputsSearch: true,
    disableIconsSearch: true,
    visiblePassword: false,
    disableInputsUser: false,
    nameUserCharge: '',
    cedulaUserCharge: '',
    starOpening: false,
    numApertura: 0,
    totalCobrar: 0.00,
    totalCobrarOriginal: 0.00,
    entregado: 0.00,
    cambio: 0.00,
    isSearchPreventa: false,
    isOpenModalDetailsPreventa: false,
    disableInputMontoEFE: false,
    disableInputMontoTAR: false,
    isOpenModalTicket: false,
    checkSearchFicha: true,
    checkSearchCedula: false,
    checkSearchNombre: false,
    isTiqueteAbono: false,
    isTiqueteNormal: true,
    userCharge: {
        id: 0,
        claveInterna: ''
    },
    formasPago: [],
    cobrar: [],
    preventa: [],
    tiquete: [],
    tiqueteAbono: [],
};


export const chargeReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetInsertFormasPagoCharge:
            return {
                ...state,
                formasPago: action.payload,
            }

        case types.SetInsertInitialCobroCharge:
            return {
                ...state,
                cobrar: action.payload,
            }

        case types.SetInsertPreVentaCharge:
            return {
                ...state,
                preventa: [
                    ...state.preventa,
                    action.payload
                ]
            }

        case types.SetNumeroFichaSearchCharge:
            return {
                ...state,
                numeroFichaSearch: action.payload
            }

        case types.SetDisableInputsSearchCharge:
            return {
                ...state,
                disableInputsSearch: action.payload
            }

        case types.SetIdUserCharge:
            return {
                ...state,
                userCharge: {
                    ...state.userCharge,
                    id: action.payload
                }
            }

        case types.SetClaveInternaUserCharge:
            return {
                ...state,
                userCharge: {
                    ...state.userCharge,
                    claveInterna: action.payload
                }
            }

        case types.SetVisiblePasswordUserCharge:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetDisableInputsUserCharge:
            return {
                ...state,
                disableInputsUser: action.payload
            }

        case types.SetDisableIconsSearchCharge:
            return {
                ...state,
                disableIconsSearch: action.payload
            }

        case types.SetNameUserCharge:
            return {
                ...state,
                nameUserCharge: action.payload
            }

        case types.SetCedulaUserCharge:
            return {
                ...state,
                cedulaUserCharge: action.payload
            }

        case types.SetStartOpeningCharge:
            return {
                ...state,
                starOpening: action.payload
            }

        case types.SetNumAperturaCharge:
            return {
                ...state,
                numApertura: action.payload
            }

        case types.SetOpenModalDetailsPreventaCharge:
            return {
                ...state,
                isOpenModalDetailsPreventa: action.payload
            }

        case types.SetTotalCobrarCharge:
            return {
                ...state,
                totalCobrar: action.payload
            }

        case types.SetTotalCobrarOriginalCharge:
            return {
                ...state,
                totalCobrarOriginal: action.payload
            }

        case types.SetEntregadoCharge:
            return {
                ...state,
                entregado: action.payload
            }

        case types.SetCambioCharge:
            return {
                ...state,
                cambio: action.payload
            }

        case types.SetIsSearchPreventaCharge:
            return {
                ...state,
                isSearchPreventa: action.payload
            }

        case types.SetMontoPagoCharge:
            return {
                ...state,
                cobrar: state.cobrar.map(
                    (cobro) => cobro.formaPago === action.payload.formaPago
                        ? {
                            ...cobro,
                            montoPago: action.payload.montoPago
                        }
                        : cobro)
            }

        case types.SetDisableInputMontoEFECharge:
            return {
                ...state,
                disableInputMontoEFE: action.payload
            }

        case types.SetDisableInputMontoTARCharge:
            return {
                ...state,
                disableInputMontoTAR: action.payload
            }

        case types.SetIsOpenTicketModalCharge:
            return {
                ...state,
                isOpenModalTicket: action.payload
            }

        case types.SetCheckSearchFichaCharge:
            return {
                ...state,
                checkSearchFicha: action.payload
            }

        case types.SetCheckSearchCedulaCharge:
            return {
                ...state,
                checkSearchCedula: action.payload
            }

        case types.SetCheckSearchNombreCharge:
            return {
                ...state,
                checkSearchNombre: action.payload
            }

        case types.SetCedulaSearchCharge:
            return {
                ...state,
                cedulaSearch: action.payload
            }

        case types.SetNombreFichaSearchCharge:
            return {
                ...state,
                nombreSearch: action.payload
            }

        case types.SetTiqueteCajaCharge:
            return {
                ...state,
                tiquete: action.payload
            }

        case types.SetIsTiqueteNormalCajaCharge:
            return {
                ...state,
                isTiqueteNormal: action.payload
            }

        case types.SetTiqueteAbonoCajaCharge:
            return {
                ...state,
                tiqueteAbono: action.payload
            }

        case types.SetIsTiqueteAbonoCajaCharge:
            return {
                ...state,
                isTiqueteAbono: action.payload
            }

        case types.CleanStateCharge:
            return {
                numeroFichaSearch: '',
                cedulaSearch: '',
                nombreSearch: '',
                disableInputsSearch: true,
                disableIconsSearch: true,
                visiblePassword: false,
                disableInputsUser: false,
                nameUserCharge: '',
                cedulaUserCharge: '',
                starOpening: false,
                numApertura: 0,
                totalCobrar: 0.00,
                totalCobrarOriginal: 0.00,
                entregado: 0.00,
                cambio: 0.00,
                isSearchPreventa: false,
                isOpenModalDetailsPreventa: false,
                disableInputMontoEFE: false,
                disableInputMontoTAR: false,
                isOpenModalTicket: false,
                checkSearchFicha: true,
                checkSearchCedula: false,
                checkSearchNombre: false,
                userCharge: {
                    id: 0,
                    claveInterna: ''
                },
                formasPago: [],
                cobrar: [],
                preventa: [],
            }

        default:
            return state;
    }
};