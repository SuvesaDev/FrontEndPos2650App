import { types } from "../types/types";

const initialState = {
    familias: [],
};

export const familiasReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case types.SetAllFamiliasFamily:
            return {
                ...state,
                familias : action.payload
            }

        case types.CleanFamiliasFamily:
            
            return {
                familias: [],
            }

        default:
            return state;
    }
};