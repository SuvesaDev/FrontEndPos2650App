import { types } from '../types/types';

const initialState = {
    plazos: [],
    idPlazo: 0,
    descripcion: '',
    cantidadDias: 0,
    isEditPlazo: false,
};

export const DeadlinesReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.SetPlazosDeadlines:
            return {
                ...state,
                plazos : action.payload
            }

        case types.SetIdPlazoDeadlines:
            return {
                ...state,
                idPlazo : action.payload
            }

        case types.SetDescripcionDeadlines:
            return {
                ...state,
                descripcion : action.payload
            }

        case types.SetCantidadDiasDeadlines:
            return {
                ...state,
                cantidadDias : action.payload
            }    
            
        case types.SetAddNewDeadlineDeadlines:
            return {
                ...state,
                plazos: [
                    ...state.plazos,
                    action.payload
                ]
            } 

        case types.SetIsEditPlazoDeadlines:
            return {
                ...state,
                isEditPlazo : action.payload
            } 

        case types.SetEditDeadlines:
            return {
                ...state,
                plazos: state.plazos.map(
                    (plazo) => plazo.idPlazo === action.payload.idPlazo
                        ? action.payload
                        : plazo
                )
            } 

        case types.SetDeleteDeadlines:
            return {
                ...state,
                plazos: state.plazos.filter(plazo => plazo.idPlazo != action.payload.idPlazo)
            } 

        default:
            return state;
    }

}