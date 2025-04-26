import { types } from '../types/types';

const initialState = {
  ActiveButtonNew: true,
  ActiveButtonSearch: true,
  ActiveButtonSave: false,
  ActiveButtonDisable: false,
  DisableInputs: true,
  ordenCompra: {
    numeroOrdenCompra: 0,
    idProveedor: 0,
    nombreProveedor: '',
    fechaEntrega: '',
    nombreEntrega: '',
    moneda: 0,
    formaPagoContado: false,
    formaPagoCredito: false,
    cantidadDias: 0,
    articulos: [],
    totalSubGravado: 0,
    totalSubExento: 0,
    totalSubTotal: 0,
    totalDescuento: 0,
    totalImpuestos: 0,
    totalFinal: 0
  },
  articulo: {
    idArticulo: 0,
    codigo: '',
    descripcion: '',
    precioUnitario: 0,
    fletes: 0,
    costo: 0,
    descuento: 0,
    impuesto: 0,
    cantidad: 0,
    subtotal: 0,
    observaciones: ''
  }
};

export const OrdenCompraReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonNewOrdenCompra:
            return {
                ...state,
                ActiveButtonNew: action.payload,
            }

        case types.SetActiveButtonSearchOrdenCompra:
            return {
                ...state,
                ActiveButtonSearch: action.payload,
            }

        case types.SetActiveButtonSaveOrdenCompra:
            return {
                ...state,
                ActiveButtonSave: action.payload,
            }

        case types.SetActiveButtonDisableOrdenCompra:
            return {
                ...state,
                ActiveButtonDisable: action.payload,
            }

        case types.SetDisableInputsOrdenCompra:
            return {
                ...state,
                DisableInputs: action.payload,
            }

        case types.SetNumeroOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    numeroOrdenCompra: action.payload
                }
            }

        case types.SetIdProveedorOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    idProveedor: action.payload
                }
            }

        case types.SetNombreProveedorOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    nombreProveedor: action.payload
                }
            }

        case types.SetFechaEntregaOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    fechaEntrega: action.payload
                }
            }

        case types.SetNombreEntregaOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    nombreEntrega: action.payload
                }
            }

        case types.SetMonedaOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    moneda: action.payload
                }
            }

        case types.SetFormaPagoContadoOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    formaPagoContado: action.payload
                }
            }

        case types.SetFormaPagoCreditoOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    formaPagoCredito: action.payload
                }
            }

        case types.SetCantidadDiasOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    cantidadDias: action.payload
                }
            }

        case types.SetArticulosOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    articulos: action.payload
                }
            }

        case types.SetTotalSubGravadoOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    totalSubGravado: action.payload
                }
            }

        case types.SetTotalSubExentoOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    totalSubExento: action.payload
                }
            }

        case types.SetTotalSubTotalOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    totalSubTotal: action.payload
                }
            }

        case types.SetTotalDescuentoOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    totalDescuento: action.payload
                }
            }

        case types.SetTotalImpuestosOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    totalImpuestos: action.payload
                }
            }

        case types.SetTotalFinalOrdenCompra:
            return {
                ...state,
                ordenCompra: {
                    ...state.ordenCompra,
                    totalFinal: action.payload
                }
            }

        case types.SetIdArticuloArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    idArticulo: action.payload
                }
            }

        case types.SetCodigoArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    codigo: action.payload
                }
            }

        case types.SetDescripcionArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    descripcion: action.payload
                }
            }

        case types.SetPrecioUnitarioArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    precioUnitario: action.payload
                }
            }

        case types.SetFletesArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    fletes: action.payload
                }
            }

        case types.SetCostoArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    costo: action.payload
                }
            }

        case types.SetDescuentoArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    descuento: action.payload
                }
            }

        case types.SetImpuestoArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    impuesto: action.payload
                }
            }

        case types.SetCantidadArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    cantidad: action.payload
                }
            }

        case types.SetSubtotalArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    subtotal: action.payload
                }
            }

        case types.SetObservacionesArticuloOrdenCompra:
            return {
                ...state,
                articulo: {
                    ...state.articulo,
                    observaciones: action.payload
                }
            }

        case types.CleanStateOrdenCompra:
            return {
                ActiveButtonNew: true,
                ActiveButtonSearch: true,
                ActiveButtonSave: false,
                ActiveButtonDisable: false,
                DisableInputs: true,
                ordenCompra: {
                    numeroOrdenCompra: 0,
                    idProveedor: 0,
                    nombreProveedor: '',
                    fechaEntrega: '',
                    nombreEntrega: '',
                    moneda: 0,
                    formaPagoContado: false,
                    formaPagoCredito: false,
                    cantidadDias: 0,
                    articulos: [],
                    totalSubGravado: 0,
                    totalSubExento: 0,
                    totalSubTotal: 0,
                    totalDescuento: 0,
                    totalImpuestos: 0,
                    totalFinal: 0
                },
                articulo: {
                    idArticulo: 0,
                    codigo: '',
                    descripcion: '',
                    precioUnitario: 0,
                    fletes: 0,
                    costo: 0,
                    descuento: 0,
                    impuesto: 0,
                    cantidad: 0,
                    subtotal: 0,
                    observaciones: ''
                }
            }

        default:
            return state;
    }

}