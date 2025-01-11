import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useGlobalFilter } from "react-table";

import { FaSearch } from "react-icons/fa";
import { AiFillExclamationCircle } from "react-icons/ai";

import { 
  SetCodcabysInventory, 
  SetValorFiltroCodigoCabysInventory, 
  startSearchCodigoCabysInventory
} from "../../actions/inventory";

export const InventorySearchCodigoCabysTable = ({ columns, data }) => {

  const dispatch = useDispatch();

  const [filtro, setFiltro] = useState("");

  const { 
    valorfiltroCodigoCabys
  } = useSelector( state => state.inventory );

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

  // const handleFilterChange = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   setFiltro(value);
  //   setGlobalFilter(value);
  // };

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch( action(target.value) );
  };

  const handleSelectedRow = async (cell) => {
    const { codigo } = cell.row.values;
    if (codigo !== null) {
      dispatch(SetCodcabysInventory(codigo));
    }
  };

  const handleSearchCodigoCabys = async (e) => {
        
    e.preventDefault();

    if( valorfiltroCodigoCabys !== '' ) {
        dispatch( startSearchCodigoCabysInventory( valorfiltroCodigoCabys ) )
    } 
  }

  const handleKeyDownUsuario = async (e) => {

    if (e.key === 'Enter') {
        e.preventDefault();

      if( valorfiltroCodigoCabys !== '' ) {
          dispatch( startSearchCodigoCabysInventory( valorfiltroCodigoCabys ) )
      } 
    }
  } 

  return (
    <>
      <div className="col-md-12 mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch className="iconSize" onClick={handleSearchCodigoCabys}/>
          </span>
          <input
            type="text"
            id="BuscaV"
            value={valorfiltroCodigoCabys}
            className="form-control"
            placeholder="Buscar...."
            onKeyDown={handleKeyDownUsuario}
            onChange={ e => handleInputChangeWithDispatch(e, SetValorFiltroCodigoCabysInventory ) }
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
