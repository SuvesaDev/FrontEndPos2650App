import React from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";

import { AiFillExclamationCircle } from "react-icons/ai";

import { startGetOneOrdenCompra } from "../../actions/ordenCompraAction";

export const PurchaseOrderBodySearchModalTable = ({ columns, data }) => {

  const dispatch = useDispatch();
  const { proveedoresInventory } = useSelector((state) => state.proveedores);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const handleSelectedRow = async (cell) => {

    //Obtener el id de presentacion seleccionado
    const { orden } = cell.row.original;

    if (orden !== null) {
      dispatch(startGetOneOrdenCompra(orden, proveedoresInventory));
    }
  }

  return (
    <>
      <div className="table-responsive-md tablaP">
        <table
          {...getTableProps()}
          className="table table-dark table-hover table-bordered text-md-center"
        >
          <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-secondary" {...getTableBodyProps()}>
            {
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps({
                          onClick: () => handleSelectedRow(cell),
                        })}
                        data-bs-dismiss="modal"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <hr />
    </>
  );


};