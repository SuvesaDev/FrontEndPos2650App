import { types } from "../types/types";

const initialState = {
    currentTabFarmacy: "FarmacyPage",
    claveInterna: "",
    nameUser: "",
    disableInputsUser: true,
    disablePassword: false,
};

export const farmacyReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SetCurrentTabFarmacy:
            return {
                ...state,
                currentTabFarmacy: action.payload,
            };

        case types.SetClaveInternaFarmacy:
            return {
                ...state,
                claveInterna: action.payload,
            };

        case types.SetNameUserFarmacy:
            return {
                ...state,
                nameUser: action.payload,
            };

        case types.SetDisableInputFarmacy:
            return {
                ...state,
                disableInputsUser: action.payload,
            };

        case types.SetDisablePasswordFarmacy:
            return {
                ...state,
                disablePassword: action.payload,
            };

        default:
            return state;
    }
};
