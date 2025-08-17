import { types } from "../types/types";

const initialState = {
    disableInputsHeader: true,
    isEnableActiveCredito: false,
    searchFicha: '',
    hasCustomerBilling: false,
    factura: {
        encabezado: {
            id: '',
            num_Factura: '',
            fecha: '',
            NumeroCaja: '',
            tipo: 0,
            cod_Cliente: '',
            idTipoCliente: 0,
            nombre_Cliente: '',
            cedula_Usuario: '',
            direccion: '',
            telefono: '',
            observaciones: '',
            empresa: '',
            correoComprobantes: '',
            Cod_Moneda: '',
            Orden: '0',
            SubTotalGravada: 0,
            SubTotalExento: 0,
            SubTotal: 0,
            Descuento: 0,
            Imp_Venta: 0,
            Total: 0,
            mag: false,
            fallecido: false,
            actualizado: false,
            cliente_Moroso: false,
            ordenCompra: false,
            sinrestriccion: false,
            ficha: 0,
            preventa: true,
            usuario: '',
            idDatoFacturacion: 0
        },
        detalle: []
    },
    detalleArticuloActual: {
        CodArticulo: '',
        codFxArticulo: 0,
        Descripcion: '',
        Cantidad: 1.00,
        Precio_Unit: 0.00,
        Descuento: 0.00,
        Monto_Descuento: 0.00,
        Impuesto: 0.00,
        Monto_Impuesto: 0.00,
        Existencias: 0,
        SubtotalGravado: 0.00,
        SubTotalExcento: 0.00,
        SubTotal: 0.00,
        precio_A: 0.00,
        precio_B: 0.00,
        precio_C: 0.00,
        precio_D: 0.00,
        precio_Promo: 0.00,
        Precio_UnitOriginal: 0.00,
        idLote: 0,
        nombreLote: ''
    },
};

export const consignmentReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetDisableInputsHeaderConsignment:
            return {
                ...state,
                disableInputsHeader: action.payload
            }

        case types.SetIsEnableActiveCreditoConsignment:
            return {
                ...state,
                isEnableActiveCredito: action.payload
            }

        case types.SetSearchFichaConsignment:
            return {
                ...state,
                searchFicha: action.payload
            }

        case types.SetIDFacturaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        id: action.payload
                    }
                }
            }

        case types.Setnum_FacturaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        num_Factura: action.payload
                    }
                }
            }

        case types.SetfechaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        fecha: action.payload
                    }
                }
            }

        case types.SetNumeroCajaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        NumeroCaja: action.payload
                    }
                }
            }

        case types.SettipoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        tipo: action.payload
                    }
                }
            }

        case types.Setcod_ClienteConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        cod_Cliente: action.payload
                    }
                }
            }

        case types.SetidTipoClienteConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        idTipoCliente: action.payload
                    }
                }
            }

        case types.Setnombre_ClienteConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        nombre_Cliente: action.payload
                    }
                }
            }

        case types.Setcedula_UsuarioConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        cedula_Usuario: action.payload
                    }
                }
            }

        case types.SetdireccionConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        direccion: action.payload
                    }
                }
            }

        case types.SettelefonoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        telefono: action.payload
                    }
                }
            }

        case types.SetobservacionesConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        observaciones: action.payload
                    }
                }
            }

        case types.SetempresaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        empresa: action.payload
                    }
                }
            }

        case types.SetcorreoComprobantesConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        correoComprobantes: action.payload
                    }
                }
            }

        case types.SetCod_MonedaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Cod_Moneda: action.payload
                    }
                }
            }

        case types.SetOrdenConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Orden: action.payload
                    }
                }
            }

        case types.SetSubTotalGravadaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        SubTotalGravada: action.payload
                    }
                }
            }

        case types.SetSubTotalExentoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        SubTotalExento: action.payload
                    }
                }
            }

        case types.SetSubTotalConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        SubTotal: action.payload
                    }
                }
            }

        case types.SetDescuentoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Descuento: action.payload
                    }
                }
            }

        case types.SetImp_VentaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Imp_Venta: action.payload
                    }
                }
            }

        case types.SetTotalConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Total: action.payload
                    }
                }
            }

        case types.SetmagConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        mag: action.payload
                    }
                }
            }

        case types.SetfallecidoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        fallecido: action.payload
                    }
                }
            }

        case types.SetactualizadoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        actualizado: action.payload
                    }
                }
            }

        case types.Setcliente_MorosoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        cliente_Moroso: action.payload
                    }
                }
            }

        case types.SetordenCompraConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        ordenCompra: action.payload
                    }
                }
            }

        case types.SetsinrestriccionConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        sinrestriccion: action.payload
                    }
                }
            }

        case types.SetfichaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        ficha: action.payload
                    }
                }
            }

        case types.SetpreventaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        preventa: action.payload
                    }
                }
            }

        case types.SetusuarioConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        usuario: action.payload
                    }
                }
            }

        case types.SetidDatoFacturacionConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        idDatoFacturacion: action.payload
                    }
                }
            }

        case types.SetCodArticuloDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        CodArticulo: action.payload
                    }
                }
            }

        case types.SetcodFxArticuloDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        codFxArticulo: action.payload
                    }
                }
            }

        case types.SetDescripcionDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Descripcion: action.payload
                    }
                }
            }

        case types.SetCantidadDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Cantidad: action.payload
                    }
                }
            }

        case types.SetPrecio_UnitDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Precio_Unit: action.payload
                    }
                }
            }

        case types.SetDescuentoDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Descuento: action.payload
                    }
                }
            }

        case types.SetMonto_DescuentoDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Monto_Descuento: action.payload
                    }
                }
            }

        case types.SetImpuestoDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Impuesto: action.payload
                    }
                }
            }

        case types.SetMonto_ImpuestoDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Monto_Impuesto: action.payload
                    }
                }
            }

        case types.SetExistenciasDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Existencias: action.payload
                    }
                }
            }

        case types.SetSubtotalGravadoDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        SubtotalGravado: action.payload
                    }
                }
            }

        case types.SetSubTotalExcentoDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        SubTotalExcento: action.payload
                    }
                }
            }

        case types.SetSubTotalDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        SubTotal: action.payload
                    }
                }
            }

        case types.Setprecio_ADetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        precio_A: action.payload
                    }
                }
            }

        case types.Setprecio_BDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        precio_B: action.payload
                    }
                }
            }

        case types.Setprecio_CDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        precio_C: action.payload
                    }
                }
            }

        case types.Setprecio_DDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        precio_D: action.payload
                    }
                }
            }

        case types.Setprecio_PromoDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        precio_Promo: action.payload
                    }
                }
            }

        case types.SetPrecio_UnitOriginalDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        Precio_UnitOriginal: action.payload
                    }
                }
            }

        case types.SetidLoteDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        idLote: action.payload
                    }
                }
            }

        case types.SetnombreLoteDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalleArticuloActual: {
                        ...state.detalleArticuloActual,
                        nombreLote: action.payload
                    }
                }
            }
            
        case types.SethasCustomerBillingConsignment:
            return {
                ...state,
                hasCustomerBilling: action.payload
            }
        
        case types.CleanStateBancosBank:
            return {
                ...state,
                activeButtonSave: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                nameUser: '',
                bancoActual: '',
                isEditBanco: false,
                idSeletedBanco: 0,
                startOpeningBank: false,
                bancos: [],
            }

        default:
            return state;
    }
};