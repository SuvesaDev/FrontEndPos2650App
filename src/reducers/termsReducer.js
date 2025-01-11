import { types } from '../types/types';

const initialState = {
    currentTabTerms: 'CondiccionesUso'
};

export const TermsReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.SelectTabTerms:
            // TODO: Added new property of state
            return {
                currentTabTerms : action.payload.nameTab,
            }
    
        default:
            return state;
    }

}