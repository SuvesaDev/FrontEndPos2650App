import { types } from '../types/types';


export const SelectTabSettings = ( nameTab ) => ({
    type: types.SelectTabSettings,
    payload: {
        nameTab
    }
});