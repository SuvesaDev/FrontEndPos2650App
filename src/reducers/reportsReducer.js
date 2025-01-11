import { types } from "../types/types";

const initialState = {
    currentTabReportes: "ReportesComprasPage",
    claveInterna: "",
    nameUser: "",
    disableInputsUser: true,
    disablePassword: false,
};

export const reportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SetCurrentTabReports:
            return {
                ...state,
                currentTabReportes: action.payload,
            };

        case types.SetClaveInternaReports:
            return {
                ...state,
                claveInterna: action.payload,
            };

        case types.SetNameUserReports:
            return {
                ...state,
                nameUser: action.payload,
            };

        case types.SetDisableInputReports:
            return {
                ...state,
                disableInputsUser: action.payload,
            };

        case types.SetDisablePasswordReports:
            return {
                ...state,
                disablePassword: action.payload,
            };

        default:
            return state;
    }
};
