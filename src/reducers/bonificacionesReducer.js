import { types } from "../types/types";

const initialState = {
    disableInputs: true,
    claveInterna : '',
    visibleClaveInterna : false,
    disableInputsUser : false,
    nameUser: '',
    isOpenModalSearchArticuloBonificaciones: false,
    isEditBonificacion: false,
    indexSeleted: 0,
    bonificacion: {
        cantidadRequerida: 0,
        bonificacion: 0,
        idArticulo: 0,
        nombreArticulo: ''
    },
    bonificaciones: []
};

export const BonificacionesReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case types.SetDisableInputsBonificaciones:
            return {
                ...state,
                disableInputs : action.payload
            }

        case types.SetClaveInternaBonificaciones:
            return {
                ...state,
                claveInterna : action.payload
            }

        case types.SetVisibleClaveInternaBonificaciones:
            return {
                ...state,
                visibleClaveInterna : action.payload
            }

        case types.SetDisableInputsUserBonificaciones:
            return {
                ...state,
                disableInputsUser : action.payload
            }

        case types.SetNameUserBonificaciones:
            return {
                ...state,
                nameUser : action.payload
            }

        case types.SetCantidadRequeridaBonificaciones:
            return {
                ...state,
                bonificacion: {
                    ...state.bonificacion,
                    cantidadRequerida: action.payload
                }
            }

        case types.SetBonificacionBonificaciones:
            return {
                ...state,
                bonificacion: {
                    ...state.bonificacion,
                    bonificacion: action.payload
                }
            }

        case types.SetIdArticuloBonificaciones:
            return {
                ...state,
                bonificacion: {
                    ...state.bonificacion,
                    idArticulo: action.payload
                }
            }

        case types.SetNombreArticuloBonificaciones:
            return {
                ...state,
                bonificacion: {
                    ...state.bonificacion,
                    nombreArticulo: action.payload
                }
            }

        case types.SetAddOneBonificacionBonificaciones:
            return {
                ...state,
                bonificaciones : [
                    ...state.bonificaciones,
                    action.payload
                ]
            }

        case types.SetAddAllBonificaciones:
            return {
                ...state,
                bonificaciones : action.payload
            }

        case types.SetIsOpenModalSearchBonificaciones:
            return {
                ...state,
                isOpenModalSearchArticuloBonificaciones : action.payload
            }

        case types.SetCleanBonificaciones:
            return {
                ...state,
                bonificacion: {
                    cantidadRequerida: 0,
                    bonificacion: 0,
                    idArticulo: 0,
                    nombreArticulo: ''
                }
            }

        case types.SetIsEditBonificaciones:
            return {
                ...state,
                isEditBonificacion : action.payload
            }

        case types.SetIndexSeletedBonificaciones:
            return {
                ...state,
                indexSeleted : action.payload
            }

        case types.SetEditBonificaciones:
            return {
                ...state,
                bonificaciones : state.bonificaciones.map(
                        (boni, i) => i == action.payload.index
                            ? {
                                ...boni,
                                cantidadRequerida : action.payload.cantidadRequerida,
                                bonificacion : action.payload.bonificacion,
                                idArticulo : action.payload.idArticulo,
                                nombreArticulo : action.payload.nombreArticulo,
                            } 
                            : boni
                    )
            }

        case types.SetDeleteBonificaciones:
            return {
                ...state,
                bonificaciones : state.bonificaciones.filter(
                    (boni, i) => i != action.payload
                )
            }
          
        case types.CleanStateBonificaciones:
            return {
                disableInputs: true,
                claveInterna : '',
                visibleClaveInterna : false,
                disableInputsUser : false,
                nameUser: '',
                isOpenModalSearchArticuloBonificaciones: false,
                isEditBonificacion: false,
                indexSeleted: 0,
                bonificacion: {
                    cantidadRequerida: 0,
                    bonificacion: 0,
                    idArticulo: 0,
                    nombreArticulo: ''
                },
                bonificaciones: []
            }

        default:
            return state;
    }
};