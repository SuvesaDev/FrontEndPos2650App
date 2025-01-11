import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination, useTable } from "react-table";
import {
  SetUpdateMontoTopeOpenCash,
  startEditOpenCash,
} from "../../actions/OpenCashAction";
import { TbNumber } from "react-icons/tb";
import { FaColonSign } from "react-icons/fa6";
import { FaDollarSign, FaMoneyBillWave } from "react-icons/fa";
export const OpenCashDetalleTotalTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const dispatch = useDispatch();

  const { caja, isOpenCashEdit } = useSelector((state) => state.OpenCash);
  const { Anulado } = caja.encabezado;

  const handleChangeMontoDetalleTotal = async ({ target }, cell) => {
    if (cell.column.id !== "Monto_Tope") return;

    const { id_total_tope } = cell.row.original;

    if (id_total_tope !== undefined) {
      dispatch(
        SetUpdateMontoTopeOpenCash({
          id_total_tope,
          monto: target.value,
        })
      );
    }
  };

  const handleEnter = (e, cell) => {
    if (e.key !== "Enter") return;

    if (cell.column.id !== "Monto_Tope") return;

    const { id_total_tope, NApertura, CodMoneda, MonedaNombre } =
      cell.row.original;

    if (id_total_tope !== undefined) {
      if (isOpenCashEdit) {
        const newTotalTope = {
          idTotalTope: id_total_tope,
          napertura: NApertura,
          codMoneda: CodMoneda,
          montoTope: parseFloat(e.target.value),
          monedaNombre: MonedaNombre,
        };

        dispatch(startEditOpenCash(newTotalTope, 1));
      }
    }
  };

  const handleLostFocus = (e, cell) => {
    if (cell.column.id !== "Monto_Tope") return;

    const { id_total_tope, NApertura, CodMoneda, MonedaNombre } =
      cell.row.original;

    if (id_total_tope !== undefined) {
      if (isOpenCashEdit) {
        const newTotalTope = {
          idTotalTope: id_total_tope,
          napertura: NApertura,
          codMoneda: CodMoneda,
          montoTope: parseFloat(e.target.value),
          monedaNombre: MonedaNombre,
        };

        dispatch(startEditOpenCash(newTotalTope, 1));
      }
    }
  };

  return (
    <>
      <div className="table-responsive-md tablaP">
        <table
          {...getTableProps()}
          className="table table-bordered table-hover text-md-center"
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
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} {...cell.getCellProps({})}>
                      {cell.column.id === "Monto_Tope" ? (
                        cell.row.values.MonedaNombre === "COLON" ? (
                          <>
                            <div className="input-group">
                              <span className="input-group-text">
                                <FaColonSign className="iconSize" />
                              </span>
                              <input
                                type="number"
                                min="0"
                                className="form-control"
                                onKeyDown={(e) => handleEnter(e, cell)}
                                disabled={isOpenCashEdit ? isOpenCashEdit : Anulado}
                                value={cell.value}
                                onBlur={(e) => handleLostFocus(e, cell)}
                                onChange={(e) => handleChangeMontoDetalleTotal(e, cell)}
                              />
                              <input
                                type="text"
                                className="form-control"
                                value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(cell.value)}
                                disabled
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="input-group">
                              <span className="input-group-text">
                                <FaDollarSign className="iconSize" />
                              </span>
                              <input
                                type="number"
                                min="0"
                                className="form-control"
                                onKeyDown={(e) => handleEnter(e, cell)}
                                disabled={isOpenCashEdit ? isOpenCashEdit : Anulado}
                                value={cell.value}
                                onBlur={(e) => handleLostFocus(e, cell)}
                                onChange={(e) => handleChangeMontoDetalleTotal(e, cell)}
                              />
                              <input
                                type="text"
                                className="form-control"
                                value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cell.value)}
                                disabled
                              />
                            </div>
                          </>
                        )
                      ) : (
                        cell.render("Cell")
                      )}
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
