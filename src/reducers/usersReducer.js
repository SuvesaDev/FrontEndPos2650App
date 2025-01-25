import { types } from "../types/types";

const initialState = {
    activeButtonNew: true,
    activeButtonSave: false,
    activeButtonSearch: true,
    activeButtonRemove: false,
    disableInputs: true,
    startOpening: false,
    isVisableClaveEntrada: false,
    isVisableClaveInterna: false,
    isOpenModalSearch: false,
    isEditUser: false,
    isEquealsClave: true,
    showInfoMessageClave: false,
    showCostaPets: false,   
    searchUsers: [],
    optionsSearchUsers: {
        valorFiltro: '',
        idUsuario: true,
        nombre: false
    },
    perfiles: [],
    user: {
        id: 0,
        idUsuario: '',
        nombre: '',
        claveEntrada: '',
        claveInterna: '',
        perfil: 0,
        foto: '',
        iniciales: '',
        cambiarPrecio: false,
        porcPrecio: 0,
        aplicarDesc: false,
        porcDesc: 0,
        existNegativa: false,
        usuario: '',
        observaciones: '',
        email: '',
        maximoVentas: 1,
        activo: false,
        isAdministradorCostaPets: false,
        isAgenteCostaPets: false,
    }
};


export const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonNewUsers:
            return {
                ...state,
                activeButtonNew: action.payload,
            } 

        case types.SetActiveButtonSaveUsers:
            return {
                ...state,
                activeButtonSave: action.payload,
            }

        case types.SetActiveButtonSearchUsers:
            return {
                ...state,
                activeButtonSearch: action.payload,
            }

        case types.SetActiveButtonRemoveUsers:
            return {
                ...state,
                activeButtonRemove: action.payload,
            }

        case types.SetIdUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    id: action.payload
                }
            }

        case types.SetIdUsuarioUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    idUsuario: action.payload
                }
            }

        case types.SetNombreUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    nombre: action.payload
                }
            }

        case types.SetClaveEntradaUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    claveEntrada: action.payload
                }
            }

        case types.SetClaveInternaUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    claveInterna: action.payload
                }
            }

        case types.SetPerfilUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    perfil: action.payload
                }
            }

        case types.SetFotoUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    foto: action.payload
                }
            }

        case types.SetInicialesUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    iniciales: action.payload
                }
            }

        case types.SetCambiarPrecioUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    cambiarPrecio: action.payload
                }
            }

        case types.SetPorcPrecioUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    porcPrecio: action.payload
                }
            }

        case types.SetAplicarDescUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    aplicarDesc: action.payload
                }
            }

        case types.SetPorcDescUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    porcDesc: action.payload
                }
            }

        case types.SetExistNegativaUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    existNegativa: action.payload
                }
            }

        case types.SetUsuarioUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    usuario: action.payload
                }
            }

        case types.SetObservacionesUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    observaciones: action.payload
                }
            }

        case types.SetEmailUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload
                }
            }

        case types.SetActivoUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    activo: action.payload
                }
            }

        case types.SetMaximoVentasUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    maximoVentas: action.payload
                }
            }

        case types.CleanUsers:
            return {
                ...state,
                activeButtonNew: true,
                activeButtonSave: false,
                activeButtonSearch: true,
                activeButtonRemove: false,
                disableInputs: true,
                startOpening: false,
                isVisableClaveEntrada: false,
                isVisableClaveInterna: false,
                isOpenModalSearch: false,
                isEditUser: false,
                isEquealsClave: false,
                showInfoMessageClave: false,
                searchUsers: [],
                optionsSearchUsers: {
                    valorFiltro: '',
                    idUsuario: true,
                    nombre: false
                },
                user: {
                    id: 0,
                    idUsuario: '',
                    nombre: '',
                    claveEntrada: '',
                    claveInterna: '',
                    perfil: 0,
                    foto: '',
                    iniciales: '',
                    cambiarPrecio: false,
                    porcPrecio: 0,
                    aplicarDesc: false,
                    porcDesc: 0,
                    existNegativa: false,
                    usuario: '',
                    observaciones: '',
                    email: '',
                    maximoVentas: 1,
                    activo: false,
                    isAdministradorCostaPets: false,
                    isAgenteCostaPets: false,
                }
            }

        case types.SetDisableInputsUsers:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetStartOpeningUsers:
            return {
                ...state,
                startOpening: action.payload
            }

        case types.SetVisibleClaveEntradaUsers:
            return {
                ...state,
                isVisableClaveEntrada: action.payload
            }

        case types.SetVisibleClaveInternaUsers:
            return {
                ...state,
                isVisableClaveInterna: action.payload
            }

        case types.SetIsOpenModalSearchUsers:
            return {
                ...state,
                isOpenModalSearch: action.payload
            }

        case types.SetValorFiltroSearchUsers:
            return {
                ...state,
                optionsSearchUsers: {
                    ...state.optionsSearchUsers,
                    valorFiltro: action.payload
                },
            }

        case types.SetIdUsuarioSearchUsers:
            return {
                ...state,
                optionsSearchUsers: {
                    ...state.optionsSearchUsers,
                    idUsuario: action.payload,
                },
            }

        case types.SetNombreSearchUsers:
            return {
                ...state,
                optionsSearchUsers: {
                    ...state.optionsSearchUsers,
                    nombre: action.payload
                },
            }

        case types.SetUsersSearchUsers:
            return {
                ...state,
                searchUsers: action.payload,
            }

        case types.CleanSearchOptionsUsers:
            return {
                ...state,
                optionsSearchUsers: {
                    valorFiltro: '',
                    idUsuario: true,
                    nombre: false
                },
                searchUsers: [],
            }

        case types.SetInsertOneUsers:
            return {
                ...state,
                user: action.payload,
            }

        case types.SetIsEditUsers:
            return {
                ...state,
                isEditUser: action.payload,
            }

        case types.SetIsEqualsClaveUsers:
            return {
                ...state,
                isEquealsClave: action.payload,
            }

        case types.SetShowInfoMessageUsers:
            return {
                ...state,
                showInfoMessageClave: action.payload,
            }

        case types.SetShowCostaPetsUsers:
            return {
                ...state,
                showCostaPets: action.payload,
            }

        case types.SetIsAdministradoCostaPetsUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    isAdministradorCostaPets: action.payload
                }
            }

        case types.SetIsAgenteCostaPetsUsers:
            return {
                ...state,
                user: {
                    ...state.user,
                    isAgenteCostaPets: action.payload
                }
            }

        case types.SetPerfilesUsers:
            return {
                ...state,
                perfiles: action.payload
            }

        default:
            return state;
    }
};