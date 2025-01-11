import { types } from "../types/types";

const initialState = {
    activeButtonSave: false,
    activeButtonSearch: false,
    activeButtonRemove: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    disableInputCuenta: true,
    idEmpresaLast: 0,
    idBancoLast: 0,
    numeroApertura: '',
    startOpeningDeposito: false,
    empresas: [],
    bancos: [],
    cuentas: [],
    preDepositosSearch: [],
    deposito: {
        id: 0,
        numeroDeposito: '',
        fecha: '',
        idCuenta: 0,
        idBanco: 0,
        montoDeposito: 0,
        montoEnLetras: '',
        idEmpresa: 0,
        preDepositos: []
    }
};

export const GenerateDepositsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonSaveGenerateDeposits:
            return {
                ...state,
                activeButtonSave: action.payload,
            }

        case types.SetActiveButtonSearchGenerateDeposits:
            return {
                ...state,
                activeButtonSearch: action.payload,
            }

        case types.SetActiveButtonRemoveGenerateDeposits:
            return {
                ...state,
                activeButtonRemove: action.payload,
            }

        case types.SetDisableInputsGenerateDeposits:
            return {
                ...state,
                disableInputs: action.payload,
            }

        case types.SetClaveInternaGenerateDeposits:
            return {
                ...state,
                claveInterna: action.payload,
            }

        case types.SetVisiblePasswordGenerateDeposits:
            return {
                ...state,
                visiblePassword: action.payload,
            }

        case types.SetDisableInputsUserGenerateDeposits:
            return {
                ...state,
                disableInputsUser: action.payload,
            }

        case types.SetEmpresasGenerateDeposits:
            return {
                ...state,
                empresas: action.payload,
            }

        case types.SetIdGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    id: action.payload
                }
            }

        case types.SetNumeroDepositoGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    numeroDeposito: action.payload
                }
            }

        case types.SetFechaGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    fecha: action.payload
                }
            }

        case types.SetIdCuentaGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    idCuenta: action.payload
                }
            }

        case types.SetIdBancoGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    idBanco: action.payload
                }
            }

        case types.SetMontoDepositoGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    montoDeposito: action.payload
                }
            }

        case types.SetMontoEnLetrasGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    montoEnLetras: action.payload
                }
            }

        case types.SetIdEmpresaGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    idEmpresa: action.payload
                }
            }

        case types.SetNumeroAperturaGenerateDeposits:
            return {
                ...state,
                numeroApertura: action.payload
            }

        case types.SetPreDepositosSearchGenerateDeposits:
            return {
                ...state,
                preDepositosSearch: action.payload
            }

        case types.SetBancosGenerateDeposits:
            return {
                ...state,
                bancos: action.payload
            }

        case types.SetDisableInputCuentaGenerateDeposits:
            return {
                ...state,
                disableInputCuenta: action.payload
            }

        case types.SetCuentasGenerateDeposits:
            return {
                ...state,
                cuentas: action.payload
            }

        case types.SetIdEmpresaLastGenerateDeposits:
            return {
                ...state,
                idEmpresaLast: action.payload
            }

        case types.SetIdBancoLastGenerateDeposits:
            return {
                ...state,
                idBancoLast: action.payload
            }

        case types.CleanCuentasGenerateDeposits:
            return {
                ...state,
                cuentas: [],
            }

        case types.SetAddPreDepositoGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    preDepositos: [
                        ...state.deposito.preDepositos,
                        action.payload.preDeposito
                    ]
                },
                preDepositosSearch : state.preDepositosSearch.map(
                    (preDeposito, i) => preDeposito.id === action.payload.preDeposito.id
                        ? {
                            ...preDeposito,
                            seleccionar: true,
                        }
                        : preDeposito)
            }

        case types.SetRemovePreDepositoGenerateDeposits:
            return {
                ...state,
                deposito: {
                    ...state.deposito,
                    preDepositos : state.deposito.preDepositos.filter(
                        preDeposito => preDeposito.id != action.payload
                    )
                },
                preDepositosSearch : state.preDepositosSearch.map(
                    (preDeposito, i) => preDeposito.id === action.payload
                        ? {
                            ...preDeposito,
                            seleccionar: false,
                        }
                        : preDeposito)
            }

        case types.SetStartOpeningDepositoGenerateDeposits:
            return {
                ...state,
                startOpeningDeposito: action.payload
            }

        case types.CleanGenerateDeposits:
            return {
                ...state,
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonRemove: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                disableInputCuenta: true,
                idEmpresaLast: 0,
                idBancoLast: 0,
                numeroApertura: '',
                startOpeningDeposito: false,
                empresas: [],
                bancos: [],
                cuentas: [],
                preDepositosSearch: [],
                deposito: {
                    id: 0,
                    numeroDeposito: '',
                    fecha: '',
                    idCuenta: 0,
                    idBanco: 0,
                    montoDeposito: 0,
                    montoEnLetras: '',
                    idEmpresa: 0,
                    preDepositos: []
                }
            }

        default:
            return state;
    }
};