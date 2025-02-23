import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import {
  SetExistenciaLotesInventory,
  SetIdLotesInventory,
  SetIsSelectedLoteInventory,
  SetNumLoteLotesInventory,
  SetVencimientoLotesInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesLotesTable = ({ columns, data }) => {
  const dispatch = useDispatch();

  const {
    LotesInventory,
    isInventoryDisable,
  } = useSelector((state) => state.inventory);

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

      // Obtiene el price seleccionado
      const { lote, vencimiento, existencia } = cell.row.values;

      // Searcha articleRelated
      const seletedLote = LotesInventory.find(
        (lot) =>
          lot.lote === lote &&
          lot.vencimiento === vencimiento &&
          lot.existencia === existencia
      );

      if (seletedLote != undefined) {

        dispatch( SetIsSelectedLoteInventory(true) );

        dispatch( SetIdLotesInventory(seletedLote.id) );
        dispatch( SetNumLoteLotesInventory(seletedLote.lote) );
        dispatch( SetVencimientoLotesInventory(seletedLote.vencimiento) );
        dispatch( SetExistenciaLotesInventory(seletedLote.existencia) );

      }
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
