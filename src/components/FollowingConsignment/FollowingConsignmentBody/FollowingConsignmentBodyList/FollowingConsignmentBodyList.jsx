import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { FaEye } from "react-icons/fa";

import { FollowingConsignmentIBodyListTable } from "./FollowingConsignmentIBodyListTable";

// import { SelectTabCustomers } from "../../../actions/customers";

export const FollowingConsignmentBodyList = () => {

  // const dispatch = useDispatch();

  // const state = useSelector((state) => state.customers);
  // const { currentTabCustomers, isCustomerEdit, variasSurcursales, isOpenFromConsignment } = state;

  // const { auth } = useSelector((state) => state.login);
  // const { costaPets } = auth;

  // const handleSelectTabCustomers = (nameTab) => {
  //   dispatch(SelectTabCustomers(nameTab));
  // };

  const columns = useMemo(
      () => [
          {
              Header: "Cedula del cliente",
              accessor: "cedula",
          },
          {
              Header: "Nombre del cliente",
              accessor: "nombre",
          },
          {
              Header: "Moneda",
              accessor: "moneda",
          },
          {
              Header: "Plazo",
              accessor: "plazo",
          },
          {
              Header: "Fecha",
              accessor: "fecha",
          },
          {
              Header: "Acciones",
              accessor: "icon",
              Cell: () => (
                  <button className='btn btn-primary'>
                      <FaEye className='iconSizeBtn' />
                  </button>
              ),
  
          },
      ],
      [true]
  );

  const columnsAprobadas = useMemo(
      () => [
          {
              Header: "Cedula del cliente",
              accessor: "cedula",
          },
          {
              Header: "Nombre del cliente",
              accessor: "nombre",
          },
          {
              Header: "Moneda",
              accessor: "moneda",
          },
          {
              Header: "Plazo",
              accessor: "plazo",
          },
          {
              Header: "Fecha",
              accessor: "fecha",
          }
      ],
      [true]
  );

  return (
    <>
      <div className="container-fluid mt-2">
          <div className="card">

              <div className="card-header cartaMods">
                  <h4>Consignaciones Pendientes</h4>
              </div>
  
              <div className="card-body">
                  <FollowingConsignmentIBodyListTable data={[]} columns={columns} />
              </div>

          </div>
          <br />
          <div className="card">

              <div className="card-header cartaMods">
                  <h4>Consignaciones Aprobadas</h4>
              </div>
  
              <div className="card-body">
                  <FollowingConsignmentIBodyListTable data={[]} columns={columnsAprobadas} />
              </div>

          </div>
      </div>
    </>
      
  );
};
