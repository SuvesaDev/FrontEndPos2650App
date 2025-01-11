import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AiFillExclamationCircle } from "react-icons/ai";
import {
    SetAbonoDetallePays, SetAllAbonosPays, SetDisableInputsAbonoActualPays, SetFechaFacturaAbonoDetallePays,
    SetIdCompraAbonoDetallePays, SetMontoFacturaAbonoDetallePays, SetNumFacturaAbonoDetallePays,
    SetSaldoActualAbonoDetallePays, SetSaldoAnteriorAbonoDetallePays,
    SetIsNewAbonoPays,
    SetFechaAbonoPays,
    SetCodigoProveAbonoDetallePays,
    SetNombreProveAbonoDetallePays,
    SetCedulaProveAbonoDetallePays,
    SetTotalSaldoActualPays,
    SetTotalMontoRecibidoPays
} from "../../actions/pays";
import Swal from 'sweetalert2';

export const PaysDetailsTable = ({ columns, data }) => {

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
    const {
        abonos,
        totalSaldoAnterior,
        totalMontoRecibido,
        totalSaldoActual, disableInputs } = useSelector(state => state.pays)

    const dispatch = useDispatch();

    const handleSelectedRow = async (cell) => {
        const { codProveedor, nombreProveedor, cedulaProveedor, idCompra, factura, abono, fecha, montoFactura, saldoAnt, saldoActual, fechaFactura } = cell;
        const saldoAnteriorVA = saldoAnt ? saldoAnt : 0.00
        dispatch(SetIdCompraAbonoDetallePays(idCompra))
        dispatch(SetFechaFacturaAbonoDetallePays(fechaFactura))
        dispatch(SetCodigoProveAbonoDetallePays(codProveedor))
        dispatch(SetMontoFacturaAbonoDetallePays(montoFactura))
        dispatch(SetSaldoActualAbonoDetallePays(saldoAnt))
        dispatch(SetSaldoAnteriorAbonoDetallePays(saldoAnteriorVA))
        dispatch(SetAbonoDetallePays(abono))
        dispatch(SetNumFacturaAbonoDetallePays(factura))
        dispatch(SetDisableInputsAbonoActualPays(false))
        dispatch(SetIsNewAbonoPays(false))
    }

    const handleDeleteRow = (cell) => {
        console.log(cell)
        Swal.fire({
            title: `¿Está seguro(a) de eliminar este abono?`,
            icon: 'question',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Mantener',
            denyButtonText: `Eliminar`,
        }).then(async (result) => {
            if (result.isDenied) {
                const nuevoAbonos = abonos.filter(detalle => detalle.factura !== cell.factura);
                const totalMontoRecibidoGeneral = parseFloat(totalMontoRecibido) - parseFloat(cell.abono);
                const totalSaldoActualGeneral = parseFloat(totalSaldoActual) + parseFloat(cell.abono);
                dispatch(SetAllAbonosPays(nuevoAbonos));
                dispatch(SetTotalMontoRecibidoPays(totalMontoRecibidoGeneral))
                dispatch(SetTotalSaldoActualPays(totalSaldoActualGeneral))
            }
        });
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
                                                    No existen abonos generados.
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
                                                key={cell.column.id}
                                                {...cell.getCellProps({
                                                    onClick: disableInputs
                                                        ? null
                                                        : cell.column.id === 'deleteRow'
                                                            ? () => handleDeleteRow(cell.row.original)
                                                            : () => handleSelectedRow(cell.row.original),
                                                })}
                                            >
                                                {cell.render("Cell", { disabled: disableInputs })}
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