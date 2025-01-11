import React from 'react';
import { useDispatch } from 'react-redux';
import { useTable } from "react-table";

import {
    CleanSearchModalDownPayment,
    SetIsOpenModalSearchDownPayment,
    startGetOneDownPayment
} from '../../actions/DownPaymentAction';

export const DownPaymentSearchModalTable = ({ columns, data }) => {

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

        // Se obtiene el id Entrega seleccionado
        const { id } = cell.row.original;

        if (id !== undefined && id !== '') {

            // Se obtiene la data de la entrega
            dispatch(startGetOneDownPayment(id));

            // Limpiar el estado de busqueda
            dispatch(CleanSearchModalDownPayment());

            // Cerrar el modal
            dispatch(SetIsOpenModalSearchDownPayment(false));
        }

    }

    return (
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
    )
}
