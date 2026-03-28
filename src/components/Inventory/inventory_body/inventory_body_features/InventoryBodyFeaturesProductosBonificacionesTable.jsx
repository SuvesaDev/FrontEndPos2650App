import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import {
  SetCodigoArtBonificacionArticleInventory,
  SetCodigoBonificacionArticleInventory,
  SetDescripcionArtBonificacionArticleInventory,
  SetIsSelectedProductoBonificacionInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesProductosBonificacionesTable = ({ columns, data }) => {
  const dispatch = useDispatch();

  const {
    bonificacionArticles,
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
      const { codigo, descripcion } = cell.row.original;

      // Searcha articleRelated
      const producto = bonificacionArticles.find(
        (article) =>
          article.codigo === codigo &&
          article.descripcion === descripcion
      );

      if (producto != undefined) {

        dispatch( SetIsSelectedProductoBonificacionInventory(true) );
        
        dispatch( SetCodigoBonificacionArticleInventory(producto.codigo) );
        dispatch( SetCodigoArtBonificacionArticleInventory(producto.codArticulo) );
        dispatch( SetDescripcionArtBonificacionArticleInventory(producto.descripcion) );
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
