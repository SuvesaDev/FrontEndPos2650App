import { types } from '../types/types';

const initialState = {
    modalAddUnityCodeOpen: false,
};

export const UnityCodeReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.unityCodeOpenModelAddUnityCode:
            return {
               ...state,
                modalAddUnityCodeOpen: true,
            }

        case types.unityCodeCloseModelAddUnityCode:
            return {
                ...state,
                modalAddUnityCodeOpen: false,
            }

        default:
            return state;
    }

}