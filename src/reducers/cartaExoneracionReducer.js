import { types } from '../types/types';

const initialState = {
    carta : {
        id : null,
        motivo: null,
        numeroDocumento: null,
        fechaEmision: null,
        fechaVence: null,
        porcentajeCompra: 0,
        impuesto: 0,
        nota: null,
        estado : null
    }
};

export const CartaExoneracionReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.SetMotivoCartaExoneracion:
            return {
                ...state,
                carta : {
                    ...state.carta,
                    motivo : action.payload
                }
            }

        case types.SetNumeroDocumentoCartaExoneracion:
            return {
                ...state,
                carta : {
                    ...state.carta,
                    numeroDocumento : action.payload
                }
            }

        case types.SetFechaEmisionCartaExoneracion:
            return {
                ...state,
                carta : {
                    ...state.carta,
                    fechaEmision : action.payload
                }
            }

        case types.SetFechaVenceCartaExoneracion:
            return {
                ...state,
                carta : {
                    ...state.carta,
                    fechaVence : action.payload
                }
            }

        case types.SetPorcentajeCompraCartaExoneracion:
            return {
                ...state,
                carta : {
                    ...state.carta,
                    porcentajeCompra : action.payload
                }
            }

        case types.SetImpuestoCartaExoneracion:
            return {
                ...state,
                carta : {
                    ...state.carta,
                    impuesto : action.payload
                }
            }

        case types.SetNotaCartaExoneracion:
            return {
                ...state,
                carta : {
                    ...state.carta,
                    nota : action.payload
                }
            }

        case types.CleanStateCartaExoneracion:
            return {
                ...state,
                carta : {
                    id : null,
                    motivo: null,
                    numeroDocumento: null,
                    fechaEmision: null,
                    fechaVence: null,
                    porcentajeCompra: 0,
                    impuesto: 0,
                    nota: null
                }
            }
        
        case types.SetSearchCartaExoneracion:
            return {
                ...state,
                carta : action.payload
            }

        default:
            return state;
    }

}