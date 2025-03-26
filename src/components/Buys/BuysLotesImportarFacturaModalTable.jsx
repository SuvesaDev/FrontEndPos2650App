import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { 
  SetIsLoteEditImportarFacturaCompras,
  SetLoteLotesImportarFacturaCompras, 
  SetVencimientoLotesImportarFacturaCompras 
} from "../../actions/ComprasAction";

export const BuysLotesImportarFacturaModalTable = ({ columns, data }) => {

  const dispatch = useDispatch();

  // const {
  //   LotesInventory,
  //   isInventoryDisable,
  // } = useSelector((state) => state.inventory);

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

    // Obtiene el lote seleccionado
    const { lote, vencimiento } = cell.row.original;

    dispatch( SetLoteLotesImportarFacturaCompras( lote ) );
    dispatch( SetVencimientoLotesImportarFacturaCompras( vencimiento ) );

    dispatch( SetIsLoteEditImportarFacturaCompras( true ) );

  };

  return (
    <>
      <div className="table-responsive-lg tablaP">
        <table
          {...getTableProps()}
          className="table table-hover text-lg-center"
          key={data}
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

          <tbody className="table-white" {...getTableBodyProps()}>
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
