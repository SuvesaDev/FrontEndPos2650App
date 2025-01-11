import { types } from '../types/types';
const date = new Date();
const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

const initialState = {
    startOpeningBudget: false,
    activeButtonPrint: false,
    activeButtonSave: false,
    activeButtonSearch: false,
    activeButtonEdit: false,
    disableInputs: true,
    disableInputsChecks: true,
    disableInputsArticles: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    nameUser: '',
    idUsuario: '',
    numApertura: 0,
    numCaja: 0,
    allCustomers: [],
    customerData: {
        codigoCliente: '',
        nombreCliente: '',
        contactoCliente: '',
        telefonoCliente: '',
        tipocedulaCliente: '',
        cedulaCliente: '',
        tipoPrecioCliente: 0,
        maximoDescuentoCliente: 0,
    },
    validezDias: '',
    tiempoEntrega: '',
    fechaCotizacion: isoDateTime[0],
    moneda: '',
    monedaNombre: '',
    costoTransporte: 0.00,
    nombrequienCotiza: '',
    confirmadaPor: 'Sin Confirmar',
    observaciones: '',
    isCredito: false,
    isContado: false,
    isConfirm: false,
    isAnulate: false,
    isEditArticle: false,
    isNewArticle: true,
    detalleArticuloActual: {
        CodArticulo: '',
        Descripcion: '',
        Cantidad: 0,
        Costo: 0.00,
        Impuesto: 0.00,
        Monto_Impuesto: 0.00,
        SubtotalGravado: 0.00,
        SubTotalExcento: 0.00,
        SubTotal: 0.00,
        Total: 0.00,
        Monto_Descuento: 0.00,
        Descuento: 0,
        Precio_A: 0.00,
        Precio_B: 0.00,
        Precio_C: 0.00,
        Precio_D: 0.00,
        Cabys: '',
        Existencia: '',
        CodigoP: 0,
        CodigoMonedaVenta: 0,
        PrecioOtros: 0.00,
        SubFamilia: '',
        MaxDescuento: 0,

    },
    detalleFactura: [],
    isOpenSearchInventoryBudgets: false,
    subTotalGeneral: 0.00,
    subTotalGravadoGeneral: 0.00,
    subTotalExentoGeneral: 0.00,
    descuentoGeneral: 0.00,
    impuestoVentaGeneral: 0.00,
    totalGeneral: 0.00,
    datosSucursal: [],
    datosReporte: [],
    datosReporteImprimir: [],
    fechaReporte: "",
    allCotizaciones: [],
    codigoCotizacion: "",
};

export const budgetsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetCodArticuloDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CodArticulo: action.payload,
                },
            }

        case types.SetDescripcionDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descripcion: action.payload,
                },
            }


        case types.SetCostoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Costo: action.payload,
                },
            }


        case types.SetCantidadDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Cantidad: action.payload,
                },
            }


        case types.SetImpuestoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Impuesto: action.payload,
                },
            }


        case types.SetMontoDescuentoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Descuento: action.payload,
                },
            }


        case types.SetMontoImpuestoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Impuesto: action.payload,
                },
            }
        case types.SetSubtotalGravadoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubtotalGravado: action.payload,
                },
            };

        case types.SetSubTotalExcentoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotalExcento: action.payload,
                },
            };

        case types.SetDescuentoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descuento: action.payload,
                },
            };


        case types.SetSubTotalDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotal: action.payload,
                },
            };

        case types.SetTotalDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Total: action.payload,
                },
            };

        case types.SetPrecioADetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_A: action.payload,
                },
            };

        case types.SetPrecioBDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_B: action.payload,
                },
            };
        case types.SetPrecioCDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_C: action.payload,
                },
            };
        case types.SetPrecioDDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_D: action.payload,
                },
            };

        case types.SetCabysDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Cabys: action.payload,
                },
            };

        case types.SetExistenciaDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Existencia: action.payload,
                },
            }

        case types.SetCodigoPDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CodigoP: action.payload,
                },
            };

        case types.SetCodigoMonedaVentaDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CodigoMonedaVenta: action.payload,
                },
            };

        case types.SetPrecioOtrosDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    PrecioOtros: action.payload,
                },
            };

        case types.SetSubFamiliaDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubFamilia: action.payload,
                },
            };

        case types.SetMaxDescuentoDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    MaxDescuento: action.payload,
                },
            };


        case types.SetStartOpeningBudget:
            return {
                ...state,
                startOpeningBudget: action.payload
            }

        case types.SetActiveButtonPrintBudgets:
            return {
                ...state,
                activeButtonPrint: action.payload
            }

        case types.SetActiveButtonSaveBudgets:
            return {
                ...state,
                activeButtonSave: action.payload
            }


        case types.SetDisableInputsBudgets:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetDisableInputsChecksBudgets:
            return {
                ...state,
                disableInputsChecks: action.payload
            }

        case types.SetDisableInputsArticlesBudgets:
            return {
                ...state,
                disableInputsArticles: action.payload
            }


        case types.SetOpenSearchInventoryBudgets:
            return {
                ...state,
                isOpenSearchInventoryBudgets: action.payload
            }


        case types.SetClaveInternaBudgets:
            return {
                ...state,
                claveInterna: action.payload
            }

        case types.SetVisiblePasswordBudgets:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetDisableInputsUserBudgets:
            return {
                ...state,
                disableInputsUser: action.payload
            }


        case types.SetNameUserBudgets:
            return {
                ...state,
                nameUser: action.payload
            }


        case types.SetIdUsuarioBudgets:
            return {
                ...state,
                idUsuario: action.payload
            }

        case types.SetNumAperturaBudgets:
            return {
                ...state,
                numApertura: action.payload
            }

        case types.SetNumCajaBudgets:
            return {
                ...state,
                numCaja: action.payload
            }


        case types.SetCustomersBudgets:
            return {
                ...state,
                allCustomers: action.payload
            }


        case types.SetCodigoClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    codigoCliente: action.payload
                },
            }

        case types.SetTipoPrecioClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    tipoPrecioCliente: action.payload
                },
            }


        case types.SetMaximoDescuentoClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    maximoDescuentoCliente: action.payload
                },
            }


        case types.SetNombreClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    nombreCliente: action.payload
                },
            }

        case types.SetContactoClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    contactoCliente: action.payload
                },
            }


        case types.SetTelefonoClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    telefonoCliente: action.payload
                },
            }


        case types.SetTipoCedulaClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    tipocedulaCliente: action.payload
                },
            }


        case types.SetCedulaClienteDataBudgets:
            return {
                ...state,
                customerData: {
                    ...state.customerData,
                    cedulaCliente: action.payload
                },
            }


        case types.SetValidezDiasBudgets:
            return {
                ...state,
                validezDias: action.payload
            }


        case types.SetTiempoEntregaBudgets:
            return {
                ...state,
                tiempoEntrega: action.payload
            }


        case types.SetFechaCotizacionsBudgets:
            return {
                ...state,
                fechaCotizacion: action.payload
            }


        case types.SetMonedaBudgets:
            return {
                ...state,
                moneda: action.payload
            }


        case types.SetMonedaNombreBudgets:
            return {
                ...state,
                monedaNombre: action.payload
            }


        case types.SetIsCreditoBudgets:
            return {
                ...state,
                isCredito: action.payload
            }

        case types.SetIsContadoBudgets:
            return {
                ...state,
                isContado: action.payload
            }

        case types.SetIsConfirmBudgets:
            return {
                ...state,
                isConfirm: action.payload
            }

        case types.SetIsAnulateBudgets:
            return {
                ...state,
                isAnulate: action.payload
            }

        case types.SetIsEditArticleBudgets:
            return {
                ...state,
                isEditArticle: action.payload
            }

        case types.SetIsNewArticleBudgets:
            return {
                ...state,
                isNewArticle: action.payload
            }


        case types.SetCostoTransporteBudgets:
            return {
                ...state,
                costoTransporte: action.payload
            }

        case types.SetNombreQuienCotizaBudgets:
            return {
                ...state,
                nombrequienCotiza: action.payload
            }

        case types.SetNombreQuienConfirmaBudgets:
            return {
                ...state,
                confirmadaPor: action.payload
            }

        case types.SetObservacionesBudgets:
            return {
                ...state,
                observaciones: action.payload
            }

        case types.SetDetalleFacturaBudgets:
            return {
                ...state,
                detalleFactura: action.payload
            }

        case types.SetSubTotalGeneralBudgets:
            return {
                ...state,
                subTotalGeneral: action.payload
            };

        case types.SetSubTotalGravadoGeneralBudgets:
            return {
                ...state,
                subTotalGravadoGeneral: action.payload
            };

        case types.SetSubTotalExentoGeneralBudgets:
            return {
                ...state,
                subTotalExentoGeneral: action.payload
            };

        case types.SetDescuentoGeneralBudgets:
            return {
                ...state,
                descuentoGeneral: action.payload
            };

        case types.SetImpuestoVentaGeneralBudgets:
            return {
                ...state,
                impuestoVentaGeneral: action.payload
            };

        case types.SetTotalGeneralBudgets:
            return {
                ...state,
                totalGeneral: action.payload
            };


        case types.SetDatosSucursalBudgets:
            return {
                ...state,
                datosSucursal: action.payload
            }

        case types.SetDatosReporteBudgets:
            return {
                ...state,
                datosReporte: action.payload
            }


        case types.SetCodigoCotizacionBudgets:
            return {
                ...state,
                codigoCotizacion: action.payload
            }

        case types.SetFechaReporteBudgets:
            return {
                ...state,
                fechaReporte: action.payload
            }

        case types.SetAllCotizacionesBudgets:
            return {
                ...state,
                allCotizaciones: action.payload
            }

        case types.SetActiveButtonEditBudgets:
            return {
                ...state,
                activeButtonEdit: action.payload
            }

        case types.SetActiveButtonSearchBudgets:
            return {
                ...state,
                activeButtonSearch: action.payload
            }

            
        case types.SetDatosReporteImprimirBudgets:
            return {
                ...state,
                datosReporteImprimir: action.payload
            }
            

        case types.SetCleanAllDatosPDFBudgets:
            return {
                ...state,
                datosReporte: [],
                datosSucursal: [],
                fechaReporte: "",
            }

        case types.SetCleanDetalleActualBudgets:
            return {
                ...state,
                detalleArticuloActual: {
                    CodArticulo: '',
                    Descripcion: '',
                    Cantidad: 0,
                    Costo: 0.00,
                    Impuesto: 0.00,
                    Monto_Impuesto: 0.00,
                    SubtotalGravado: 0.00,
                    SubTotalExcento: 0.00,
                    SubTotal: 0.00,
                    Total: 0.00,
                    Monto_Descuento: 0.00,
                    Descuento: 0,
                    Precio_A: 0.00,
                    Precio_B: 0.00,
                    Precio_C: 0.00,
                    Precio_D: 0.00,
                    Cabys: '',
                    Existencia: '',
                    CodigoP: 0,
                    CodigoMonedaVenta: 0,
                    PrecioOtros: 0.00,
                    SubFamilia: '',
                    MaxDescuento: 0,
                },
            }

        case types.SetCleanBudgets:
            return {
                startOpeningBudget: false,
                activeButtonPrint: false,
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonEdit: false,
                disableInputs: true,
                disableInputsChecks: true,
                disableInputsArticles: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                nameUser: '',
                idUsuario: '',
                numApertura: 0,
                numCaja: 0,
                allCustomers: [],
                customerData: {
                    codigoCliente: '',
                    nombreCliente: '',
                    contactoCliente: '',
                    telefonoCliente: '',
                    tipocedulaCliente: '',
                    cedulaCliente: '',
                    tipoPrecioCliente: 0,
                    maximoDescuentoCliente: 0,
                },
                validezDias: '',
                tiempoEntrega: '',
                fechaCotizacion: isoDateTime[0],
                moneda: '',
                monedaNombre: '',
                costoTransporte: 0.00,
                nombrequienCotiza: '',
                confirmadaPor: 'Sin Confirmar',
                observaciones: '',
                isCredito: false,
                isContado: false,
                isConfirm: false,
                isAnulate: false,
                isEditArticle: false,
                isNewArticle: true,
                detalleArticuloActual: {
                    CodArticulo: '',
                    Descripcion: '',
                    Cantidad: 0,
                    Costo: 0.00,
                    Impuesto: 0.00,
                    Monto_Impuesto: 0.00,
                    SubtotalGravado: 0.00,
                    SubTotalExcento: 0.00,
                    SubTotal: 0.00,
                    Total: 0.00,
                    Monto_Descuento: 0.00,
                    Descuento: 0,
                    Precio_A: 0.00,
                    Precio_B: 0.00,
                    Precio_C: 0.00,
                    Precio_D: 0.00,
                    Cabys: '',
                    Existencia: '',
                    CodigoP: 0,
                    CodigoMonedaVenta: 0,
                    PrecioOtros: 0.00,
                    SubFamilia: '',
                    MaxDescuento: 0,

                },
                detalleFactura: [],
                isOpenSearchInventoryBudgets: false,
                subTotalGeneral: 0.00,
                subTotalGravadoGeneral: 0.00,
                subTotalExentoGeneral: 0.00,
                descuentoGeneral: 0.00,
                impuestoVentaGeneral: 0.00,
                totalGeneral: 0.00,
                datosSucursal: [],
                datosReporte: [],
                datosReporteImprimir: [],
                fechaReporte: "",
                allCotizaciones: [],
            }



        default:
            return state;
    }

}