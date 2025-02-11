import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useTable } from "react-table";

import {
  IsCategoriaEditInventory,
  SetCategoriaActualInventory,
  SetIndexCategoriaInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesCategoriaTable = ({ columns, data }) => {
  const dispatch = useDispatch();

  const { categoriaActual } = useSelector((state) => state.inventory);
  const { categoriasInventory } = useSelector((state) => state.categorias);

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
    // Obtiene el categoria seleccionado
    const { id, descripcion } = cell.row.values;
    const index = cell.row.index;

    // Search Category
    const category = categoriasInventory.find(
      (category) => category.id === id && category.descripcion === descripcion
    );

    if (category != undefined) {
      dispatch(IsCategoriaEditInventory(true));
      dispatch(SetIndexCategoriaInventory(index));
      dispatch(SetCategoriaActualInventory(category.id));
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
