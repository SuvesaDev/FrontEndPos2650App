import { types } from "../types/types";

const initialState = {
    activeButtonSearch: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    currentTab: 'Depositos',
    checkNumeroPreDeposito: true,
    disableNumeroPreDeposito: false,
    checkNumAperturaPreDeposito: false,
    disableNumAperturaPreDeposito: true,
    checkCajeroPreDeposito: false,
    disableCajeroPreDeposito: true,
    checkDepositantePreDeposito: false,
    disableDepositantePreDeposito: true,
    checkFechasPreDeposito: false,
    disableFechasPreDeposito: true,
    checkNumeroDeposito: true,
    disableNumeroDeposito: false,
    checkBancoDeposito: false,
    disableBancoDeposito: true,
    checkCajeroDeposito: false,
    disableCajeroDeposito: true,
    checkFechasDeposito: false,
    disableFechasDeposito: true,
    isOpenPreDepositsModal: false,
    isOpenDepositsModal: false,
    startOpeningConsultDeposito: false,
    optionssearchPreDepositos: {
        numero: '',
        numApertura: '',
        cajero: '',
        depositante: '',
        fechaDesde: '',
        fechaHasta: ''
    },
    resultSearchPreDepositos: [],
    optionssearchDepositos: {
        numero: '',
        banco: '',
        cajero: '',
        fechaDesde: '',
        fechaHasta: ''
    },
    resultSearchDepositos: [],
    preDepositoSeleted: {
        id: 0,
        fecha: '',
        cajero: '',
        nombreCajero: '',
        cedula: '',
        depositante: '',
        numApertura: 0,
        monto: 0,
        observaciones: ''
    },
    depositoSeleted: {
        id: 0,
        numeroDeposito: '',
        fecha: '',
        idCuenta: 0,
        idBanco: 0,
        montoDeposito: 0,
        montoEnLetras: '',
        idEmpresa: 0,
        preDepositos: []
    },
    cajeros: [],
    bancos: []
};

export const ConsultDepositsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonSearchConsultDeposits:
            return {
                ...state,
                activeButtonSearch: action.payload,
            }

        case types.SetDisableInputsConsultDeposits:
            return {
                ...state,
                disableInputs: action.payload,
            }

        case types.SetClaveInternaConsultDeposits:
            return {
                ...state,
                claveInterna: action.payload,
            }

        case types.SetVisiblePasswordConsultDeposits:
            return {
                ...state,
                visiblePassword: action.payload,
            }

        case types.SetDisableInputUserConsultDeposits:
            return {
                ...state,
                disableInputsUser: action.payload,
            }

        case types.SetCurrentTabConsultDeposits:
            return {
                ...state,
                currentTab: action.payload,
            }

        case types.SetCajerosConsultDeposits:
            return {
                ...state,
                cajeros: action.payload,
            }

        case types.SetBancosConsultDeposits:
            return {
                ...state,
                bancos: action.payload,
            }

        case types.SetCheckNumeroPreDepositoConsultDeposits:
            return {
                ...state,
                checkNumeroPreDeposito: action.payload,
            }

        case types.SetDisableNumeroPreDepositoConsultDeposits:
            return {
                ...state,
                disableNumeroPreDeposito: action.payload,
            }

        case types.SetCheckNumAperturaPreDepositoConsultDeposits:
            return {
                ...state,
                checkNumAperturaPreDeposito: action.payload,
            }

        case types.SetDisableNumAperturaPreDepositoConsultDeposits:
            return {
                ...state,
                disableNumAperturaPreDeposito: action.payload,
            }

        case types.SetCheckCajeroPreDepositoConsultDeposits:
            return {
                ...state,
                checkCajeroPreDeposito: action.payload,
            }

        case types.SetDisableCajeroPreDepositoConsultDeposits:
            return {
                ...state,
                disableCajeroPreDeposito: action.payload,
            }

        case types.SetCheckDepositantePreDepositoConsultDeposits:
            return {
                ...state,
                checkDepositantePreDeposito: action.payload,
            }

        case types.SetDisableDepositantePreDepositoConsultDeposits:
            return {
                ...state,
                disableDepositantePreDeposito: action.payload,
            }

        case types.SetCheckFechasPreDepositoConsultDeposits:
            return {
                ...state,
                checkFechasPreDeposito: action.payload,
            }

        case types.SetDisableFechasPreDepositoConsultDeposits:
            return {
                ...state,
                disableFechasPreDeposito: action.payload,
            }

        case types.SetCheckNumeroDepositoConsultDeposits:
            return {
                ...state,
                checkNumeroDeposito: action.payload,
            }

        case types.SetDisableNumeroDepositoConsultDeposits:
            return {
                ...state,
                disableNumeroDeposito: action.payload,
            }

        case types.SetCheckBancoConsultDeposits:
            return {
                ...state,
                checkBancoDeposito: action.payload,
            }

        case types.SetDisableBancoConsultDeposits:
            return {
                ...state,
                disableBancoDeposito: action.payload,
            }

        case types.SetCheckCajeroConsultDeposits:
            return {
                ...state,
                checkCajeroDeposito: action.payload,
            }

        case types.SetDisableCajeroConsultDeposits:
            return {
                ...state,
                disableCajeroDeposito: action.payload,
            }

        case types.SetCheckFechasConsultDeposits:
            return {
                ...state,
                checkFechasDeposito: action.payload,
            }

        case types.SetDisableFechasConsultDeposits:
            return {
                ...state,
                disableFechasDeposito: action.payload,
            }

        case types.SetSearchNumeroConsultPreDeposits:
            return {
                ...state,
                optionssearchPreDepositos: {
                    ...state.optionssearchPreDepositos,
                    numero: action.payload
                },
            }

        case types.SetSearchNumAperturaConsultPreDeposits:
            return {
                ...state,
                optionssearchPreDepositos: {
                    ...state.optionssearchPreDepositos,
                    numApertura: action.payload
                },
            }

        case types.SetSearchCajeroConsultPreDeposits:
            return {
                ...state,
                optionssearchPreDepositos: {
                    ...state.optionssearchPreDepositos,
                    cajero: action.payload
                },
            }

        case types.SetSearchDepositanteConsultPreDeposits:
            return {
                ...state,
                optionssearchPreDepositos: {
                    ...state.optionssearchPreDepositos,
                    depositante: action.payload
                },
            }

        case types.SetSearchFechaDesdeConsultPreDeposits:
            return {
                ...state,
                optionssearchPreDepositos: {
                    ...state.optionssearchPreDepositos,
                    fechaDesde: action.payload
                },
            }

        case types.SetSearchFechaHastaConsultPreDeposits:
            return {
                ...state,
                optionssearchPreDepositos: {
                    ...state.optionssearchPreDepositos,
                    fechaHasta: action.payload
                },
            }

        case types.SetResultSearchPreDepositosConsultPreDeposits:
            return {
                ...state,
                resultSearchPreDepositos: action.payload
            }

        case types.SetSearchNumeroConsultDeposits:
            return {
                ...state,
                optionssearchDepositos: {
                    ...state.optionssearchDepositos,
                    numero: action.payload
                },
            }

        case types.SetSearchBancoConsultDeposits:
            return {
                ...state,
                optionssearchDepositos: {
                    ...state.optionssearchDepositos,
                    banco: action.payload
                },
            }

        case types.SetSearchCajeroConsultDeposits:
            return {
                ...state,
                optionssearchDepositos: {
                    ...state.optionssearchDepositos,
                    cajero: action.payload
                },
            }

        case types.SetSearchFechaDesdeConsultDeposits:
            return {
                ...state,
                optionssearchDepositos: {
                    ...state.optionssearchDepositos,
                    fechaDesde: action.payload
                },
            }

        case types.SetSearchFechaHastaConsultDeposits:
            return {
                ...state,
                optionssearchDepositos: {
                    ...state.optionssearchDepositos,
                    fechaHasta: action.payload
                },
            }

        case types.SetResultSearchDepositosConsultPreDeposits:
            return {
                ...state,
                resultSearchDepositos: action.payload
            }

        case types.SetIsOpenPreDepositsModalConsultPreDeposits:
            return {
                ...state,
                isOpenPreDepositsModal: action.payload
            }

        case types.SetIsOpenDepositsModalConsultDeposits:
            return {
                ...state,
                isOpenDepositsModal: action.payload
            }

        case types.SetPreDepositoSeletedConsultDeposits:
            return {
                ...state,
                preDepositoSeleted: action.payload
            }

        case types.CleanPreDepositoSeletedConsultDeposits:
            return {
                ...state,
                preDepositoSeleted: {
                    id: 0,
                    fecha: '',
                    cajero: '',
                    nombreCajero: '',
                    cedula: '',
                    depositante: '',
                    numApertura: 0,
                    monto: 0,
                    observaciones: ''
                },
            }

        case types.SetDepositoSeletedConsultDeposits:
            return {
                ...state,
                depositoSeleted: action.payload
            }

        case types.CleanDepositoSeletedConsultDeposits:
            return {
                ...state,
                depositoSeleted: {
                    id: 0,
                    numeroDeposito: '',
                    fecha: '',
                    idCuenta: 0,
                    idBanco: 0,
                    montoDeposito: 0,
                    montoEnLetras: '',
                    idEmpresa: 0,
                    preDepositos: []
                },
            }

        case types.SetStartOpeningConsultDeposits:
            return {
                ...state,
                startOpeningConsultDeposito: action.payload
            }

        case types.CleanStateConsultDeposits:
            return {
                ...state,
                activeButtonSearch: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                currentTab: 'Depositos',
                checkNumeroPreDeposito: true,
                disableNumeroPreDeposito: false,
                checkNumAperturaPreDeposito: false,
                disableNumAperturaPreDeposito: true,
                checkCajeroPreDeposito: false,
                disableCajeroPreDeposito: true,
                checkDepositantePreDeposito: false,
                disableDepositantePreDeposito: true,
                checkFechasPreDeposito: false,
                disableFechasPreDeposito: true,
                checkNumeroDeposito: true,
                disableNumeroDeposito: false,
                checkBancoDeposito: false,
                disableBancoDeposito: true,
                checkCajeroDeposito: false,
                disableCajeroDeposito: true,
                checkFechasDeposito: false,
                disableFechasDeposito: true,
                isOpenPreDepositsModal: false,
                isOpenDepositsModal: false,
                startOpeningConsultDeposito: false,
                optionssearchPreDepositos: {
                    numero: '',
                    numApertura: '',
                    cajero: '',
                    depositante: '',
                    fechaDesde: '',
                    fechaHasta: ''
                },
                resultSearchPreDepositos: [],
                optionssearchDepositos: {
                    numero: '',
                    banco: '',
                    cajero: '',
                    fechaDesde: '',
                    fechaHasta: ''
                },
                resultSearchDepositos: [],
                preDepositoSeleted: {
                    id: 0,
                    fecha: '',
                    cajero: '',
                    nombreCajero: '',
                    cedula: '',
                    depositante: '',
                    numApertura: 0,
                    monto: 0,
                    observaciones: ''
                },
                depositoSeleted: {
                    id: 0,
                    numeroDeposito: '',
                    fecha: '',
                    idCuenta: 0,
                    idBanco: 0,
                    montoDeposito: 0,
                    montoEnLetras: '',
                    idEmpresa: 0,
                    preDepositos: []
                },
                cajeros: [],
                bancos: []
            }

        default:
            return state;
    }
};