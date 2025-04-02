import { types } from "../types/types";

const initialState = {
    familias: [],
    familia: {
        codigo: '',
        descripcion: '',
        observaciones: ''
    },
    isCreateFamilia: true,
    closingModalFamilia: false,
};

export const familiasReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case types.SetAllFamiliasFamily:
            return {
                ...state,
                familias : action.payload
            }

        case types.SetCodigoFamiliaFamiliasFamily:
            return {
                ...state,
                familia : {
                    ...state.familia,
                    codigo: action.payload
                }
            }

        case types.SetDescripcionFamiliaFamiliasFamily:
            return {
                ...state,
                familia : {
                    ...state.familia,
                    descripcion: action.payload
                }
            }

        case types.SetObservacionesFamiliaFamiliasFamily:
            return {
                ...state,
                familia : {
                    ...state.familia,
                    observaciones: action.payload
                }
            }

        case types.SetClosingModalFamiliasFamily:
            return {
                ...state,
                closingModalFamilia: action.payload
            }

        case types.SetIsCreateFamiliasFamily:
            return {
                ...state,
                isCreateFamilia: action.payload
            }

        case types.CleanFamiliaFamiliasFamily:
            return {
                ...state,
                familia: {
                    codigo: '',
                    descripcion: '',
                    observaciones: ''
                }
            }
            
        case types.CleanFamiliasFamily:
            
            return {
                familias: [],
                familia: {
                    codigo: '',
                    descripcion: '',
                    observaciones: ''
                }
            }

        default:
            return state;
    }
};