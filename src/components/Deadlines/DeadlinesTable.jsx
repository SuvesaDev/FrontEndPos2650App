import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { 
  SetCantidadDiasDeadlines,
  SetDescripcionDeadlines,
  SetIdPlazoDeadlines, 
  SetIsEditPlazoDeadlines
} from "../../actions/DeadlinesAction";

export const DeadlinesTable = ({ columns, data }) => {

  const dispatch = useDispatch();

  // const {
  //   relatedArticlesInventory,
  //   seletedrelatedArticles,
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

    const {idPlazo, descripcion, cantidadDias } = cell.row.original;

    if( idPlazo != null) {
      dispatch(SetIdPlazoDeadlines(idPlazo) );
      dispatch(SetDescripcionDeadlines(descripcion) );
      dispatch(SetCantidadDiasDeadlines(cantidadDias) );
      dispatch(SetIsEditPlazoDeadlines(true) );
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
