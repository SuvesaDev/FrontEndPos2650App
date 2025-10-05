import { types } from "../types/types";

const initialState = {
    activeButtonsFooter: false,
    usuarioFacturacion: {
        id: 0,
        claveInterna: '',
        nameUser: ''
    },
    visiblePassword: false,
    startOpening: false,
    plazos: [],
    visibleTabDetalle: false,
    seletedTab: 'ListadoConsignacion',
    consignacionesPendientes: [],
    consignacionesAprobadas: [],
    aprobacionConsignacion: false,
    surcursales: [],
    usuarioAceptaConsignacion: false,
    activeButtonAprobado: false,
    activeButtonDespachar: false,
    isDespachar: false,
    isEditDetalle: false,
    posicionActual: 0,
    cantidadMaximaPermitida: 0,
    detalleArticuloActual: {
        CodArticulo: '',
        codFxArticulo: 0,
        Descripcion: '',
        Cantidad: 0.00,
        CantidadMaxima: 0.00,
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
    factura: {
        encabezado: {
            id : '',
            num_Factura : '',
            fecha : '',
            tipo: 0,
            tipoDocumento : 0,
            cod_Cliente : '',
            nombre_Cliente : '',
            cedula_Usuario : '',
            observaciones : '',
            surcursal: 0,
            empresa : '',
            Cod_Moneda : '',
            plazo : '',
            SubTotalGravada : '',
            SubTotalExento : '',
            SubTotal : '',
            Descuento : '',
            Imp_Venta : '',
            Total : '',
            usuario : '',
        },
        detalle: []
    }
};

export const followingConsignmentReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonFooterFollowingConsignment:
            return {
                ...state,
                activeButtonsFooter: action.payload
            }

        case types.SetIdUserFollowingConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    id: action.payload
                }
            }

        case types.SetClaveInternaFollowingConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    claveInterna: action.payload
                }
            }

        case types.SetNameUserFollowingConsignment:
            return {
                ...state,
                usuarioFacturacion: {
                    ...state.usuarioFacturacion,
                    nameUser: action.payload
                }
            }

        case types.SetVisiblePasswordFollowingConsignment:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetStartOpeningFollowingConsignment:
            return {
                ...state,
                startOpening: action.payload
            }

        case types.SetPlazosFollowingConsignment:
            return {
                ...state,
                plazos: action.payload
            }

        case types.SetSeletedTabFollowingConsignment:
            return {
                ...state,
                seletedTab: action.payload
            }

        case types.SetConsignacionesAprobadasFollowingConsignment:
            return {
                ...state,
                consignacionesAprobadas: action.payload
            }

        case types.SetConsignacionesPendientesFollowingConsignment:
            return {
                ...state,
                consignacionesPendientes: action.payload
            }

        case types.SetVisibleTabDetalleFollowingConsignment:
            return {
                ...state,
                visibleTabDetalle: action.payload
            }

        case types.SetFacturaFollowingConsignment:
            return {
                ...state,
                factura: action.payload
            }

        case types.SetAprobacionConsignacionFollowingConsignment:
            return {
                ...state,
                aprobacionConsignacion: action.payload
            }

        case types.SetSurcursalesFollowingConsignment:
            return {
                ...state,
                surcursales: action.payload
            }

        case types.SetAceptaConsignacionFollowingConsignment:
            return {
                ...state,
                usuarioAceptaConsignacion: action.payload
            }

        case types.SetActiveButtonAprobadoFollowingConsignment:
            return {
                ...state,
                activeButtonAprobado: action.payload
            }

        case types.SetActiveButtonDespacharFollowingConsignment:
            return {
                ...state,
                activeButtonDespachar: action.payload
            }

        case types.SetIsDespacharFollowingConsignment:
            return {
                ...state,
                isDespachar: action.payload
            }

        case types.SetDetalleActualFollowingConsignment:
            return {
                ...state,
                detalleArticuloActual: action.payload
            }

        case types.SetIsEditDetalleFollowingConsignment:
            return {
                ...state,
                isEditDetalle: action.payload
            }

        case types.SetPosicionActualFollowingConsignment:
            return {
                ...state,
                posicionActual: action.payload
            }

        case types.SetCantidadFollowingConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Cantidad: action.payload
                }
            }

        case types.SetPrecioUnitFollowingConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Unit: action.payload
                }
            }

        case types.SetSubTotalFollowingConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotal: action.payload
                }
            }

        case types.SetMontoImpuestoFollowingConsignment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Impuesto: action.payload
                }
            }

        case types.SetCantidadMaximaFollowingConsignment:
            return {
                ...state,
                cantidadMaximaPermitida: action.payload
            }

        case types.SetEditDetalleFollowingConsignment:
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

        case types.SetEditDetalleFollowingConsignment:
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

        case types.CleanDetalleActualFollowingConsignment:
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

        case types.CleanFollowingConsignment:
            return {
                activeButtonsFooter: false,
                usuarioFacturacion: {
                    id: 0,
                    claveInterna: '',
                    nameUser: ''
                },
                visiblePassword: false,
                startOpening: false,
                plazos: [],
                visibleTabDetalle: false,
                seletedTab: 'ListadoConsignacion',
                consignacionesPendientes: [],
                consignacionesAprobadas: [],
                aprobacionConsignacion: false,
                surcursales: [],
                factura: {
                    encabezado: {
                        id : '',
                        num_Factura : '',
                        fecha : '',
                        tipo: 0,
                        tipoDocumento : 0,
                        cod_Cliente : '',
                        nombre_Cliente : '',
                        cedula_Usuario : '',
                        observaciones : '',
                        surcursal: 0,
                        empresa : '',
                        Cod_Moneda : '',
                        plazo : '',
                        SubTotalGravada : '',
                        SubTotalExento : '',
                        SubTotal : '',
                        Descuento : '',
                        Imp_Venta : '',
                        Total : '',
                        usuario : '',
                    },
                    detalle: []
                }
            }
        
        default:
            return state;
    }
};