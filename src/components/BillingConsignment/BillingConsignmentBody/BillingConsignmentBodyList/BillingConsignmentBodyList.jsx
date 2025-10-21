import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { BillingConsignmentIBodyListTable } from "./BillingConsignmentIBodyListTable";

// import { SelectTabCustomers } from "../../../actions/customers";

export const BillingConsignmentBodyList = () => {

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
              Header: "Código",
              accessor: "CodArticulo",
          },
          {
              Header: "Descripcion",
              accessor: "Descripcion",
          },
          {
              Header: "Cantidad",
              accessor: "Cantidad",
          },
          // ...( isSmallScreen
          //         ? []
          //         : [
          //             {
          //                 Header: "Precio Uni.",
          //                 accessor: "Precio_Unit",
          //                 Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
          //             },
          //             {
          //                 Header: "IV",
          //                 accessor: "Monto_Impuesto",
          //                 Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
          //             },
          //             {
          //                 Header: "Lote",
          //                 accessor: "nombreLote",
          //             },
          //         ]
          //     ),
          {
              Header: "SubTotal",
              accessor: "SubTotal",
              Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
          },
          {
              Header: "Acciones",
              accessor: "icon",
              Cell: () => (
                  <button className='btn btn-danger'>
                      <MdDeleteForever className='iconSizeBtn' />
                  </button>
              ),
  
          },
      ],
      [true]
  );

  return (
    <>
      <div className="container-fluid mt-2">
          <div className="card">

              <div className="card-header cartaMods">
                  <h3>Listado de Consignaciones</h3>
              </div>
  
              <div className="card-body">
                  <BillingConsignmentIBodyListTable data={[]} columns={columns} />
              </div>

          </div>
          <br />
      </div>
    </>
      
  );
};
