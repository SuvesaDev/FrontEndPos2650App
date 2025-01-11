import { types } from '../types/types';

const initialState = {
    isOpenSearchComprasPurchaseReturns: false,
    detalleArticuloActual: {
        codFxArticulo: 0.00,
        CodArticulo: '',
        Descripcion: '',
        Cantidad: 0.00,
        Precio_Costo: 0.00,
        Precio_Base: 0,
        Precio_Flete: 0,
        Precio_Otros: 0,
        Descuento: 0,
        Monto_Descuento: 0,
        Impuesto: 0.00,
        Monto_Impuesto: 0.00,
        SubtotalGravado: 0.00,
        SubTotalExcento: 0,
        SubTotal: 0.00,
        Numero: ""
    },
    devolucion: {
        encabezado: {
            Id_Factura_Compra: 0.00,
            NumeroFactura: 0.00,
            Proveedor: '',
            SaldoAnt_Fact: 0.00,
            SubTotalGravado: 0.00,
            SubTotalExcento: 0.00,
            Descuento: 0.00,
            Impuesto: 0.00,
            Monto: 0.00,
            Fecha: '',
            Cedula_Usuario: '',
            Cod_Moneda: 0.00,
            idBodega: 0,
        },
        detalle: [],
        articulos: []
    },
    openSearchModal: false,
    searchPurchaseReturns: [],
    optionsSearchPurchaseReturns: {
        ValorFiltro: '',
        Nombre: true,
        Factura: false,
        Fechas: false,
        Desde: '',
        Hasta: ''
    },
};


export const PurchaseReturnsReducer = (state = initialState, action) => {
    switch (action.type) {

        //Consulta
        case types.SetIsOpenSearchComprasPurchaseReturns:
            return {
                ...state,
                isOpenSearchComprasPurchaseReturns: action.payload,
            }
        case types.SetopenSearchModalPurchaseReturns:
            return {
                ...state,
                openSearchModal: action.payload,
            }
        case types.SetsearchPurchaseReturns:
            return {
                ...state,
                searchPurchaseReturns: action.payload
            }
        case types.SetValorFiltroSearchModalPurchaseReturns:
            return {
                ...state,
                optionsSearchPurchaseReturns: {
                    ...state.optionsSearchPurchaseReturns,
                    valorfiltro: action.payload
                }
            }
        case types.SetNombreSearchModalPurchaseReturns:
            return {
                ...state,
                optionsSearchPurchaseReturns: {
                    ...state.optionsSearchPurchaseReturns,
                    Nombre: action.payload
                }
            }
        case types.SetFacturaSearchModalPurchaseReturns:
            return {
                ...state,
                optionsSearchPurchaseReturns: {
                    ...state.optionsSearchPurchaseReturns,
                    Factura: action.payload
                }
            }
        case types.SetFechasSearchModalPurchaseReturns:
            return {
                ...state,
                optionsSearchPurchaseReturns: {
                    ...state.optionsSearchPurchaseReturns,
                    Fechas: action.payload
                }
            }
        case types.SetDesdeSearchModalPurchaseReturns:
            return {
                ...state,
                optionsSearchPurchaseReturns: {
                    ...state.optionsSearchPurchaseReturns,
                    Desde: action.payload
                }
            }
        case types.SetHastaSearchModalPurchaseReturns:
            return {
                ...state,
                optionsSearchPurchaseReturns: {
                    ...state.optionsSearchPurchaseReturns,
                    Hasta: action.payload
                }
            }
        //Encabezado Devolucion
        case types.SetIdFacturaCompraPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Id_Factura_Compra: action.payload
                    }
                }
            }

        case types.SetIdBodegaPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        idBodega: action.payload
                    }
                }
            }

        case types.SetNumeroFacturaPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        NumeroFactura: action.payload
                    }
                }
            }
        case types.SetProveedorPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Proveedor: action.payload
                    }
                }
            }
        case types.SetSaldoAntFactPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        SaldoAnt_Fact: action.payload
                    }
                }
            }
        case types.SetSubTotalGravadoPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        SubTotalGravado: action.payload
                    }
                }
            }
        case types.SetSubTotalExcentoPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        SubTotalExcento: action.payload
                    }
                }
            }
        case types.SetDescuentoPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Descuento: action.payload
                    }
                }
            }
        case types.SetImpuestoPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Impuesto: action.payload
                    }
                }
            }
        case types.SetMontoPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Monto: action.payload
                    }
                }
            }
        case types.SetFechaPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Fecha: action.payload
                    }
                }
            }
        case types.SetCedulaUsuarioPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Cedula_Usuario: action.payload
                    }
                }
            }
        case types.SetCodMonedaPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Cod_Moneda: action.payload
                    }
                }
            }
        case types.CleanPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    encabezado: {
                        Id_Factura_Compra: 0.00,
                        NumeroFactura: 0.00,
                        Proveedor: '',
                        SaldoAnt_Fact: 0.00,
                        SubTotalGravado: 0.00,
                        SubTotalExcento: 0.00,
                        Descuento: 0.00,
                        Impuesto: 0.00,
                        Monto: 0.00,
                        Fecha: '',
                        Cedula_Usuario: '',
                        Cod_Moneda: 0.00,
                    },
                    detalle: [],
                    articulos: [],
                },
            }

        //Detalle Devolucion
        case types.SetCodigoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    codFxArticulo: action.payload,
                },
            }
        case types.SetCodArticuloDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CodArticulo: action.payload,
                },
            }
        case types.SetDescripcionDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descripcion: action.payload,
                },
            }
        case types.SetCantidadDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Cantidad: action.payload,
                },
            }
        case types.SetPrecioCostoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Costo: action.payload,
                },
            }
        case types.SetPrecioBaseDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Base: action.payload,
                },
            }
        case types.SetPrecioFleteDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Flete: action.payload,
                },
            }
        case types.SetPrecioOtrosDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Otros: action.payload,
                },
            }
        case types.SetDescuentoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descuento: action.payload,
                },
            }
        case types.SetMontoDescuentoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Descuento: action.payload,
                },
            }
        case types.SetImpuestoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Impuesto: action.payload,
                },
            }
        case types.SetMontoImpuestoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Impuesto: action.payload,
                },
            }
        case types.SetSubtotalGravadoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubtotalGravado: action.payload,
                },
            }
        case types.SetSubTotalExcentoDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotalExcento: action.payload,
                },
            }
        case types.SetSubTotalDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotal: action.payload,
                },
            }
        case types.SetNumeroDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Numero: action.payload,
                },
            }
        case types.SetAddDetallePurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    detalle: [
                        ...state.devolucion.detalle,
                        action.payload
                    ]
                }
            }
        case types.SetAddarticulosPurchaseReturns:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    articulos: [
                        ...state.devolucion.articulos,
                        action.payload
                    ]
                }
            }
        case types.SetAddDetalleActualPurchaseReturns:
            return {
                ...state,
                detalleArticuloActual: action.payload,
            }

        default:
            return state;
    }

}            