import { types } from '../types/types';

const date = new Date();
const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

const initialState = {
    currentTabPays: 'DatosAbono',
    activeButtonSave: false,
    activeButtonSearch: false,
    disableInputCuenta: true,
    activeButtonRemove: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    disableInputsAbonoActual: true,
    nameUser: '',
    idUsuario: '',
    numApertura: 0,
    numCaja: 0,
    startOpeningPays: false,
    moneda: '',
    observaciones: '',
    abonoActual: {
        factura: '',
        codProveedor: '',
        montoFactura: 0.00,
        saldoAnt: 0.00,
        abono: 0.00,
        abonoSuMoneda: 0.00,
        saldoActual: 0.00,
        idCompra: 0,
        fechaFactura: '',
    },
    fecha: isoDateTime[0],
    codigoProveedor: 0,
    cedulaProveedor: '',
    nombreProveedor: '',
    totalSaldoAnterior: 0.00,
    totalMontoRecibido: 0.00,
    totalSaldoActual: 0.00,
    bancos: [],
    cuentas: [],
    cuentasProveedor: [],
    proveedoresAllFacturas: [],
    proveedoresAllFacturasDefault: [],
    facturasProveedor: [],
    banco: '',
    cuentaBanco: '',
    cuentaProveedor: '',
    centroPago: '',
    tipoPago: '',
    numeroDocumento: '',
    numeroRecibo: '',
    isEnableButtonPrint: false,
    datosReciboImprimir: [],
    abonos: [],
    datosSucursal: [],
    abonosHechos: [],
    abonosHechosDefault: [],
    isNewAbono: true,
};

export const PaysReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.SelectTabPays:
            return {
                ...state,
                currentTabPays: action.payload.nameTab,
            }

        case types.SetActiveButtonSavePays:
            return {
                ...state,
                activeButtonSave: action.payload
            }

        case types.SetAbonosHechosPays:
            return {
                ...state,
                abonosHechos: action.payload
            }

        case types.SetAbonosHechosDefaultPays:
            return {
                ...state,
                abonosHechosDefault: action.payload
            }


        case types.SetDatosSucursalPays:
            return {
                ...state,
                datosSucursal: action.payload
            }

        case types.SetActiveButtonSearchPays:
            return {
                ...state,
                activeButtonSearch: action.payload
            }

        case types.SetIsNewAbonoPays:
            return {
                ...state,
                isNewAbono: action.payload
            }

        case types.SetActiveButtonRemovePays:
            return {
                ...state,
                activeButtonRemove: action.payload
            }

        case types.SetDisableInputsPays:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetClaveInternaPays:
            return {
                ...state,
                claveInterna: action.payload
            }

        case types.SetVisiblePasswordPays:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetDisableInputsUserPays:
            return {
                ...state,
                disableInputsUser: action.payload
            }

        case types.SetDisableInputsAbonoActualPays:
            return {
                ...state,
                disableInputsAbonoActual: action.payload
            }



        case types.SetNameUserPays:
            return {
                ...state,
                nameUser: action.payload
            }


        case types.SetIdUsuarioPays:
            return {
                ...state,
                idUsuario: action.payload
            }

        case types.SetNumAperturaPays:
            return {
                ...state,
                numApertura: action.payload
            }

        case types.SetNumCajaPays:
            return {
                ...state,
                numCaja: action.payload
            }

        case types.SetOpeningPays:
            return {
                ...state,
                startOpeningPays: action.payload
            }

        case types.SetMonedaAbonoPays:
            return {
                ...state,
                moneda: action.payload
            }

        case types.SetObservacionesAbonoPays:
            return {
                ...state,
                observaciones: action.payload
            }

        case types.SetMonedaAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    moneda: action.payload
                },
            }

        case types.SetCedulaProveAbonoDetallePays:
            return {
                ...state,
                cedulaProveedor: action.payload
            }


        case types.SetNombreProveAbonoDetallePays:
            return {
                ...state,
                nombreProveedor: action.payload
            }


        case types.SetCodigoProvePays:
            return {
                ...state,
                codigoProveedor: action.payload
            }

        case types.SetCodigoProveAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    codProveedor: action.payload
                },
            }

        case types.SetFechaAbonoPays:
            return {
                ...state,
                fecha: action.payload,
            }

        case types.SetNumFacturaAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    factura: action.payload
                },
            }

        case types.SetIdCompraAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    idCompra: action.payload
                },
            }


        case types.SetFechaFacturaAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    fechaFactura: action.payload
                },
            }

        case types.SetMontoFacturaAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    montoFactura: action.payload
                },
            }

        case types.SetSaldoAnteriorAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    saldoAnt: action.payload
                },
            }


        case types.SetAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    abono: action.payload
                },
            }

        case types.SetSaldoActualAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    saldoActual: action.payload
                },
            }

        case types.SetAbonoSuMonedaAbonoDetallePays:
            return {
                ...state,
                abonoActual: {
                    ...state.abonoActual,
                    abonoSuMoneda: action.payload
                },
            }



        case types.SetTotalSaldoAnteriorPays:
            return {
                ...state,
                totalSaldoAnterior: action.payload
            }

        case types.SetTotalMontoRecibidoPays:
            return {
                ...state,
                totalMontoRecibido: action.payload
            }


        case types.SetTotalSaldoActualPays:
            return {
                ...state,
                totalSaldoActual: action.payload
            }

        case types.SetBancoPays:
            return {
                ...state,
                banco: action.payload
            }

        case types.SetCuentaBancoPays:
            return {
                ...state,
                cuentaBanco: action.payload
            }

        case types.SetAllAbonosPays:
            return {
                ...state,
                abonos: action.payload
            }


        case types.SetTipoPagoPays:
            return {
                ...state,
                tipoPago: action.payload
            }

        case types.SetCentroPagoPays:
            return {
                ...state,
                centroPago: action.payload
            }


        case types.SetBancosPays:
            return {
                ...state,
                bancos: action.payload
            }

        case types.SetCuentasBancoPays:
            return {
                ...state,
                cuentas: action.payload
            }

        case types.SetDisableInputCuentaPays:
            return {
                ...state,
                disableInputCuenta: action.payload
            }


        case types.SetCleanCuentasPays:
            return {
                ...state,
                cuentas: [],
            }


        case types.SetCuentasProveedorPays:
            return {
                ...state,
                cuentasProveedor: action.payload,
            }


        case types.SetNumeroDocumentoPays:
            return {
                ...state,
                numeroDocumento: action.payload,
            }

        case types.SetNumeroReciboPays:
            return {
                ...state,
                numeroRecibo: action.payload,
            }

        case types.SetNumeroCuentaProveedorPays:
            return {
                ...state,
                cuentaProveedor: action.payload,
            }

        case types.SetFacturasProveedorPays:
            return {
                ...state,
                facturasProveedor: action.payload,
            }


        case types.SetAllProveedoresFacturasPays:
            return {
                ...state,
                proveedoresAllFacturas: action.payload
            }

        case types.SetAllProveedoresFacturasDefaultPays:
            return {
                ...state,
                proveedoresAllFacturasDefault: action.payload
            }

        case types.SetIsEnablePrintButtonPays:
            return {
                ...state,
                isEnableButtonPrint: action.payload
            }

        case types.SetDatosReciboImprimirPays:
            return {
                ...state,
                datosReciboImprimir: action.payload
            }



        case types.SetCleanAbonoActualPays:
            return {
                ...state,
                disableInputsAbonoActual: true,
                abonoActual: {
                    factura: '',
                    codProveedor: '',
                    montoFactura: 0.00,
                    saldoAnt: 0.00,
                    abono: 0.00,
                    abonoSuMoneda: 0.00,
                    saldoActual: 0.00,
                    idCompra: 0,
                    fechaFactura: '',
                }
            }

        case types.SetCleanFacturasProveedor:
            return {
                ...state,
                facturasProveedor: [],
            }

        case types.SetCleanSeletecProveedor:
            return {
                ...state,
                disableInputsAbonoActual: true,
                moneda: '',
                observaciones: '',
                abonoActual: {
                    factura: '',
                    codProveedor: '',
                    montoFactura: 0.00,
                    saldoAnt: 0.00,
                    abono: 0.00,
                    abonoSuMoneda: 0.00,
                    saldoActual: 0.00,
                    idCompra: 0,
                    fechaFactura: '',

                },
                totalSaldoAnterior: 0.00,
                totalMontoRecibido: 0.00,
                totalSaldoActual: 0.00,
                fecha: isoDateTime[0],
                codigoProveedor: 0,
                cedulaProveedor: '',
                nombreProveedor: '',
                cuentas: [],
                cuentasProveedor: [],
                proveedoresAllFacturas: [],
                proveedoresAllFacturasDefault: [],
                facturasProveedor: [],
                banco: '',
                cuentaBanco: '',
                cuentaProveedor: '',
                centroPago: '',
                tipoPago: '',
                numeroDocumento: '',
                numeroRecibo: '',
                datosReciboImprimir: [],
                abonos: [],
                isNewAbono: true,
            }

        case types.SetCleanPays:
            return {
                currentTabPays: 'DatosAbono',
                activeButtonSave: false,
                activeButtonSearch: false,
                disableInputCuenta: true,
                activeButtonRemove: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                disableInputsAbonoActual: true,
                nameUser: '',
                idUsuario: '',
                numApertura: 0,
                numCaja: 0,
                startOpeningPays: false,
                moneda: '',
                observaciones: '',
                abonoActual: {
                    factura: '',
                    codProveedor: '',
                    montoFactura: 0.00,
                    saldoAnt: 0.00,
                    abono: 0.00,
                    abonoSuMoneda: 0.00,
                    saldoActual: 0.00,
                    idCompra: 0,
                    fechaFactura: '',
                },
                fecha: isoDateTime[0],
                codigoProveedor: 0,
                cedulaProveedor: '',
                nombreProveedor: '',
                totalSaldoAnterior: 0.00,
                totalMontoRecibido: 0.00,
                totalSaldoActual: 0.00,
                bancos: [],
                cuentas: [],
                cuentasProveedor: [],
                proveedoresAllFacturas: [],
                proveedoresAllFacturasDefault: [],
                facturasProveedor: [],
                banco: '',
                cuentaBanco: '',
                cuentaProveedor: '',
                centroPago: '',
                tipoPago: '',
                numeroDocumento: '',
                numeroRecibo: '',
                isEnableButtonPrint: false,
                datosReciboImprimir: [],
                abonos: [],
                isNewAbono: true,
                abonosHechos: [],
                abonosHechosDefault: [],
            }

        default:
            return state;
    }

}