import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AiFillExclamationCircle } from "react-icons/ai";
import {
    SetAbonoDetallePays,
    SetCedulaProveAbonoDetallePays,
    SetCodigoProveAbonoDetallePays,
    SetDisableInputsAbonoActualPays,
    SetFechaFacturaAbonoDetallePays,
    SetIdCompraAbonoDetallePays,
    SetMontoFacturaAbonoDetallePays,
    SetNombreProveAbonoDetallePays,
    SetNumFacturaAbonoDetallePays,
    SetSaldoActualAbonoDetallePays,
    SetSaldoAnteriorAbonoDetallePays
} from "../../../actions/pays";

export const PaysBillingsTable = ({ columns, data, dataProveedor }) => {

    const { nombreProveedor, cedulaProveedor, codigoProveedor } = dataProveedor;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter
    );

    const { auth, idSurcursal } = useSelector(state => state.login);
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

    const dispatch = useDispatch();

    const handleSelectedRow = async (cell) => {
        const { idFactura, montoFactura, saldoAnterior, saldoActual, numeroFactura, fecha } = cell.row.original;
        const datosP = cell.row.original;
        const saldoAnteriorVA = 0;
        const saldoActualVA = saldoActual ? saldoActual : 0.00
        const saldoAnteriorAbono = montoFactura - saldoActualVA;

       // console.log(datosP)
        // console.log(saldoAnteriorAbono)
        // console.log(saldoActualVA)
        if(saldoAnteriorAbono == 0){
            dispatch(SetSaldoAnteriorAbonoDetallePays(saldoAnterior))
        }else{
            dispatch(SetSaldoAnteriorAbonoDetallePays(saldoActual))
        }
        dispatch(SetIdCompraAbonoDetallePays(idFactura))
        dispatch(SetFechaFacturaAbonoDetallePays(fecha))
        dispatch(SetCodigoProveAbonoDetallePays(codigoProveedor))
        dispatch(SetNombreProveAbonoDetallePays(nombreProveedor))
        dispatch(SetCedulaProveAbonoDetallePays(cedulaProveedor))
        dispatch(SetMontoFacturaAbonoDetallePays(montoFactura))
        dispatch(SetSaldoActualAbonoDetallePays(saldoActualVA))
        dispatch(SetAbonoDetallePays(saldoActualVA))
        dispatch(SetNumFacturaAbonoDetallePays(numeroFactura))
        dispatch(SetDisableInputsAbonoActualPays(false))

    }

    return (
        <>
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
                                                    No existen facturas de compra pendientes.
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
        </>
    );


};