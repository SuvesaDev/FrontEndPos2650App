import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";
import {
  IsSelectedRelatedArticleInventory,
  SelectedRelatedArticleInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesBodegaTabla = ({ columns, data }) => {
  const dispatch = useDispatch();

  const {
    relatedArticlesInventory,
    seletedrelatedArticles,
    isInventoryDisable,
  } = useSelector((state) => state.inventory);

  const { codigo, descripcion, cantidad } = seletedrelatedArticles;

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
      const { codigo, descripcion, cantidad } = cell.row.values;

      // Searcha articleRelated
      const articleRelated = relatedArticlesInventory.find(
        (article) =>
          article.codigo === codigo &&
          article.descripcion === descripcion &&
          article.cantidad === cantidad
      );

      if (articleRelated != undefined) {
        dispatch(IsSelectedRelatedArticleInventory(true));
        dispatch(SelectedRelatedArticleInventory(articleRelated));
      }
    }
  };

  return (
    <>
      <div className="table-responsive-lg tablaP">
        <table {...getTableProps()} className="table table-hover text-lg-center">
        <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="table-white"
            {...getTableBodyProps()}
          >
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
