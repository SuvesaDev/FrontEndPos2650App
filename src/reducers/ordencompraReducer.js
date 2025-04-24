import { types } from '../types/types';

const initialState = {
  ActiveButtonNew: true,
  ActiveButtonSearch: true,
  ActiveButtonSave: false,
  ActiveButtonDisable: false,
  DisableInputs: true
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

        default:
            return state;
    }

}