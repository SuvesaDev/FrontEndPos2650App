import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import {
  IsCodigoBarrasEditInventory,
  SetCodigoCodigoBarrasActualInventory,
  SetDescripcionCodigoBarrasActualInventory,
  SetIndexCodigoBarrasInventory,
  SetTarifaCodigoBarrasActualInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesCodigoBarrasTable = ({ columns, data }) => {
  const dispatch = useDispatch();

  const { codigoBarrasActual, inventory } = useSelector(
    (state) => state.inventory
  );

  const { descripcion, codigoBarras, tarifa } = codigoBarrasActual;

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
    // Obtiene el price seleccionado
    const { descripcion, codigoBarras, tarifa } = cell.row.values;
    const index = cell.row.index;

    // Search codigoBarras
    const codigo = inventory.codigoBarras.find(
      (codigo) =>
        codigo.descripcion === descripcion &&
        codigo.codigoBarras === codigoBarras &&
        codigo.tarifa === tarifa
    );

    if (codigo != undefined) {
      dispatch(SetDescripcionCodigoBarrasActualInventory(descripcion));
      dispatch(SetCodigoCodigoBarrasActualInventory(codigoBarras));
      dispatch(SetTarifaCodigoBarrasActualInventory(tarifa));
      dispatch(SetIndexCodigoBarrasInventory(index));
      dispatch(IsCodigoBarrasEditInventory(true));
    }
  };

  return (
    <>
      <div className="table-responsive-lg tablaP">
        <table
          {...getTableProps()}
          className="table table-hover text-lg-center"
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
