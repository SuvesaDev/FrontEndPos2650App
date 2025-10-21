import { types } from "../types/types";

const initialState = {
    disableInputsHeader: true,
    isEnableActiveCredito: false,
    searchFicha: '',
    hasCustomerBilling: false,
    enableItems: false,
    activeButtonSave: false,
    activeButtonSearch: false,
    startOpening: false,
    visiblePassword: false,
    disableInputsUser: false,
    openSearchCustomerConsignment: false,
    openAddCustomerConsignment: false,
    isOpenModalSearchArticuloConsignment: false,
    lotesByArticulo: [],
    plazos: [],
    isEditDetalle: false,
    posicionActual: 0,
    isEditConsignment: false,
    isAllowAceptaConsignacion: false,
    surcursales: [],
    usuarioFacturacion: {
        id: 0,
        claveInterna: ''
    },
    clienteFacturacion: {
        idTipoCliente: 0,
        cedula: '',
        nombre: '',
        telefono: '',
        email: '',
        direccion: ''
    },
    buscarConsignacion: {
        cedula: '',
        nombre: '',
        numero: '',
    },
    listaConsignaciones: [],
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
            surcursal: 0,
            empresa: '',
            correoComprobantes: '',
            Cod_Moneda: '',
            Orden: '0',
            plazo: 0,
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
            idDatoFacturacion: 0,
            aprobacion: false
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
        max_Descuento: 0.00,
        ImpuestoOriginal: 0.00,
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

        case types.SetsurcursalConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        surcursal: action.payload
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

        case types.SetPlazoConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        plazo: action.payload
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

        case types.SetAprobacionConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        aprobacion: action.payload
                    }
                }
            }

        case types.SetCodArticuloDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CodArticulo: action.payload
                }
            }

        case types.SetcodFxArticuloDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    codFxArticulo: action.payload
                }
            }

        case types.SetDescripcionDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descripcion: action.payload
                }
            }

        case types.SetCantidadDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Cantidad: action.payload
                }
            }

        case types.SetPrecio_UnitDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Unit: action.payload
                }
            }

        case types.SetDescuentoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descuento: action.payload
                }
            }

        case types.SetMonto_DescuentoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Descuento: action.payload
                }
            }

        case types.SetImpuestoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Impuesto: action.payload
                }
            }

        case types.SetMonto_ImpuestoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Impuesto: action.payload
                }
            }

        case types.SetExistenciasDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Existencias: action.payload
                }
            }

        case types.SetSubtotalGravadoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubtotalGravado: action.payload
                }
            }

        case types.SetSubTotalExcentoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotalExcento: action.payload
                }
            }

        case types.SetSubTotalDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotal: action.payload
                }
            }

        case types.Setprecio_ADetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    precio_A: action.payload
                }
            }

        case types.Setprecio_BDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    precio_B: action.payload
                }
            }

        case types.Setprecio_CDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    precio_C: action.payload
                }
            }

        case types.Setprecio_DDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    precio_D: action.payload
                }
            }

        case types.Setprecio_PromoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    precio_Promo: action.payload
                }
            }

        case types.Setmax_DescuentoDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    max_Descuento: action.payload
                }
            }

        case types.SetPrecio_UnitOriginalDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_UnitOriginal: action.payload
                }
            }

        case types.SetImpuestoOriginalDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    ImpuestoOriginal: action.payload
                }
            }

        case types.SetidLoteDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    idLote: action.payload
                }
            }

        case types.SetnombreLoteDetalleConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    nombreLote: action.payload
                }
            }
            
        case types.SethasCustomerBillingConsignment:
            return {
                ...state,
                hasCustomerBilling: action.payload
            }

        case types.SetenableItemsConsignment:
            return {
                ...state,
                enableItems: action.payload
            }

        case types.SetactiveButtonSaveConsignment:
            return {
                ...state,
                activeButtonSave: action.payload
            }

        case types.SetstartOpeningConsignment:
            return {
                ...state,
                startOpening: action.payload
            }

        case types.SetvisiblePasswordConsignment:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetdisableInputsUserConsignment:
            return {
                ...state,
                disableInputsUser: action.payload
            }

        case types.SetidClienteFacturacionConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    id: action.payload
                }
            }

        case types.SetclaveInternaConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    claveInterna: action.payload
                }
            }

        case types.SetOpenSearchCustomerConsignment:
            return {
                ...state,
                openSearchCustomerConsignment: action.payload
            }

        case types.SetidTipoClienteAddConsignment:
            return {
                ...state,
                clienteFacturacion: {
                    ...state.clienteFacturacion,
                    idTipoCliente: action.payload
                }
            }

        case types.SetcedulaAddConsignment:
            return {
                ...state,
                clienteFacturacion: {
                    ...state.clienteFacturacion,
                    cedula: action.payload
                }
            }

        case types.SetnombreAddConsignment:
            return {
                ...state,
                clienteFacturacion: {
                    ...state.clienteFacturacion,
                    nombre: action.payload
                }
            }

        case types.SettelefonoAddConsignment:
            return {
                ...state,
                clienteFacturacion: {
                    ...state.clienteFacturacion,
                    telefono: action.payload
                }
            }

        case types.SetemailAddConsignment:
            return {
                ...state,
                clienteFacturacion: {
                    ...state.clienteFacturacion,
                    email: action.payload
                }
            }

        case types.SetdireccionAddConsignment:
            return {
                ...state,
                clienteFacturacion: {
                    ...state.clienteFacturacion,
                    direccion: action.payload
                }
            }

        case types.CleanAddCustomerConsignment:
            return {
                ...state,
                clienteFacturacion: {
                    idTipoCliente: 0,
                    cedula: '',
                    nombre: '',
                    telefono: '',
                    email: '',
                    direccion: ''
                }
            }

        case types.SetOpenAddCustomerConsignment:
            return {
                ...state,
                openAddCustomerConsignment: action.payload
            }

        case types.SetOpenSearchInventoryConsignment:
            return {
                ...state,
                isOpenModalSearchArticuloConsignment: action.payload
            }

        case types.SetAddDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalle: [
                        ...state.factura.detalle,
                        action.payload
                    ]
                }
            }

        case types.CleanDetalleActualConsignment:
            return {
                ...state,
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
                    max_Descuento: 0.00,
                    ImpuestoOriginal: 0.00,
                    Precio_UnitOriginal: 0.00,
                    idLote: 0,
                    nombreLote: ''
                },
            }

        case types.SetLotesByArticuloConsignment:
            return {
                ...state,
                lotesByArticulo: action.payload
            }

        case types.SetPlazosConsignment:
            return {
                ...state,
                plazos: action.payload
            }
        
        case types.CleanFacturaConsignment:
            return {
                ...state,
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
                        plazo: 0,
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
                    max_Descuento: 0.00,
                    ImpuestoOriginal: 0.00,
                    Precio_UnitOriginal: 0.00,
                    idLote: 0,
                    nombreLote: ''
                }
            }

        case types.SetIsEditDetalleConsignment:
            return {
                ...state,
                isEditDetalle: action.payload
            }

        case types.SetAddDetalleActualConsignment:
            return {
                ...state,
                detalleArticuloActual: action.payload
            }

        case types.SetPosicionActualConsignment:
            return {
                ...state,
                posicionActual: action.payload
            }

        case types.SetEditDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalle: state.factura.detalle.map(
                        (linea, i) => i === action.payload.index
                            ? action.payload.detalle
                            : linea
                    )
                }
            }

        case types.SetDeleteDetalleConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalle: state.factura.detalle.filter(linea => linea != action.payload)
                }
            }

        case types.SetactiveButtonSearchConsignment:
            return {
                ...state,
                activeButtonSearch: action.payload
            }

        case types.SetCedulaBuscarConsignment:
            return {
                ...state,
                buscarConsignacion: {
                    ...state.buscarConsignacion,
                    cedula: action.payload
                }
            }

        case types.SetNombreBuscarConsignment:
            return {
                ...state,
                buscarConsignacion: {
                    ...state.buscarConsignacion,
                    nombre: action.payload
                }
            }

        case types.SetNumeroBuscarConsignment:
            return {
                ...state,
                buscarConsignacion: {
                    ...state.buscarConsignacion,
                    numero: action.payload
                }
            } 
            
        case types.SetListaConsignacionesConsignment:
            return {
                ...state,
                listaConsignaciones: action.payload
            }

        case types.SetDetalleFacturaConsignment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalle: action.payload
                }
            }

        case types.SetIsEditConsignment:
            return {
                ...state,
                isEditConsignment: action.payload,
            }

        case types.SetIsAllowAceptaConsignacionConsignment:
            return {
                ...state,
                isAllowAceptaConsignacion: action.payload,
            }

        case types.CleanSearchConsignment:
            return {
                ...state,
                buscarConsignacion: {
                    cedula: '',
                    nombre: '',
                    numero: '',
                },
                listaConsignaciones: []
            }

        case types.SetSurcursalesConsignment:
            return {
                ...state,
                surcursales: action.payload,
            }

        case types.CleanConsignment:
            return {
                disableInputsHeader: true,
                isEnableActiveCredito: false,
                searchFicha: '',
                hasCustomerBilling: false,
                enableItems: false,
                activeButtonSave: false,
                activeButtonSearch: false,
                startOpening: false,
                visiblePassword: false,
                disableInputsUser: false,
                openSearchCustomerConsignment: false,
                openAddCustomerConsignment: false,
                isOpenModalSearchArticuloConsignment: false,
                lotesByArticulo: [],
                plazos: [],
                isEditDetalle: false,
                posicionActual: 0,
                isEditConsignment: false,
                isAllowAceptaConsignacion: false,
                surcursales: [],
                usuarioFacturacion: {
                    id: 0,
                    claveInterna: ''
                },
                clienteFacturacion: {
                    idTipoCliente: 0,
                    cedula: '',
                    nombre: '',
                    telefono: '',
                    email: '',
                    direccion: ''
                },
                buscarConsignacion: {
                    cedula: '',
                    nombre: '',
                    numero: '',
                },
                listaConsignaciones: [],
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
                        surcursal: 0,
                        empresa: '',
                        correoComprobantes: '',
                        Cod_Moneda: '',
                        Orden: '0',
                        plazo: 0,
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
                    max_Descuento: 0.00,
                    ImpuestoOriginal: 0.00,
                    Precio_UnitOriginal: 0.00,
                    idLote: 0,
                    nombreLote: ''
                }
            }

        default:
            return state;
    }
};