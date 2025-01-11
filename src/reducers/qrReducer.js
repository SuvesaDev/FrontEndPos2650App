import { types } from "../types/types";

const initialState = {
  inputDate: "",
};

export const qrReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SetInputDate:
      return {
        ...state,
        inputDate: action.payload,
      };

    default:
      return state;
  }
};
