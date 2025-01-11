import { types } from "../types/types";

const initialState = {
    activeButtonNew: true,
    activeButtonSave: false,
    activeButtonSearch: false,
    activeButtonRemove: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    responsable: '',
    idResponsable: 0,
    isOpenModalSearchCustomers: false,
    checkCedulaSearchCustomersModal: false,
    checkNombreSearchCustomersModal: true,
    cedulaSearchCustomerModal: '',
    nombreSearchCustomerModal: '',
    customersSearchModal: [],
    isOpenModalSearch: false,
    checkIdSearchModal: false,
    checkCedulaSearchModal: false,
    checkNombreSearchModal: true,
    idSearchModal: '',
    cedulaSearchModal: '',
    nombreSearchModal: '',
    entregasSearchModal: [],
    isDisableEntrega: false,
    startOpeningEntrega: false,
    isSearchEntrega: false,
    tiposMonedas: [],
    formasPagos: [],
    entregaCuenta: {
        id: 0,
        monto: '',
        formaPago: '',
        denominacion: 0,
        usuario: '',
        nombre: '',
        codMoneda: 0,
        moneda: '',
        tipoCambio: 0,
        fecha: '',
        numApertura: 0,
        vuelto: 0,
        numeroDocumento: null,
        sucursal: 0,
        tipoDocumento: 2,
        montoEntregaCuenta: 0,
        montoDisponibleCuenta: 0,
        codCliente: '',
        cedula: ''
    }
};

export const downPaymentReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonSaveDownPayment:
            return {
                ...state,
                activeButtonSave: action.payload,
            } 

        case types.SetActiveButtonSearchDownPayment:
            return {
                ...state,
                activeButtonSearch: action.payload,
            } 

        case types.SetActiveButtonRemoveDownPayment:
            return {
                ...state,
                activeButtonRemove: action.payload,
            } 

        case types.SetDisableInputsDownPayment:
            return {
                ...state,
                disableInputs: action.payload,
            } 

        case types.SetClaveInternaDownPayment:
            return {
                ...state,
                claveInterna: action.payload,
            }

        case types.SetVisiblePasswordDownPayment:
            return {
                ...state,
                visiblePassword: action.payload,
            }

        case types.SetDisableInputsUserDownPayment:
            return {
                ...state,
                disableInputsUser: action.payload,
            }

        case types.SetTiposMonedasDownPayment:
            return {
                ...state,
                tiposMonedas: action.payload,
            }

        case types.SetResponsableDownPayment:
            return {
                ...state,
                responsable: action.payload,
            }

        case types.SetIdResponsableDownPayment:
            return {
                ...state,
                idResponsable: action.payload,
            }

        case types.SetFormasPagoDownPayment:
            return {
                ...state,
                formasPagos: action.payload,
            }

        case types.SetMontoDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    monto: action.payload
                }
            }

        case types.SetFormaPagoDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    formaPago: action.payload
                }
            }

        case types.SetDenominacionDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    denominacion: action.payload
                }
            }

        case types.SetUsuarioDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    usuario: action.payload
                }
            }

        case types.SetNombreDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    nombre: action.payload
                }
            }

        case types.SetCodMonedaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    codMoneda: action.payload
                }
            }

        case types.SetMonedaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    moneda: action.payload
                }
            }

        case types.SetTipoCambioDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    tipoCambio: action.payload
                }
            }

        case types.SetFechaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    fecha: action.payload
                }
            }

        case types.SetNumAperturaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    numApertura: action.payload
                }
            }

        case types.SetVueltoDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    vuelto: action.payload
                }
            }

        case types.SetNumeroDocumentoDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    numeroDocumento: action.payload
                }
            }

        case types.SetSucursalDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    sucursal: action.payload
                }
            }

        case types.SetTipoDocumentoDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    tipoDocumento: action.payload
                }
            }

        case types.SetMontoEntregaCuentaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    montoEntregaCuenta: action.payload
                }
            }

        case types.SetMontoDisponibleCuentaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    montoDisponibleCuenta: action.payload
                }
            }

        case types.SetCodClienteDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    codCliente: action.payload
                }
            }

        case types.SetCedulaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    ...state.entregaCuenta,
                    cedula: action.payload
                }
            }

        case types.SetIsOpenModalSearchCustomersDownPayment:
            return {
                ...state,
                isOpenModalSearchCustomers: action.payload
            }

        case types.SetCheckCedulaSearchCustomersModalDownPayment:
            return {
                ...state,
                checkCedulaSearchCustomersModal: action.payload
            }

        case types.SetCheckNombreSearchCustomersModalDownPayment:
            return {
                ...state,
                checkNombreSearchCustomersModal: action.payload
            }

        case types.SetCedulaSearchCustomersModalDownPayment:
            return {
                ...state,
                cedulaSearchCustomerModal: action.payload
            }

        case types.SetNombreSearchCustomersModalDownPayment:
            return {
                ...state,
                nombreSearchCustomerModal: action.payload
            }

        case types.SetCustomersSearchModalDownPayment:
            return {
                ...state,
                customersSearchModal: action.payload
            }

        case types.CleanSearchCustomersModalDownPayment:
            return {
                ...state,
                checkCedulaSearchCustomersModal: false,
                checkNombreSearchCustomersModal: true,
                cedulaSearchCustomerModal: '',
                nombreSearchCustomerModal: '',
                customersSearchModal: [],
            }

        case types.SetIsOpenModalSearchDownPayment:
            return {
                ...state,
                isOpenModalSearch: action.payload
            }

        case types.SetCheckIdSearchModalDownPayment:
            return {
                ...state,
                checkIdSearchModal: action.payload
            }

        case types.SetCheckCedulaSearchModalDownPayment:
            return {
                ...state,
                checkCedulaSearchModal: action.payload
            }

        case types.SetCheckNombreSearchModalDownPayment:
            return {
                ...state,
                checkNombreSearchModal: action.payload
            }

        case types.SetIdSearchModalDownPayment:
            return {
                ...state,
                idSearchModal: action.payload
            }

        case types.SetCedulaSearchModalDownPayment:
            return {
                ...state,
                cedulaSearchModal: action.payload
            }

        case types.SetNombreSearchModalDownPayment:
            return {
                ...state,
                nombreSearchModal: action.payload
            }

        case types.SetEntregasSearchModalDownPayment:
            return {
                ...state,
                entregasSearchModal: action.payload
            }

        case types.CleanSearchModalDownPayment:
            return {
                ...state,
                isOpenModalSearch: false,
                checkIdSearchModal: false,
                checkCedulaSearchModal: false,
                checkNombreSearchModal: true,
                idSearchModal: '',
                cedulaSearchModal: '',
                nombreSearchModal: '',
                entregasSearchModal: [],
            }

        case types.SetInsertEntregaCuentaDownPayment:
            return {
                ...state,
                entregaCuenta: action.payload
            }

        case types.SetIsDisableEntregaCuentaDownPayment:
            return {
                ...state,
                isDisableEntrega: action.payload
            }

        case types.SetOpeningEntregaCuentaDownPayment:
            return {
                ...state,
                startOpeningEntrega: action.payload
            }

        case types.SetIsSearchEntregaCuentaDownPayment:
            return {
                ...state,
                isSearchEntrega: action.payload
            }

        case types.CleanEntregaDownPayment:
            return {
                ...state,
                entregaCuenta: {
                    id: 0,
                    monto: '',
                    formaPago: '',
                    denominacion: 0,
                    usuario: '',
                    nombre: '',
                    codMoneda: 0,
                    moneda: '',
                    tipoCambio: 0,
                    fecha: '',
                    numApertura: 0,
                    vuelto: 0,
                    numeroDocumento: null,
                    sucursal: 0,
                    tipoDocumento: 2,
                    montoEntregaCuenta: 0,
                    montoDisponibleCuenta: 0,
                    codCliente: '',
                    cedula: ''
                }
            }

        case types.CleanEntregaCuentaDownPayment:
            return {
                ...state,
                activeButtonNew: true,
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonRemove: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                responsable: '',
                idResponsable: 0,
                isOpenModalSearchCustomers: false,
                checkCedulaSearchCustomersModal: false,
                checkNombreSearchCustomersModal: true,
                cedulaSearchCustomerModal: '',
                nombreSearchCustomerModal: '',
                customersSearchModal: [],
                isOpenModalSearch: false,
                checkIdSearchModal: false,
                checkCedulaSearchModal: false,
                checkNombreSearchModal: true,
                idSearchModal: '',
                cedulaSearchModal: '',
                nombreSearchModal: '',
                entregasSearchModal: [],
                isDisableEntrega: false,
                startOpeningEntrega: false,
                isSearchEntrega: false,
                tiposMonedas: [],
                formasPagos: [],
                entregaCuenta: {
                    id: 0,
                    monto: '',
                    formaPago: '',
                    denominacion: 0,
                    usuario: '',
                    nombre: '',
                    codMoneda: 0,
                    moneda: '',
                    tipoCambio: 0,
                    fecha: '',
                    numApertura: 0,
                    vuelto: 0,
                    numeroDocumento: null,
                    sucursal: 0,
                    tipoDocumento: 2,
                    montoEntregaCuenta: 0,
                    montoDisponibleCuenta: 0,
                    codCliente: '',
                    cedula: ''
                }
            }

        default:
            return state;
    }
};