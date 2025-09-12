import { useDispatch, useSelector } from "react-redux";

// import { SelectTabCustomers } from "../../../actions/customers";

export const FollowingConsignmentTabs = () => {

  const dispatch = useDispatch();

  const state = useSelector((state) => state.customers);
  const { currentTabCustomers, isCustomerEdit, variasSurcursales, isOpenFromConsignment } = state;

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
          className="btn btn-primary"
          // className={
          //   currentTabCustomers == "DatosGenerales"
          //     ? "btn btn-primary"
          //     : "btn btn-outline-primary"
          // }
          // onClick={() => handleSelectTabCustomers("DatosGenerales")}
        >
          Listado de Consignaciones
        </button>
      </div>

      <div className="col-md-2 mb-2">
        <button
          className="btn btn-outline-primary"
          // className={
          //   currentTabCustomers == "DatosGenerales"
          //     ? "btn btn-primary"
          //     : "btn btn-outline-primary"
          // }
          // onClick={() => handleSelectTabCustomers("DatosGenerales")}
        >
          Detalle Consignacion
        </button>
      </div>

      
      <div className="col-md-3 mb-2"></div>

    </>
  );
};
