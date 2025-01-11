import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { SetActiveButtonSavePays, SetAllAbonosPays, SetBancoPays, SetCedulaProveAbonoDetallePays, SetCleanAbonoActualPays, SetCleanFacturasProveedor, SetCleanSeletecProveedor, SetCodigoProveAbonoDetallePays, SetCodigoProvePays, SetCuentaBancoPays, SetCuentasProveedorPays, SetDisableInputsPays, SetDisableInputsUserPays, SetFacturasProveedorPays, SetFechaAbonoPays, SetIsEnablePrintButtonPays, SetMonedaAbonoPays, SetNombreProveAbonoDetallePays, SetNumeroCuentaProveedorPays, SetNumeroDocumentoPays, SetNumeroReciboPays, SetObservacionesAbonoPays, SetTipoPagoPays, SetTotalMontoRecibidoPays, SetTotalSaldoActualPays, SetTotalSaldoAnteriorPays, startAllCuentasBancariasProveedorPays, startDatosProveedorPays } from "../../actions/pays";
import { SetCleanAllMonedas, startGetAllMonedas } from "../../actions/MonedasAction";

export const PayReSearchModalTable = ({ columns, data }) => {
    const dispatch = useDispatch();
    const [filtro, setFiltro] = useState("");
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

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFiltro(value);
        setGlobalFilter(value);
    };

    const handleSelectedRow = async (cell) => {
        const { codProveedor, documento, recibo, codMoneda, codigoBanco, cuentaBancaria,
            cuentaDestino, fecha, monto, observaciones, detalle, saldoActual, saldoCuenta, tipoDocumento

        } = cell.row.original;
        console.log(cell.row.original)
        dispatch(SetCodigoProvePays(codProveedor))
        dispatch(startDatosProveedorPays(codProveedor))
        dispatch(SetNumeroReciboPays(recibo))
        dispatch(SetNumeroDocumentoPays(documento))
        dispatch(SetMonedaAbonoPays(codMoneda))
        dispatch(SetBancoPays(codigoBanco))
        dispatch(SetCuentaBancoPays(cuentaBancaria))
        dispatch(SetNumeroCuentaProveedorPays(cuentaDestino))
        dispatch(SetFechaAbonoPays(fecha))
        dispatch(SetTotalMontoRecibidoPays(monto))
        dispatch(SetTotalSaldoActualPays(saldoActual))
        dispatch(SetTotalSaldoAnteriorPays(monto+saldoActual))
        dispatch(SetTipoPagoPays(tipoDocumento))
        dispatch(SetObservacionesAbonoPays(observaciones))
        dispatch(SetAllAbonosPays(detalle))

        // Desactivar los inputs de usuario
        dispatch(SetDisableInputsUserPays(false));
        dispatch(SetDisableInputsPays(true));
        dispatch(SetActiveButtonSavePays(false));
        dispatch(SetIsEnablePrintButtonPays(true))
        dispatch(SetCleanFacturasProveedor())
        dispatch(SetCleanAbonoActualPays())


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
            <hr />
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
                                                    filtros y/o no existen abonos pagar.
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