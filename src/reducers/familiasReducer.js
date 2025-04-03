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
    subFamilias: [],
    isSeletedFamilia: false,
    codigoFamiliasSeleted: 0,
    subfamilia: {
        codigo: '',
        descripcion: '',
        observaciones: ''
    },
    isCreateSubFamilia: true,
    closingModalSubFamilia: false,
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

        case types.SetSubFamiliasFamiliasFamily:
            return {
                ...state,
                subFamilias: action.payload
            }

        case types.SetIsSeletedFamiliasFamily:
            return {
                ...state,
                isSeletedFamilia: action.payload
            }

        case types.SetCodigoSeletedFamiliasFamily:
            return {
                ...state,
                codigoFamiliasSeleted: action.payload
            }

        case types.SetCodigoSubFamiliaFamiliasFamily:
            return {
                ...state,
                subfamilia : {
                    ...state.subfamilia,
                    codigo: action.payload
                }
            }

        case types.SetDescripcionSubFamiliaFamiliasFamily:
            return {
                ...state,
                subfamilia : {
                    ...state.subfamilia,
                    descripcion: action.payload
                }
            }

        case types.SetObservacionesSubFamiliaFamiliasFamily:
            return {
                ...state,
                subfamilia : {
                    ...state.subfamilia,
                    observaciones: action.payload
                }
            }

        case types.SetIsCreateSubFamiliasFamily:
            return {
                ...state,
                isCreateSubFamilia: action.payload
            }

        case types.SetClosingModalSubFamiliasFamily:
            return {
                ...state,
                closingModalSubFamilia: action.payload
            }

        case types.CleanSubFamiliaFamiliasFamily:
            return {
                ...state,
                subfamilia: {
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
                },
                isCreateFamilia: true,
                closingModalFamilia: false,
                subFamilias: [],
                isSeletedFamilia: false,
                codigoFamiliasSeleted: 0,
                subfamilia: {
                    codigo: '',
                    descripcion: '',
                    observaciones: ''
                },
                isCreateSubFamilia: true,
            }

        default:
            return state;
    }
};