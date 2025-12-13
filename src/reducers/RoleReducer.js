import { types } from "../types/types";

const initialState = {
    activeButtonSave: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    nameUser: '',
    pantallasWeb: [],
    isEditModulo: false,
    idModuloSeleted: 0,
    roleActual: {
        nombre: '',
        descripcion: ''
    },
    moduloActual: {
        idPantalla: 0,
        nombrePantalla: '',
        crear: false,
        modificar: false,
        borrar: false,
        ver: false
    },
    modulos: [],
    roles: []
};

export const roleReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonSaveRole:
            return {
                ...state,
                activeButtonSave : action.payload
            }

        case types.SetDisableInputsRole:
            return {
                ...state,
                disableInputs : action.payload
            }

        case types.SetClaveInternaRole:
            return {
                ...state,
                claveInterna : action.payload
            }

        case types.SetvisiblePasswordRole:
            return {
                ...state,
                visiblePassword : action.payload
            }

        case types.SetDisableInputsUserRole:
            return {
                ...state,
                disableInputsUser : action.payload
            }

        case types.SetNameUserRole:
            return {
                ...state,
                nameUser : action.payload
            }

        case types.SetNombreRoleActualRole:
            return {
                ...state,
                roleActual: {
                    ...state.roleActual,
                    nombre: action.payload
                }
            }

        case types.SetDescripcionRoleActualRole:
            return {
                ...state,
                roleActual: {
                    ...state.roleActual,
                    descripcion: action.payload
                }
            }

        case types.SetAddRolesRole:
            return {
                ...state,
                roles: [
                    ...state.roles,
                    action.payload
                ]
            }

        case types.SetIdPantallaModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    idPantalla: action.payload,
                }
            }

        case types.SetNombrePantallaModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    nombrePantalla: action.payload,
                }
            }

        case types.SetCrearModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    crear: action.payload,
                }
            }

        case types.SetModificarModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    modificar: action.payload,
                }
            }

        case types.SetBorrarModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    borrar: action.payload,
                }
            }

        case types.SetVerModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    ver: action.payload,
                }
            }

        case types.SetAddModulosRole:
            return {
                ...state,
                modulos: [
                    ...state.modulos,
                    action.payload
                ]
            }

        case types.SetPantallasWebRole:
            return {
                ...state,
                pantallasWeb: action.payload
            }

        case types.CleanModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    idPantalla: 0,
                    nombrePantalla: '',
                    crear: false,
                    modificar: false,
                    borrar: false,
                    ver: false
                }
            }

        case types.SetIsEditModuloRole:
            return {
                ...state,
                isEditModulo: action.payload
            }

        case types.SetEditModulosRole:
            return {
                ...state,
                modulos: state.modulos.map(
                    (modulo, i) => i === action.payload.id
                        ? action.payload.data
                        : modulo
                )
            }

        case types.SetIdModuloSeletedRole:
            return {
                ...state,
                idModuloSeleted: action.payload
            }

        case types.SetDeleteModuloRole:
            return {
                ...state,
                modulos: state.modulos.filter( 
                    (modulo, i) => i !== action.payload
                )
            }

        default:
            return state;
    }
};