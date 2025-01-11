import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTable } from "react-table";

import {
  IsEditPricesSellInventory,
  SelectedPricesSellInventory,
} from "../../../../actions/inventory";

export const InventoryBodyPrecioVentaTable = ({ columns, data }) => {
  const dispatch = useDispatch();

  const { isInventoryDisable } = useSelector((state) => state.inventory);

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
    if (!isInventoryDisable) {
      //Obtiene el price seleccionado
      const price = cell.row.values;

      //Se establece en el estado y cambia al modo editar
      if (price != undefined) {
        dispatch(SelectedPricesSellInventory(price));
        dispatch(IsEditPricesSellInventory(true));
      }
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
                <tr
                  {...row.getRowProps()}
                >
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
