import React from 'react';
import { useDispatch } from 'react-redux';
import { useTable } from "react-table";

import {
    CleanSearchCustomersModalDownPayment,
    SetCedulaDownPayment,
    SetCodClienteDownPayment,
    SetIsOpenModalSearchCustomersDownPayment,
    SetNombreDownPayment
} from '../../actions/DownPaymentAction';

export const DownPaymentSearchCustomerModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();

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

        // Se obtiene el cedula y nombre del cliente seleccionado
        const { cedula, nombre, identificacion } = cell.row.original;

        if (cedula !== '' && nombre !== '' && identificacion !== '') {

            // Se establece la codCliente del cliente
            dispatch(SetCodClienteDownPayment(identificacion));

            // Se establece la cedula del cliente
            dispatch(SetCedulaDownPayment(cedula));

            // Se establece el nombre del cliente
            dispatch(SetNombreDownPayment(nombre));

            // Limpiar el estado de busqueda
            dispatch(CleanSearchCustomersModalDownPayment());

            // Cerrar el modal
            dispatch(SetIsOpenModalSearchCustomersDownPayment(false));
        }

    }

    return (
        <>
            <div class="table-responsive-md tablaP">
                <table
                    {...getTableProps()}
                    className="table table-bordered table-hover text-lg-center"
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

                    <tbody
                        className='table-white'
                        {...getTableBodyProps()}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    onClick: () => handleSelectedRow(cell)
                                                })}
                                                data-bs-dismiss="modal"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )
}
