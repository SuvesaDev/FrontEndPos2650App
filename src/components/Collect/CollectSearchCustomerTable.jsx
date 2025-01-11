import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from "react-table";

import {
    CleanStateSearchCustomerModalCollect,
    SetCedulaCustomerAbonoCollect,
    SetFacturasPendientesCollect,
    SetIdentificacionCustomerAbonoCollect,
    SetIsOpenModalSearchCustomerCollect,
    SetNombreCustomerAbonoCollect,
    startGetOneFichaCollect
} from '../../actions/CollectAction';
import { AiFillExclamationCircle } from 'react-icons/ai';

export const CollectSearchCustomerModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const { customersAllFacturas, abono } = useSelector(state => state.collect);

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

        const { cedula, idCliente, nombre } = cell.row.original;

        if (idCliente !== undefined) {
            const cliente = customersAllFacturas.find(customer => customer.idCliente === idCliente);
            let facturasCliente = [];
            if (cliente && cliente.facturas) {
                cliente.facturas.forEach(factura => {
                    if (factura.idCliente === idCliente) {

                        facturasCliente.push({
                            idFactura: factura.idFactura,
                            idCliente: factura.idCliente,
                            fecha: factura.fecha,
                            numeroFactura: factura.numeroFactura
                        })
                    }
                });
            }

            if (abono.numeroFicha === '') {
                dispatch(startGetOneFichaCollect());
            }

            //Se ingresa las facturas del cliente
            dispatch(SetFacturasPendientesCollect(facturasCliente));

            // Se ingresa la identificacion del cliente
            dispatch(SetIdentificacionCustomerAbonoCollect(idCliente));

            // Se ingresa la cedula
            dispatch(SetCedulaCustomerAbonoCollect(cedula));

            // Se ingresa el nombre
            dispatch(SetNombreCustomerAbonoCollect(nombre));

            // Se limpia el state
            dispatch(CleanStateSearchCustomerModalCollect());

            // Se cierra el modal
            dispatch(SetIsOpenModalSearchCustomerCollect(false));

        }

    }

    return (
        <div className="table-responsive-md tablaP">
            <table className="table table-dark table-hover table-bordered text-md-center"
                {...getTableProps()}
            >
                <thead className="table-dark">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="table-secondary"
                    {...getTableBodyProps()}
                >
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
                                                No existen coincidencias con lo ingresado y/o no hay facturas de credito pendientes.
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
    )
}
