import { types } from "../types/types";

const initialState = {
    activeButtonSave: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    nameUser: '',
    roleActual: {
        nombre: '',
        descripcion: ''
    },
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

        default:
            return state;
    }
};