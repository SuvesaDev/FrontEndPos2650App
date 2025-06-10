import { types } from '../types/types';

const initialState = {
    currentTabSettings: 'Valores',
    porcentajeProntoPago: 0,
    tipoBonificacion: {
        nombre: '',
        descripcion: '',
        activo: false
    },
    isEditTipoBonificacion: false,
    indexTipoBonificacion: 0,
    tiposBonificaciones: []
};

export const SettingsReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.SelectTabSettings:
            return {
                ...state,
                currentTabSettings : action.payload.nameTab,
            }

        case types.SetPorcentajeProntoPagoSettings:
            return {
                ...state,
                porcentajeProntoPago: action.payload
            }

        case types.SetNombreTipoBonificacionSettings:
            return {
                ...state,
                tipoBonificacion: {
                    ...state.tipoBonificacion,
                    nombre: action.payload,
                }
            }

        case types.SetDescripcionTipoBonificacionSettings:
            return {
                ...state,
                tipoBonificacion: {
                    ...state.tipoBonificacion,
                    descripcion: action.payload,
                }
            }

        case types.SetActivoTipoBonificacionSettings:
            return {
                ...state,
                tipoBonificacion: {
                    ...state.tipoBonificacion,
                    activo: action.payload,
                }
            }

        case types.SetAddAllTipoBonificacionSettings:
            return {
                ...state,
                tiposBonificaciones: action.payload
            }

        case types.SetAddOneTipoBonificacionSettings:
            return {
                ...state,
                tiposBonificaciones: [
                    ...state.tiposBonificaciones,
                    action.payload
                ]
            }

        case types.SetIsEditTipoBonificacionSettings:
            return {
                ...state,
                isEditTipoBonificacion: action.payload
            }

        case types.SetIndexTipoBonificacionSettings:
            return {
                ...state,
                indexTipoBonificacion: action.payload
            }

        case types.SetEditTipoBonificacionSettings:
            return {
                ...state,
                tiposBonificaciones : state.tiposBonificaciones.map(
                    (boni, i) => i == action.payload.index
                        ? {
                            ...boni,
                            nombre : action.payload.nombre,
                            descripcion : action.payload.descripcion,
                            activo : action.payload.activo
                        } 
                        : boni
                )
            }

        case types.SetDeleteTipoBonificacionSettings:
            return {
                ...state,
                tiposBonificaciones : state.tiposBonificaciones.filter(
                    (boni, i) => i != action.payload
                )
            }

        case types.CleanTipoBonificacionSettings:
            return {
                ...state,
                tipoBonificacion: {
                    nombre: '',
                    descripcion: '',
                    activo: false
                }
            }
    
        default:
            return state;
    }

}