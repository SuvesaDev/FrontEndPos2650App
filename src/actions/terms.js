import { types } from '../types/types';


export const SelectTabTerms = ( nameTab ) => ({
    type: types.SelectTabTerms,
    payload: {
        nameTab
    }
});