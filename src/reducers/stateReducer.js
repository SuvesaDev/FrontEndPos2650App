import { types } from "../types/types";

const initialState = {
  currentTabInventory: "StatePage",
  dataPersonal: [],
  dataMedicalTest: [],
  dataStates: [],
  dataCards: [],
  dataCardsFilter: [],
  selectPersonal: "",
  selectMedicalTest: "",
  selectState: "",
  claveInterna: "",
  nameUser: "",
  disableInputsUser: true,
  disablePassword: false,
};

export const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SetCurrentTab:
      return {
        ...state,
        currentTabInventory: action.payload,
      };

    case types.SetDataPersonal:
      return {
        ...state,
        dataPersonal: action.payload,
      };

    case types.SetSelectPersonal:
      return {
        ...state,
        selectPersonal: action.payload,
      };

    case types.SetDataMedicalTest:
      return {
        ...state,
        dataMedicalTest: action.payload,
      };

    case types.SetSelectMedicalTest:
      return {
        ...state,
        selectMedicalTest: action.payload,
      };

    case types.SetDataStates:
      return {
        ...state,
        dataStates: action.payload,
      };

    case types.SetSelectState:
      return {
        ...state,
        selectState: action.payload,
      };

    case types.SetDataCards:
      return {
        ...state,
        dataCards: action.payload,
      };

    case types.SetDataCardsFilter:
      return {
        ...state,
        dataCardsFilter: action.payload,
      };

    case types.SetClaveInternaState:
      return {
        ...state,
        claveInterna: action.payload,
      };

    case types.SetDisableInputState:
      return {
        ...state,
        disableInputsUser: action.payload,
      };

      case types.SetNameUserState:
        return {
          ...state,
          nameUser: action.payload,
        };

        case types.SetDisablePasswordState:
          return {
            ...state,
            disablePassword: action.payload,
          };
  
    default:
      return state;
  }
};
