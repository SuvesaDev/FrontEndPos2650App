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
    nameUser: '',
    idUsuario: '',
    numApertura: 0,
    numCaja: 0,
    isOpenModalSearchCustomer: false,
    showInfoMessage: false,
    disableBtnAddCollect: true,
    startOpeningCollect: false,
    searchCustomer: {
        cedula: '',
        nombre: '',
        customersResul: [],
        allCustomer: []
    },
    abono: {
        cedulaCliente: '',
        nombreCliente: '',
        identificacionCliente: '',
        numeroFicha: '',
        moneda: '',
        fecha: isoDateTime[0],
        numeroFactura: '',
        idFactura: '',
        fechaFactura: '',
        montoFactura: 0,
        saldoAnterior: 0,
        intereses: 0,
        abono: 0,
        saldoActual: 0,
        observaciones: '',
        totalSaldoAnterior: 0,
        totalMontoRecibido: 0,
        totalSaldoActual: 0,
    },
    facturaActual: {
        numero: '',
        factura: '',
        fecha: '',
        monto: 0,
        montoTotal: 0,
        intereses: 0,
        saldoPrevio: 0,
        abono: 0,
        saldoActual: 0
    },
    facturasPendiente: [],
    customersAllFacturas: [],
    abonos: []
};

export const CollectReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonSaveCollect:
            return {
                ...state,
                activeButtonSave: action.payload
            }

        case types.SetActiveButtonSearchCollect:
            return {
                ...state,
                activeButtonSearch: action.payload
            }

        case types.SetActiveButtonRemoveCollect:
            return {
                ...state,
                activeButtonRemove: action.payload
            }

        case types.SetDisableInputsCollect:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetClaveInternaCollect:
            return {
                ...state,
                claveInterna: action.payload
            }

        case types.SetNameUserCollect:
            return {
                ...state,
                nameUser: action.payload
            }


        case types.SetIdUsuarioCollect:
            return {
                ...state,
                idUsuario: action.payload
            }

        case types.SetNumAperturaCollect:
            return {
                ...state,
                numApertura: action.payload
            }

        case types.SetNumCajaCollect:
            return {
                ...state,
                numCaja: action.payload
            }


        case types.SetVisiblePasswordCollect:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetDisableInputsUserCollect:
            return {
                ...state,
                disableInputsUser: action.payload
            }

        case types.SetShowInfoMessageCollect:
            return {
                ...state,
                showInfoMessage: action.payload
            }

        case types.SetDisableBtnAddCollect:
            return {
                ...state,
                disableBtnAddCollect: action.payload
            }

        case types.SetIsOpenModalSearchCustomerCollect:
            return {
                ...state,
                isOpenModalSearchCustomer: action.payload
            }

        case types.SetCedulaSearchCustomerCollect:
            return {
                ...state,
                searchCustomer: {
                    ...state.searchCustomer,
                    cedula: action.payload
                }
            }

        case types.SetNombreSearchCustomerCollect:
            return {
                ...state,
                searchCustomer: {
                    ...state.searchCustomer,
                    nombre: action.payload
                }
            }

        case types.SetCustomerResulCollect:
            return {
                ...state,
                searchCustomer: {
                    ...state.searchCustomer,
                    customersResul: action.payload
                }
            }

        case types.CleanStateSearchCustomerModalCollect:
            return {
                ...state,
                searchCustomer: {
                    cedula: '',
                    nombre: '',
                    customersResul: []
                }
            }

        case types.SetCedulaCustomerAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    cedulaCliente: action.payload
                }
            }

        case types.SetNombreCustomerAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    nombreCliente: action.payload
                }
            }

        case types.SetIdentificacionCustomerAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    identificacionCliente: action.payload
                }
            }

        case types.SetAllCustomerResulCollect:
            return {
                ...state,
                searchCustomer: {
                    ...state.searchCustomer,
                    allCustomer: action.payload
                }
            }

        case types.SetAllCustomersFacturasCollect:
            return {
                ...state,
                customersAllFacturas: action.payload
            }

        case types.SetFacturasPendientesCollect:
            return {
                ...state,
                facturasPendiente: action.payload
            }

        case types.SetNumeroFichaAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    numeroFicha: action.payload
                },
            }

        case types.SetMonedaAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    moneda: action.payload
                },
            }

        case types.SetFechaAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    fecha: action.payload
                },
            }

        case types.SetNumeroFacturaAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    numeroFactura: action.payload
                },
            }

            case types.SetIdFacturaAbonoCollect:
                return {
                    ...state,
                    abono: {
                        ...state.abono,
                        idFactura: action.payload
                    },
                }
            

        case types.SetFechaFacturaAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    fechaFactura: action.payload
                },
            }

        case types.SetMontoFacturaAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    montoFactura: action.payload
                },
            }

        case types.SetSaldoAnteriorAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    saldoAnterior: action.payload
                },
            }

        case types.SetInteresesAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    intereses: action.payload
                },
            }

        case types.SetAbonoAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    abono: action.payload
                },
            }

        case types.SetSaldoActualAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    saldoActual: action.payload
                },
            }

        case types.SetObservacionesAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    observaciones: action.payload
                },
            }

        case types.SetTotalSaldoAnteriorAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    totalSaldoAnterior: action.payload
                },
            }

        case types.SetTotalMontoRecibidoAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    totalMontoRecibido: action.payload
                },
            }

        case types.SetTotalSaldoActualAbonoCollect:
            return {
                ...state,
                abono: {
                    ...state.abono,
                    totalSaldoActual: action.payload
                },
            }

        case types.SetNumeroFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    numero: action.payload,
                },
            }

        case types.SetIdFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    factura: action.payload,
                },
            }

        case types.SetFechaFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    fecha: action.payload,
                },
            }

        case types.SetMontoFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    monto: action.payload,
                },
            }

        case types.SetMontoTotalFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    montoTotal: action.payload,
                },
            }

        case types.SetInteresesFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    intereses: action.payload,
                },
            }

        case types.SetSaldoPrevioFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    saldoPrevio: action.payload,
                },
            }

        case types.SetAbonoFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    abono: action.payload,
                },
            }

        case types.SetSaldoActualFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    ...state.facturaActual,
                    saldoActual: action.payload,
                },
            }

        case types.SetAddFacturaActualCollect:
            return {
                ...state,
                facturaActual: action.payload
            }

        case types.SetNewAbonoCollect:
            return {
                ...state,
                abonos: [
                    ...state.abonos,
                    action.payload
                ]
            }

        case types.SetStartOpeningCollect:
            return {
                ...state,
                startOpeningCollect: action.payload
            }

        case types.CleanFacturaActualCollect:
            return {
                ...state,
                facturaActual: {
                    numero: '',
                    factura: '',
                    fecha: '',
                    monto: 0,
                    montoTotal: 0,
                    intereses: 0,
                    saldoPrevio: 0,
                    abono: 0,
                    saldoActual: 0
                },
            }

        case types.CleanCollect:
            return {
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonRemove: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                nameUser: '',
                idUsuario: '',
                isOpenModalSearchCustomer: false,
                showInfoMessage: false,
                disableBtnAddCollect: true,
                startOpeningCollect: false,
                searchCustomer: {
                    cedula: '',
                    nombre: '',
                    customersResul: [],
                    allCustomer: []
                },
                abono: {
                    cedulaCliente: '',
                    nombreCliente: '',
                    identificacionCliente: '',
                    numeroFicha: '',
                    moneda: '',
                    fecha: isoDateTime[0],
                    numeroFactura: '',
                    idFactura: '',
                    fechaFactura: '',
                    montoFactura: 0,
                    saldoAnterior: 0,
                    intereses: 0,
                    abono: 0,
                    saldoActual: 0,
                    observaciones: '',
                    totalSaldoAnterior: 0,
                    totalMontoRecibido: 0,
                    totalSaldoActual: 0,
                },
                facturaActual: {
                    numero: '',
                    factura: '',
                    fecha: '',
                    monto: 0,
                    montoTotal: 0,
                    intereses: 0,
                    saldoPrevio: 0,
                    abono: 0,
                    saldoActual: 0
                },
                facturasPendiente: [],
                customersAllFacturas: [],
                abonos: []
            }

        default:
            return state;
    }
};