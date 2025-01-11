import React from 'react';
import { useDispatch } from 'react-redux';
import { useTable } from "react-table";

import {
    CleanStateSearchBillingModalRepayment,
    SetIsOpenSearchBillingModalRepayment,
    startSearchOneBilling
} from '../../actions/repaymentAction';

export const RepaymentSearchBillingModalTable = ({ columns, data }) => {

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

        // Se obtiene el idFactura seleccionado
        const { id } = cell.row.original;

        if (id !== undefined) {

            // Se busca la factura
            dispatch(startSearchOneBilling(id));

            // Se limpia el estado de clean
            dispatch(CleanStateSearchBillingModalRepayment());

            // Se cierre el modal de busqueda
            dispatch(SetIsOpenSearchBillingModalRepayment(false));
        }

    }

    return (
        <div className="table-responsive-md tablaP">
            <table
                {...getTableProps()}
                className="table table-dark table-hover table-bordered text-md-center"
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
