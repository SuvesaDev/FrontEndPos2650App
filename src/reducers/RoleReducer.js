import { types } from "../types/types";

const initialState = {
    activeButtonSave: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    nameUser: '',
    modulosWeb: [],
    pantallasWeb: [],
    isEditModulo: false,
    idModuloSeleted: 0,
    isEditRole: false,
    idRoleSeleted: 0,
    roleActual: {
        id: 0,
        nombre: '',
        descripcion: '',
        estado: false
    },
    moduloActual: {
        idModulo: 0,
        nombreModulo: '',
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

        case types.SetIdRoleActualRole:
            return {
                ...state,
                roleActual: {
                    ...state.roleActual,
                    id: action.payload
                }
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

        case types.SetEstadoRoleActualRole:
            return {
                ...state,
                roleActual: {
                    ...state.roleActual,
                    estado: action.payload
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

        case types.SetIdModuleModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    idModulo: action.payload,
                }
            }

        case types.SetNombreModuleModuloActualRole:
            return {
                ...state,
                moduloActual: {
                    ...state.moduloActual,
                    nombreModulo: action.payload,
                }
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

        case types.SetModulosWebRole:
            return {
                ...state,
                modulosWeb: action.payload
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
                    idModulo: 0,
                    nombreModulo: '',
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

        case types.CleanModulosModuloActualRole:
            return {
                ...state,
                modulos: []
            }

        case types.SetModulosModuloRole:
            return {
                ...state,
                modulos: action.payload
            }

        case types.SetIsEditRoleRole:
            return {
                ...state,
                isEditRole: action.payload
            }

        case types.CleanRoleActualRole:
            return {
                ...state,
                roleActual: {
                    id: 0,
                    nombre: '',
                    descripcion: '',
                    estado: false
                },
                modulos: [],
            }

        case types.SetEditRole:
            return {
                ...state,
                roles: state.roles.map(
                    (role, i) => i === action.payload.id
                        ? action.payload.data
                        : role
                )
            }

        case types.SetIdSeletedRole:
            return {
                ...state,
                idRoleSeleted: action.payload
            }

        case types.SetDeleteRole:
            return {
                ...state,
                roles: state.roles.filter( 
                    (role, i) => i !== action.payload
                )
            }

        case types.SetRolesRole:
            return {
                ...state,
                roles: action.payload
            }

        default:
            return state;
    }
};