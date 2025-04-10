import { types } from '../types/types';

const initialState = {
    billings: [],
    aumentoExtranjero: 0.00,
    empresas: [],
    showInfoMessage: false,
    numCaja: 0,
    numApertura: 0,
    activeButtonSave: false,
    modalAddCustomerOpen: false,
    modalEditCustomerOpen: false,
    modalMAGCustomerOpen: false,
    modalAddCorreosOpen: false,
    modalEditCartaExoneracionOpen: false,
    cedulaBuscar: '',
    openSearchCustomerBilling: false,
    hasCustomerBilling: false,
    disableInputsHeader: true,
    visiblePassword: false,
    disableInputsUser: false,
    aumentoExtranjero: 0.00,
    extranjero: false,
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
    clienteFacturacionEdit: {
        identificacion: 0,
        idTipoCliente: 0,
        telefono: null,
        email: null,
        direccion: null,
        correocuentas: null,
        correoFacturacion: null,
        agente: null,
        actualizado: false,
        fallecido: false,
        enviaRecibo: false,
        correoRecibo: null,
        tipoPrecio: null,
        descuentoEspcial: null,
        inactivo: false,
        mag: false,
        abierto: false
    },
    correoComprobanteActual: '',
    correosComprobantes: [],
    isCorreosComprobanteEdit: false,
    seletedCorreosComprobanteEdit: null,
    isOpenSearchInventoryBilling: false,
    autoFocusPrecioUnit: false,
    autoFocusDesc: false,
    autoFocusCantidad: false,
    autoFocusCodigo: false,
    isEnableActiveCredito: false,
    isEditDetalleActual: false,
    isDeleteDetalleActual: false,
    changeDetalle: false,
    detalleArticuloActual: {
        CodArticulo: 0,
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
        promo_Activa: false,
        promo_Inicio: null,
        promo_Finaliza: null,
        max_Descuento: 0.00,
        Mag: false,
        sinDecimal: false,
        soloContado: false,
        receta: false,
        ImpuestoOriginal: 0.00,
        Consignacion: 0.00,
        Id_Bodega: 0,
        ExistenciaBodega: 0.00,
        CantVet: 0.00,
        CantBod: 0.00,
        Precio_UnitOriginal: 0.00,
        idLote: 0,
        nombreLote: ''
    },
    detalleArticuloDelete: {
        Precio_Unit: 0.00,
        Cantidad: 1.00,
        Monto_Impuesto: 0.00,
        Impuesto: 0.00,
        Monto_Descuento: 0.00,
        precio_A: 0.00,
        precio_B: 0.00,
        precio_C: 0.00,
        precio_D: 0.00,
        precio_Promo: 0.00,
        promo_Activa: false,
        promo_Inicio: null,
        promo_Finaliza: null,
        max_Descuento: 0.00,
        Mag: false,
        sinDecimal: false,
        soloContado: false,
        receta: false,
        ImpuestoOriginal: 0.00,
        Consignacion: 0.00,
        Id_Bodega: 0,
        ExistenciaBodega: 0.00,
        CantVet: 0.00,
        CantBod: 0.00,
        idLote: 0,
        nombreLote: ''
    },
    cartaBilling: {
        id: null,
        cedula: null,
        motivo: null,
        numeroDocumento: null,
        fechaEmision: null,
        fechaVence: null,
        porcentajeCompra: 0,
        impuesto: 0,
        nota: null,
        estado: null
    },
    HasCartaExoneracionBilling: false,
    isCostaPets: false,
    factura: {
        encabezado: {
            id: '',
            num_Factura: '',
            fecha: '',
            NumeroCaja: '',
            tipo: 2,
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
            Taller: '',
            Mascotas: '',
            agente: false,
            cod_agente: 0,
            PD: false,
            SubTotalGravada: 0,
            SubTotalExento: 0,
            SubTotal: 0,
            Descuento: 0,
            Imp_Venta: 0,
            MontoCupon: '',
            Exonerar: '',
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
    hasHeader: false,
    descuentoGeneral: 0.00,
    AplicaDescuento: false,
    ActualizoCarta: false,
    PosicionActual: 0.00,
    ClienteMAG: {
        nombre: '',
        estado: false,
        fechabaja: ''
    },
    searchFicha: '',
    isPreventaEdit: false,
    startEditing: false,
    datosImprimirCredito: [],
    lotesByArticulo: [],
    datosFacturacionByCliente: []
};

export const BillingReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetAddArrayStateBilling:
            return {
                ...state,
                billings: [
                    ...state.billings,
                    action.payload
                ]
            }

        case types.SetRemoveArrayStateBilling:
            return {
                ...state,
                billings: state.billings.filter(billing => billing.idBilling != action.payload)
            }

        case types.SetActiveButtonSaveBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            activeButtonSave: action.payload.value,
                        }
                        : billing
                )
            }

        case types.billingOpenModelAddCustomer:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalAddCustomerOpen: true,
                        }
                        : billing
                )
            }

        case types.billingCloseModelAddCustomer:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalAddCustomerOpen: false,
                        }
                        : billing
                )
            }

        case types.billingOpenModelEditCustomer:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalEditCustomerOpen: true,
                        }
                        : billing
                )
            }

        case types.billingCloseModelEditCustomer:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalEditCustomerOpen: false,
                        }
                        : billing
                )
            }

        case types.billingOpenModelEditCartaExoneracion:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalEditCartaExoneracionOpen: true,
                        }
                        : billing
                )
            }

        case types.billingCloseModelEditCartaExoneracion:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalEditCartaExoneracionOpen: false,
                        }
                        : billing
                )
            }

        case types.billingOpenModelMAGCustomer:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalMAGCustomerOpen: true,
                        }
                        : billing
                )
            }

        case types.billingCloseModelMAGCustomer:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalMAGCustomerOpen: false,
                        }
                        : billing
                )
            }

        case types.SetCedulaBuscarBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cedulaBuscar: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetCodClienteBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    cod_Cliente: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetIdTipoClienteBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    idTipoCliente: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetNombreClienteBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    nombre_Cliente: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetCedulaUsuarioBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    cedula_Usuario: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetDireccionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    direccion: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetTelefonoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    telefono: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetObservacionesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    observaciones: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetEmpresaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    empresa: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetCorreoComprobantesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    correoComprobantes: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetIdTipoClienteClienteFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacion: {
                                ...state.billings[action.payload.number].clienteFacturacion,
                                idTipoCliente: action.payload.value
                            },
                        }
                        : billing
                )
            }

        case types.SetCedulaClienteFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacion: {
                                ...state.billings[action.payload.number].clienteFacturacion,
                                cedula: action.payload.value
                            },
                        }
                        : billing
                )
            }

        case types.SetNombreClienteFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacion: {
                                ...state.billings[action.payload.number].clienteFacturacion,
                                nombre: action.payload.value
                            },
                        }
                        : billing
                )
            }

        case types.SetTelefonoClienteFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacion: {
                                ...state.billings[action.payload.number].clienteFacturacion,
                                telefono: action.payload.value
                            },
                        }
                        : billing
                )
            }

        case types.SetEmailClienteFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacion: {
                                ...state.billings[action.payload.number].clienteFacturacion,
                                email: action.payload.value
                            },
                        }
                        : billing
                )
            }

        case types.SetDireccionClienteFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacion: {
                                ...state.billings[action.payload.number].clienteFacturacion,
                                direccion: action.payload.value
                            },
                        }
                        : billing
                )
            }

        case types.CleanClienteFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacion: {
                                idTipoCliente: 0,
                                cedula: '',
                                nombre: '',
                                telefono: '',
                                email: '',
                                direccion: ''
                            },
                        }
                        : billing
                )
            }

        case types.OpenSearchCustomerBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            openSearchCustomerBilling: action.payload.value
                        }
                        : billing
                )
            }

        case types.hasCustomerBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            hasCustomerBilling: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetIdTipoClienteCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                idTipoCliente: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetTelefonoCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                telefono: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetEmailCustomerEditBilling:
            return {
                ...state,
                clienteFacturacionEdit: {
                    ...state.clienteFacturacionEdit,
                    email: action.payload
                }
            }

        case types.SetDireccionCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                direccion: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetCorreocuentasCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                correocuentas: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetCorreoFacturacionCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                correoFacturacion: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetAgenteCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                agente: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetSinAgenteCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                sinAgente: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetActualizadoCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                actualizado: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetFallecidoCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                fallecido: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetEnviaReciboCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                enviaRecibo: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetCorreoReciboCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                correoRecibo: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetTipoPrecioCustomerEditBilling:
            return {
                ...state,
                clienteFacturacionEdit: {
                    ...state.clienteFacturacionEdit,
                    tipoPrecio: action.payload
                }
            }

        case types.SetDescuentoEspcialCustomerEditBilling:
            return {
                ...state,
                clienteFacturacionEdit: {
                    ...state.clienteFacturacionEdit,
                    descuentoEspcial: action.payload
                }
            }

        case types.SetInactivoCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                inactivo: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetMagCustomerEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            clienteFacturacionEdit: {
                                ...state.billings[action.payload.number].clienteFacturacionEdit,
                                mag: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.OpenAddCorreosModalBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            modalAddCorreosOpen: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetCorreoComprobanteActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            correoComprobanteActual: action.payload.value
                        }
                        : billing
                )
            }

        case types.CleanCorreoComprobanteActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            correoComprobanteActual: ''
                        }
                        : billing
                )
            }

        case types.SetAddCorreoComprobantesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            correosComprobantes: [
                                ...state.billings[action.payload.number].correosComprobantes,
                                action.payload.value
                            ]
                        }
                        : billing
                )
            }

        case types.CleanCorreoComprobantesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            correosComprobantes: []
                        }
                        : billing
                )
            }

        case types.IsCorreoComprobanteEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            isCorreosComprobanteEdit: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetEditCorreoComprobantesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            correosComprobantes: state.billings[action.payload.number].correosComprobantes.map(
                                (correo, i) => i === action.payload.index
                                    ? {
                                        ...correo,
                                        correoComprobante: action.payload.correoComprobante
                                    }
                                    : correo)
                        }
                        : billing
                )
            }

        case types.SeletedCorreoComprobantesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            seletedCorreosComprobanteEdit: action.payload.value
                        }
                        : billing
                )
            }

        case types.CleanSeletedCorreoComprobantesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            seletedCorreosComprobanteEdit: null
                        }
                        : billing
                )
            }

        case types.SetAllCorreoComprobantesBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            correosComprobantes: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetOrdenEncabezadoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    Orden: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetCod_MonedaEncabezadoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    Cod_Moneda: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetagenteEncabezadoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    agente: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetCod_AgenteEncabezadoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    cod_agente: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetPDEncabezadoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    PD: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetTipoEncabezadoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    tipo: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetSubTotalGravadaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    SubTotalGravada: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetSubTotalExentoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    SubTotalExento: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetSubTotalBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    SubTotal: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetDescuentoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    Descuento: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetImp_VentaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    Imp_Venta: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetMontoCuponBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        MontoCupon: action.payload
                    }
                }
            }

        case types.SetExonerarBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Exonerar: action.payload
                    }
                }
            }

        case types.SetTotalBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    Total: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetMagBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    mag: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetFallecidoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    fallecido: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetActualizadoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    actualizado: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetClienteMorosoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    cliente_Moroso: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetObligaOrdenCompraBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    ordenCompra: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetSinRestriccionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    sinrestriccion: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetFichaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    ficha: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetPreventaBilling:
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

        case types.SetUsuarioBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    usuario: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetDatoFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                encabezado: {
                                    ...state.billings[action.payload.number].factura.encabezado,
                                    idDatoFacturacion: action.payload.value
                                }
                            }
                        }
                        : billing
                )
            }

        case types.SetCodigoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                codFxArticulo: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetCodArticuloDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                CodArticulo: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetDescripcionDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Descripcion: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetCantidadDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Cantidad: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPrecio_UnitDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Precio_Unit: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetDescuentoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Descuento: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetMonto_DescuentoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Monto_Descuento: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetImpuestoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Impuesto: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetMonto_ImpuestoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Monto_Impuesto: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetExistenciasDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Existencias: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetSubtotalGravadoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                SubtotalGravado: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetSubTotalExcentoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                SubTotalExcento: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetSubTotalDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                SubTotal: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPrecioADetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                precio_A: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPrecioBDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                precio_B: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPrecioCDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                precio_C: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPrecioDDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                precio_D: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPrecioPromoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                precio_Promo: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPromoActivaDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                promo_Activa: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPromoIniciaDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                promo_Inicio: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPromoFinalizaDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                promo_Finaliza: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetMaxDescuentoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                max_Descuento: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetMagDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Mag: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetSinDecimalDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                sinDecimal: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetSoloContadoDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                soloContado: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetRecetaDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                receta: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetImpuestoOriginalDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                ImpuestoOriginal: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetConsignacionDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Consignacion: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetId_BodegaDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Id_Bodega: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetExistenciaBodegaDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                ExistenciaBodega: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetCantVetDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                CantVet: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetCantBodDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                CantBod: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetPrecio_UnitOriginalDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                Precio_UnitOriginal: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetIdLoteDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                idLote: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetNombreLoteDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                ...state.billings[action.payload.number].detalleArticuloActual,
                                nombreLote: action.payload.value,
                            },
                        }
                        : billing
                )
            }

        case types.SetUsuarioDetalleActualBilling:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CantBod: action.payload,
                },
            }

        case types.SetAddDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetOpenSearchInventoryBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            isOpenSearchInventoryBilling: action.payload.value,
                        }
                        : billing
                )
            }

        case types.SetautoFocusPrecioUnitBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            autoFocusPrecioUnit: action.payload.value,
                        }
                        : billing
                )
            }

        case types.SetautoFocusDescBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            autoFocusDesc: action.payload.value,
                        }
                        : billing
                )
            }

        case types.SetautoFocusCantidadBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            autoFocusCantidad: action.payload.value,
                        }
                        : billing
                )
            }

        case types.SetautoFocusCodigoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            autoFocusCodigo: action.payload.value,
                        }
                        : billing
                )
            }

        case types.SetAddDetalleBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                detalle: [
                                    ...state.billings[action.payload.number].factura.detalle,
                                    action.payload.value
                                ]
                            }
                        }
                        : billing
                )
            }

        case types.SetIdCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                id: action.payload.value
                            }
                        }
                        : billing
                )
            }
        case types.SetCedulaCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                cedula: action.payload.value
                            }
                        }
                        : billing
                )
            }
        case types.SetidTipoExoneracionCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                motivo: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetNumeroDocumentoCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                numeroDocumento: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetFechaEmisionCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                fechaEmision: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetFechaVenceCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                fechaVence: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetPorcentajeCompraCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                porcentajeCompra: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetImpuestoCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                impuesto: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetNotaCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                nota: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetEstadoCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                ...state.billings[action.payload.number].cartaBilling,
                                estado: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.CleanStateCartaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            cartaBilling: {
                                id: null,
                                motivo: null,
                                numeroDocumento: null,
                                fechaEmision: null,
                                fechaVence: null,
                                porcentajeCompra: 0,
                                impuesto: 0,
                                nota: null
                            }
                        }
                        : billing
                )
            }

        case types.SetSearchCartaBilling:
            return {
                ...state,
                cartaBilling: action.payload
            }

        case types.SetHasCartaExoneracionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            HasCartaExoneracionBilling: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetEditDetalleBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                detalle: state.billings[action.payload.number].factura.detalle.map(
                                    (linea, i) => i === action.payload.index
                                        ? action.payload.detalle
                                        : linea
                                )
                            }
                        }
                        : billing
                )
            }

        case types.SetDeleteDetalleBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: {
                                ...state.billings[action.payload.number].factura,
                                detalle: state.billings[action.payload.number].factura.detalle.filter(linea => linea != action.payload.value)
                            }
                        }
                        : billing
                )
            }

        case types.SetIsEnableActiveCreditoBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            isEnableActiveCredito: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetIsEditDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            isEditDetalleActual: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetIsDeleteDetalleActualBilling:
            return {
                ...state,
                isDeleteDetalleActual: action.payload
            }

        case types.SetDetalleArticuloDeleteBilling:
            return {
                ...state,
                detalleArticuloDelete: action.payload
            }


        case types.SetDatosImprimirCreditoBilling:
            return {
                ...state,
                datosImprimirCredito: action.payload
            }



        case types.CleanDetalleArticuloDeleteBilling:
            return {
                ...state,
                detalleArticuloDelete: {
                    Precio_Unit: 0.00,
                    Cantidad: 1.00,
                    Monto_Impuesto: 0.00,
                    Impuesto: 0.00,
                    Monto_Descuento: 0.00,
                    //TODO: Agregar campos nuevos
                }
            }

        case types.SetChangeDetalleBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            changeDetalle: action.payload.value
                        }
                        : billing
                )
            }

        case types.CleanDetalleActualBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            detalleArticuloActual: {
                                CodArticulo: 0,
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
                                promo_Activa: false,
                                promo_Inicio: null,
                                promo_Finaliza: null,
                                max_Descuento: 0.00,
                                Mag: false,
                                sinDecimal: false,
                                soloContado: false,
                                receta: false,
                                ImpuestoOriginal: 0.00,
                                Consignacion: 0.00,
                                Id_Bodega: 0,
                                ExistenciaBodega: 0.00,
                                CantVet: 0.00,
                                CantBod: 0.00,
                                idLote: 0,
                                nombreLote: ''
                            },
                        }
                        : billing
                )
            }

        case types.hasHeader:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            hasHeader: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetDescuentoGeneral:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            descuentoGeneral: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetAplicaDescuento:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            AplicaDescuento: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetActualizoCarta:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            ActualizoCarta: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetPosicionActual:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            PosicionActual: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetClienteMAGBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            ClienteMAG: action.payload.value
                        }
                        : billing
                )
            }

        case types.CleanClienteMAGBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            ClienteMAG: {
                                nombre: '',
                                estado: false,
                                fechabaja: ''
                            }
                        }
                        : billing
                )
            }

        case types.SetIdUserFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            usuarioFacturacion: {
                                ...state.billings[action.payload.number].usuarioFacturacion,
                                id: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetClaveInternaFacturacionBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            usuarioFacturacion: {
                                ...state.billings[action.payload.number].usuarioFacturacion,
                                claveInterna: action.payload.value
                            }
                        }
                        : billing
                )
            }

        case types.SetDisableInputsHeaderBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            disableInputsHeader: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetVisibleClaveInternaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            visiblePassword: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetDisableInputsUserBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            disableInputsUser: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetInsertEmpresasBilling:
            return {
                ...state,
                empresas: action.payload
            }

        case types.SetSearchFichaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            searchFicha: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetInsertPreventaBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            factura: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetIsPreventaEditBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            isPreventaEdit: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetStartEditingBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            startEditing: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetAumentoEntrajeroBilling:
            return {
                ...state,
                aumentoExtranjero: action.payload
            }

        case types.SetExtranjeroBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            extranjero: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetEnableItemsBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            enableItems: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetStartOpeningBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            startOpening: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetShowInfoMessageBilling:
            return {
                ...state,
                showInfoMessage: action.payload
            }

        case types.SetNumCajaBilling:
            return {
                ...state,
                numCaja: action.payload
            }

        case types.SetNumAperturaBilling:
            return {
                ...state,
                numApertura: action.payload
            }

        case types.SetIsCostaPetsBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            isCostaPets: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetLotesByArticuloBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            lotesByArticulo: action.payload.value
                        }
                        : billing
                )
            }

        case types.SetDatosFacturacionByClienteBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            datosFacturacionByCliente: action.payload.value
                        }
                        : billing
                )
            }

        case types.CleanBilling:
            return {
                ...state,
                billings: state.billings.map(
                    (billing, i) => i === action.payload.number
                        ? {
                            ...state.billings[action.payload.number],
                            activeButtonSave: false,
                            modalAddCustomerOpen: false,
                            modalEditCustomerOpen: false,
                            modalMAGCustomerOpen: false,
                            modalAddCorreosOpen: false,
                            modalEditCartaExoneracionOpen: false,
                            cedulaBuscar: '',
                            openSearchCustomerBilling: false,
                            hasCustomerBilling: false,
                            disableInputsHeader: true,
                            visiblePassword: false,
                            disableInputsUser: false,
                            extranjero: false,
                            enableItems: false,
                            startOpening: false,
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
                            clienteFacturacionEdit: {
                                identificacion: 0,
                                idTipoCliente: 0,
                                telefono: null,
                                email: null,
                                direccion: null,
                                correocuentas: null,
                                correoFacturacion: null,
                                agente: null,
                                sinAgente: false,
                                actualizado: false,
                                fallecido: false,
                                enviaRecibo: false,
                                correoRecibo: null,
                                tipoPrecio: null,
                                descuentoEspcial: null,
                                inactivo: false,
                                mag: false,
                                abierto: false
                            },
                            correoComprobanteActual: '',
                            correosComprobantes: [],
                            isCorreosComprobanteEdit: false,
                            seletedCorreosComprobanteEdit: null,
                            isOpenSearchInventoryBilling: false,
                            autoFocusPrecioUnit: false,
                            autoFocusDesc: false,
                            autoFocusCantidad: false,
                            autoFocusCodigo: false,
                            isEnableActiveCredito: false,
                            isEditDetalleActual: false,
                            isDeleteDetalleActual: false,
                            changeDetalle: false,
                            detalleArticuloActual: {
                                CodArticulo: 0,
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
                                promo_Activa: false,
                                promo_Inicio: null,
                                promo_Finaliza: null,
                                max_Descuento: 0.00,
                                Mag: false,
                                sinDecimal: false,
                                soloContado: false,
                                receta: false,
                                ImpuestoOriginal: 0.00,
                                Consignacion: 0.00,
                                Id_Bodega: 0,
                                ExistenciaBodega: 0.00,
                                CantVet: 0.00,
                                CantBod: 0.00,
                                Precio_UnitOriginal: 0.00,
                                idLote: 0,
                                nombreLote: ''
                            },
                            detalleArticuloDelete: {
                                Precio_Unit: 0.00,
                                Cantidad: 1.00,
                                Monto_Impuesto: 0.00,
                                Impuesto: 0.00,
                                Monto_Descuento: 0.00,
                                precio_A: 0.00,
                                precio_B: 0.00,
                                precio_C: 0.00,
                                precio_D: 0.00,
                                precio_Promo: 0.00,
                                promo_Activa: false,
                                promo_Inicio: null,
                                promo_Finaliza: null,
                                max_Descuento: 0.00,
                                Mag: false,
                                sinDecimal: false,
                                soloContado: false,
                                receta: false,
                                ImpuestoOriginal: 0.00,
                                Consignacion: 0.00,
                                Id_Bodega: 0,
                                ExistenciaBodega: 0.00,
                                CantVet: 0.00,
                                CantBod: 0.00,
                                idLote: 0,
                                nombreLote: ''
                            },
                            cartaBilling: {
                                id: null,
                                cedula: null,
                                motivo: null,
                                numeroDocumento: null,
                                fechaEmision: null,
                                fechaVence: null,
                                porcentajeCompra: 0,
                                impuesto: 0,
                                nota: null,
                                estado: null
                            },
                            HasCartaExoneracionBilling: false,
                            isCostaPets: false,
                            factura: {
                                encabezado: {
                                    id: '',
                                    num_Factura: '',
                                    fecha: '',
                                    NumeroCaja: '',
                                    tipo: 2,
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
                                    Taller: '',
                                    Mascotas: '',
                                    agente: false,
                                    cod_agente: 0,
                                    PD: false,
                                    SubTotalGravada: 0,
                                    SubTotalExento: 0,
                                    SubTotal: 0,
                                    Descuento: 0,
                                    Imp_Venta: 0,
                                    MontoCupon: '',
                                    Exonerar: '',
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
                            hasHeader: false,
                            descuentoGeneral: 0.00,
                            AplicaDescuento: false,
                            ActualizoCarta: false,
                            PosicionActual: 0.00,
                            ClienteMAG: {
                                nombre: '',
                                estado: false,
                                fechabaja: ''
                            },
                            searchFicha: '',
                            isPreventaEdit: false,
                            startEditing: false,
                            lotesByArticulo: [],
                            datosFacturacionByCliente: []
                        }
                        : billing
                )
            }


        default:
            return state;
    }

}