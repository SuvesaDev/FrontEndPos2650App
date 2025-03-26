import { useDispatch, useSelector } from "react-redux";

import { SelectTabCustomers } from "../../../actions/customers";

export const CustomersBodyTabs = () => {

  const dispatch = useDispatch();

  const state = useSelector((state) => state.customers);
  const { currentTabCustomers, isCustomerEdit } = state;

  const { auth } = useSelector((state) => state.login);
  const { costaPets } = auth;

  const handleSelectTabCustomers = (nameTab) => {
    dispatch(SelectTabCustomers(nameTab));
  };

  return (
    <>
      <div className="col-md-3 mb-2"></div>

      <div className="col-md-2 mb-2">
        <button
          className={
            currentTabCustomers == "DatosGenerales"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => handleSelectTabCustomers("DatosGenerales")}
        >
          Datos Generales
        </button>
      </div>

      <div className="col-md-2 mb-2">
        <button
          className={
            currentTabCustomers == "CreditoDescuento"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => handleSelectTabCustomers("CreditoDescuento")}
        >
          Crédito y Descuento
        </button>
      </div>

      <div className={ costaPets ? 'col-md-2 mb-2 d-none' : 'col-md-2 mb-2' }>
        <button
          className={
            currentTabCustomers == "CartaExoneracion"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => handleSelectTabCustomers("CartaExoneracion")}
        >
          Carta Exoneracion
        </button>
      </div>

      <div className={ (costaPets && isCustomerEdit) ? 'col-md-2 mb-2' : 'col-md-2 mb-2 d-none' }>
        <button
          className={
            currentTabCustomers == "Adjuntos"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => handleSelectTabCustomers("Adjuntos")}
        >
          Adjuntos
        </button>
      </div>

      <div className="col-md-3 mb-2"></div>

    </>
  );
};
