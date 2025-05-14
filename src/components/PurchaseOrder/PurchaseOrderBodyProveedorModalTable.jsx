import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useDispatch } from "react-redux";

import { AiFillExclamationCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import { 
  SetIdProveedorOrdenCompra, 
  SetNombreProveedorOrdenCompra 
} from "../../actions/ordenCompraAction";

export const PurchaseOrderBodyProveedorModalTable = ({ columns, data }) => {

  const dispatch = useDispatch();
  const [filtro, setFiltro] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFiltro(value);
    setGlobalFilter(value);
  };

  const handleSelectedRow = async (cell) => {

    //Obtener el id de presentacion seleccionado
    const { codigo, descripcion } = cell.row.original;

    if (codigo !== null) {

      dispatch(SetIdProveedorOrdenCompra(codigo));
      dispatch(SetNombreProveedorOrdenCompra(descripcion));

    }
  }

  return (
    <>
      <div className="col-md-12 mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch className="iconSize" />
          </span>
          <input
            type="text"
            id="BuscaV"
            value={filtro}
            className="form-control"
            placeholder="Buscar...."
            onChange={handleFilterChange}
          />
        </div>
      </div>
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
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <center>
                    <div className="toast show">
                      <div className={"card-header toast-warning"}>
                        <strong className="me-auto">
                          2650 Informa{" "}
                          <AiFillExclamationCircle className="iconSize" />
                        </strong>
                      </div>
                      <div className="toast-body">
                        <p className="text-danger">
                          No existen coincidencias con lo ingresado en los
                          filtros.
                        </p>
                      </div>
                    </div>
                  </center>
                </td>
              </tr>
            ) : (
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps({
                          onClick: () => handleSelectedRow(cell),
                        })}
                        data-bs-dismiss="modal"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <hr />
    </>
  );


};