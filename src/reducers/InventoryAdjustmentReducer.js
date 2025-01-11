import { types } from '../types/types';

const initialState = {
    isOpenSearchInventoryAdjustment: false,
    PosicionActual: 0,
    detalleArticuloActual: {
        codFxArticulo: 0.00,
        CodArticulo: '',
        DescArticulo: '',
        Cantidad: 0.00,
        Entrada: true,
        Salida: false,
        CostoUnit: 0.00,
        observacion: '',
        TotalEntrada: 0.00,
        TotalSalida: 0.00,
        Existencia: 0.00,
        muerte: false,
    },
    ajuste: {
        encabezado: {
            Consecutivo: 0.00,
            Fecha: '',
            Anula: false,
            Cedula: '',
            TotalEntrada: 0.00,
            TotalSalida: 0.00,
            SaldoAjuste: 0.00,
            idSucursal: 0
        },
        detalle: []
    },
    openSearchModal: false,
    searchInventoryAdjustment: [],
    optionsSearchInventoryAdjustment: {
        ValorFiltro: '',
        Nombre: true,
        Factura: false,
        Fechas: false,
        Desde: '',
        Hasta: ''
    },
};


export const InventoryAdjustmentReducer = (state = initialState, action) => {
    switch (action.type) {
        //Consulta
        case types.SetIsOpenSearchInventoryAdjustment:
            return {
                ...state,
                isOpenSearchInventoryAdjustment: action.payload,
            }
        case types.SetopenSearchModalInventoryAdjustment:
            return {
                ...state,
                openSearchModal: action.payload,
            }
        case types.SetsearchInventoryAdjustment:
            return {
                ...state,
                searchInventoryAdjustment: action.payload
            }
        case types.SetValorFiltroSearchModalInventoryAdjustment:
            return {
                ...state,
                optionsSearchInventoryAdjustment: {
                    ...state.optionsSearchInventoryAdjustment,
                    valorfiltro: action.payload
                }
            }
        case types.SetNombreSearchModalInventoryAdjustment:
            return {
                ...state,
                optionsSearchInventoryAdjustment: {
                    ...state.optionsSearchInventoryAdjustment,
                    Nombre: action.payload
                }
            }
        case types.SetFacturaSearchModalInventoryAdjustment:
            return {
                ...state,
                optionsSearchInventoryAdjustment: {
                    ...state.optionsSearchInventoryAdjustment,
                    Factura: action.payload
                }
            }
        case types.SetFechasSearchModalInventoryAdjustment:
            return {
                ...state,
                optionsSearchInventoryAdjustment: {
                    ...state.optionsSearchInventoryAdjustment,
                    Fechas: action.payload
                }
            }
        case types.SetDesdeSearchModalInventoryAdjustment:
            return {
                ...state,
                optionsSearchInventoryAdjustment: {
                    ...state.optionsSearchInventoryAdjustment,
                    Desde: action.payload
                }
            }
        case types.SetHastaSearchModalInventoryAdjustment:
            return {
                ...state,
                optionsSearchInventoryAdjustment: {
                    ...state.optionsSearchInventoryAdjustment,
                    Hasta: action.payload
                }
            }

        //Encabezado AjusteInventario
        case types.SetConsecutivoInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        Consecutivo: action.payload
                    }
                }
            }
        case types.SetFechaInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        Fecha: action.payload
                    }
                }
            }
        case types.SetAnulaInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        Anula: action.payload
                    }
                }
            }
        case types.SetCedulaInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        Cedula: action.payload
                    }
                }
            }
        case types.SetTotalEntradaInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        TotalEntrada: action.payload
                    }
                }
            }
        case types.SetTotalSalidaInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        TotalSalida: action.payload
                    }
                }
            }
        case types.SetSaldoAjusteInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        SaldoAjuste: action.payload
                    }
                }
            }
        case types.SetidSucursalInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    encabezado: {
                        ...state.ajuste.encabezado,
                        idSucursal: action.payload
                    }
                }
            }
        case types.CleanInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    encabezado: {
                        Consecutivo: 0.00,
                        Fecha: '',
                        Anula: false,
                        Cedula: '',
                        TotalEntrada: 0.00,
                        TotalSalida: 0.00,
                        SaldoAjuste: 0.00,
                        idSucursal: 0
                    },
                    detalle: []
                },
            }

        //Detalle AjusteInventario
        case types.SetCodigoDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    codFxArticulo: action.payload,
                },
            }
        case types.SetCodArticuloDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CodArticulo: action.payload,
                },
            }
        case types.SetDescArticuloDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    DescArticulo: action.payload,
                },
            }
        case types.SetCantidadDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Cantidad: action.payload,
                },
            }
        case types.SetEntradaDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Entrada: action.payload,
                },
            }
        case types.SetSalidaDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Salida: action.payload,
                },
            }
        case types.SetCostoUnitDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CostoUnit: action.payload,
                },
            }
        case types.SetobservacionDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    observacion: action.payload,
                },
            }
        case types.SetTotalEntradaDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    TotalEntrada: action.payload,
                },
            }
        case types.SetTotalSalidaDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    TotalSalida: action.payload,
                },
            }
        case types.SetExistenciaDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Existencia: action.payload,
                },
            }
        case types.SetmuerteDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    muerte: action.payload,
                },
            }
        case types.SetAddDetalleInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    detalle: [
                        ...state.ajuste.detalle,
                        action.payload
                    ]
                }
            }
        case types.SetAddDetalleActualInventoryAdjustment:
            return {
                ...state,
                detalleArticuloActual: action.payload,
            }
        case types.SetDeleteDetalleInventoryAdjustment:
            return {
                ...state,
                ajuste: {
                    ...state.ajuste,
                    detalle: state.ajuste.detalle.filter(linea => linea != action.payload)
                }
            }
        default:
            return state;
    }

}            