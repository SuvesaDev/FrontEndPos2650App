import { types } from "../types/types";

const initialState = {
    activeButtonSave: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    nameUser: '',
    bancoActual: '',
    isEditBanco: false,
    idSeletedBanco: 0,
    startOpeningBank: false,
    bancos: [],
};

export const bankReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetActiveButtonSaveBank:
            return {
                ...state,
                activeButtonSave : action.payload
            }

        case types.SetDisableInputsBank:
            return {
                ...state,
                disableInputs : action.payload
            }

        case types.SetClaveInternaBank:
            return {
                ...state,
                claveInterna : action.payload
            }

        case types.SetVisiblePasswordBank:
            return {
                ...state,
                visiblePassword : action.payload
            }

        case types.SetDisableInputsUserBank:
            return {
                ...state,
                disableInputsUser : action.payload
            }

        case types.SetNameUserBank:
            return {
                ...state,
                nameUser : action.payload
            }

        case types.SetBancosBank:
            return {
                ...state,
                bancos : action.payload
            }

        case types.SetBancoActualBank:
            return {
                ...state,
                bancoActual : action.payload
            }

        case types.SetAddBancoBank:
            return {
                ...state,
                bancos : [
                    ...state.bancos,
                    action.payload
                ]
            }

        case types.SetIsEditBank:
            return {
                ...state,
                isEditBanco : action.payload
            }

        case types.SetIdSeletedBancoBank:
            return {
                ...state,
                idSeletedBanco : action.payload
            }

        case types.SetEditBancoBank:
            return {
                ...state,
                bancos: state.bancos.map(
                    (banco) => banco.id === action.payload.id
                        ? action.payload
                        : banco
                )
            }

        case types.SetStartOpeningBank:
            return {
                ...state,
                startOpeningBank : action.payload
            }

        case types.CleanStateBancosBank:
            return {
                ...state,
                activeButtonSave: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                nameUser: '',
                bancoActual: '',
                isEditBanco: false,
                idSeletedBanco: 0,
                startOpeningBank: false,
                bancos: [],
            }

        default:
            return state;
    }
};