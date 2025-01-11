import React from "react";
import { useTable } from "react-table";

import { useDispatch } from "react-redux";
import { startGetOneOpenCash } from "../../actions/OpenCashAction";

export const OpenCashSearchOpenCashModalTable = ({ columns, data }) => {
  const dispatch = useDispatch();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({
    columns,
    data,
  });

  const handleSelectedRow = async (cell) => {
    //Obtener el id de apertura seleccionado
    const { apertura } = cell.row.original;

    if (apertura !== undefined && apertura !== null) {
      // Se llama end-point para traer una apertura
      dispatch(startGetOneOpenCash(apertura));
    }
  };

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
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          onClick: () => handleSelectedRow(cell),
                        })}
                        data-bs-dismiss="modal"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
