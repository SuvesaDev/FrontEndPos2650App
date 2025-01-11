import { suvesaApi } from "../api/suvesaAPI";
import { types } from "../types/types";

//---------------------------------------------INICIO API Actions

//---------------------------------------------FIN API Actions


//---------------------------------------------Normal Actions
export const SetInputDate = (value) => ({
  type: types.SetInputDate,
  payload: value,
});
//---------------------------------------------FIN Normal Actions
