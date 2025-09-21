import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { FaEye } from "react-icons/fa";

import { FollowingConsignmentIBodyListTable } from "./FollowingConsignmentIBodyListTable";

export const FollowingConsignmentBodyList = () => {

    const { 
        consignacionesPendientes,
        consignacionesAprobadas
    } = useSelector(state => state.followingConsignment);

  const columns = useMemo(
      () => [
          {
              Header: "Cedula del cliente",
              accessor: "cedulaCliente",
          },
          {
              Header: "Nombre del cliente",
              accessor: "nombreCliente",
          },
          {
              Header: "Surcursal",
              accessor: "surcursal",
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
              accessor: "cedulaCliente",
          },
          {
              Header: "Nombre del cliente",
              accessor: "nombreCliente",
          },
          {
              Header: "Surcursal",
              accessor: "surcursal",
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
                  <FollowingConsignmentIBodyListTable data={consignacionesPendientes} columns={columns} />
              </div>

          </div>
          <br />
          <div className="card">

              <div className="card-header cartaMods">
                  <h4>Consignaciones Aprobadas</h4>
              </div>
  
              <div className="card-body">
                  <FollowingConsignmentIBodyListTable data={consignacionesAprobadas} columns={columnsAprobadas} />
              </div>

          </div>
      </div>
    </>
      
  );
};
