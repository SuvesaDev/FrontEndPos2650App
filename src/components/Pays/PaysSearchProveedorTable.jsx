import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { SetCedulaProveAbonoDetallePays, SetCleanSeletecProveedor, SetCodigoProveAbonoDetallePays, SetCodigoProvePays, SetFacturasProveedorPays, SetNombreProveAbonoDetallePays, SetTotalSaldoActualPays, SetTotalSaldoAnteriorPays, startAllCuentasBancariasProveedorPays } from "../../actions/pays";
import { SetCleanAllMonedas, startGetAllMonedas } from "../../actions/MonedasAction";

export const PaysSearchProveedorTable = ({ columns, data }) => {
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
        const { idProveedor, cedula, nombre, facturas } = cell.row.original;
        console.log(cell.row.original)
        dispatch(SetCleanSeletecProveedor())
        dispatch(SetCodigoProveAbonoDetallePays(idProveedor))
        dispatch(SetCodigoProvePays(idProveedor))
        dispatch(SetCedulaProveAbonoDetallePays(cedula))
        dispatch(SetNombreProveAbonoDetallePays(nombre))
        dispatch(SetFacturasProveedorPays(facturas))
        dispatch(startAllCuentasBancariasProveedorPays(idProveedor))

        let totalSaldoAnterior = 0;
        let totalSaldoActual = 0;

        facturas.forEach(factura => {
            totalSaldoAnterior += factura.saldoAnterior || 0;
            totalSaldoActual += factura.saldoActual || 0;
        });
        totalSaldoAnterior = totalSaldoAnterior.toFixed(2);
        totalSaldoActual = totalSaldoActual.toFixed(2);

        dispatch(SetTotalSaldoAnteriorPays(totalSaldoActual))
        dispatch(SetTotalSaldoActualPays(totalSaldoActual))
  

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
        </>
    );


};