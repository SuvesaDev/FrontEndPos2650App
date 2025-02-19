import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTable } from "react-table";

import {
  SetDisableInputsLotesFormulaInventory,
  SetIdArticuloFormulaLotesInventory,
  SetIdBodegaFormulaLotesInventory,
  SetIdLoteFormulaLotesInventory,
  SetShowDivConvertirLotesFormulaInventory
} from "../../../../actions/inventory";

export const InventoryBodyFormulaLotesTable = ({ columns, data }) => {

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

      //Obtiene el seleccionado
      const { idArticuloFormula, idLote, idBodega } = cell.row.original;

      dispatch( SetIdArticuloFormulaLotesInventory( idArticuloFormula ) );
      dispatch( SetIdLoteFormulaLotesInventory( idLote ) );
      dispatch( SetIdBodegaFormulaLotesInventory( idBodega ) );
      dispatch( SetDisableInputsLotesFormulaInventory( true ) );
      dispatch( SetShowDivConvertirLotesFormulaInventory( true ) );
      
    }
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
