import { types } from '../types/types';

const initialState = {
    presentacionesInventory: null,
    presentaciones: [],
    nombrePresentacion: '',
};

export const PresentacionesReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllPresentacionesInventory:
            return {
                ...state,
                presentacionesInventory : action.payload
            }

        case types.SetNombrePresentacionPresentations:
            return {
                ...state,
                nombrePresentacion : action.payload
            }

        case types.SetPresentacionesPresentations:
            return {
                ...state,
                presentaciones : action.payload
            }

        case types.SetAddPresentacionPresentations:
            return {
                ...state,
                presentaciones : [
                    ...state.presentaciones,
                    action.payload
                ]
            }

        case types.CleanPresentations:
            return {
                ...state,
                presentaciones: [],
                nombrePresentacion: '',
            }

        default:
            return state;
    }

}