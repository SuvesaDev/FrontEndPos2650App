import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { usePagination, useTable } from "react-table";
import { ImSortNumbericDesc } from "react-icons/im";
import {
  SetTotalColonesOpenCash,
  SetTotalDolaresOpenCash,
  SetUpdateCantidadDenominacionOpenCash,
  SetUpdateTotalDenominacionOpenCash,
  startEditOpenCash,
} from "../../actions/OpenCashAction";

export const OpenCashDetalleDenominacionTable = ({ columns, data }) => {
  const { caja, isOpenCashEdit } = useSelector((state) => state.OpenCash);
  const { denominaciones } = caja;
  const { Anulado } = caja.encabezado;

  let sumaTotalColones = 0;
  let sumaTotalDolares = 0;

  useEffect(() => {
    //Obtener todos los totales de colones
    denominaciones.forEach((denominacion) => {
      if (denominacion.Moneda === "COLON") {
        sumaTotalColones += denominacion.Total;
      }
    });
    dispatch(SetTotalColonesOpenCash(sumaTotalColones));

    //Obtener todos los totales de dolares
    denominaciones.forEach((denominacion) => {
      if (denominacion.Moneda === "DOLAR") {
        sumaTotalDolares += denominacion.Total;
      }
    });
    dispatch(SetTotalDolaresOpenCash(sumaTotalDolares));
  }, [denominaciones]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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

  const handleChangeCantidadDetalleDenominacion = async ({ target }, cell) => {
    if (cell.column.id !== "Cantidad") return;

    const { Id, Monto } = cell.row.original;

    if (Id !== undefined) {
      // Se actualiza la cantidad
      dispatch(
        SetUpdateCantidadDenominacionOpenCash({
          Id,
          cantidad: parseInt(target.value),
        })
      );

      // Se actualiza la total de esa denominacion
      const newTotal = parseFloat(Monto) * parseFloat(target.value);
      dispatch(
        SetUpdateTotalDenominacionOpenCash({
          Id,
          total: isNaN(newTotal) ? 0 : newTotal,
        })
      );
    }
  };

  const handleEnter = (e, cell) => {
    if (e.key !== "Enter") return;

    if (cell.column.id !== "Cantidad") return;

    const { Id, Monto, Id_Apertura, Id_Denominacion } = cell.row.original;

    if (Id !== undefined) {
      if (isOpenCashEdit) {
        const newDenominacion = {
          id: Id,
          idApertura: Id_Apertura,
          idDenominacion: Id_Denominacion,
          monto: Monto,
          cantidad: parseFloat(e.target.value),
        };

        dispatch(startEditOpenCash(newDenominacion, 2));
      }
    }
  };

  const handleLostFocus = (e, cell) => {
    if (cell.column.id !== "Cantidad") return;

    const { Id, Monto, Id_Apertura, Id_Denominacion } = cell.row.original;

    if (Id !== undefined) {
      if (isOpenCashEdit) {
        const newDenominacion = {
          id: Id,
          idApertura: Id_Apertura,
          idDenominacion: Id_Denominacion,
          monto: Monto,
          cantidad: parseFloat(e.target.value),
        };

        dispatch(startEditOpenCash(newDenominacion, 2));
      }
    }
  };

  return (
    <>
      <div class="table-responsive-sm tablaPCash">
        <table
          {...getTableProps()}
          className="table table-bordered table-hover text-lg-center"
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
                      <td {...cell.getCellProps()} {...cell.getCellProps({})}>
                        {cell.column.id === "Cantidad" ? (
                          <div className="input-group">
                            <span className="input-group-text">
                              <ImSortNumbericDesc className="iconSize" />
                            </span>
                            <input
                              type="number"
                              min="0"
                              className="form-control"
                              onKeyDown={(e) => handleEnter(e, cell)}
                              value={cell.value}
                              disabled={
                                isOpenCashEdit ? isOpenCashEdit : Anulado
                              }
                              onBlur={(e) => handleLostFocus(e, cell)}
                              onChange={(e) =>
                                handleChangeCantidadDetalleDenominacion(e, cell)
                              }
                            />
                          </div>
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
