import React from 'react'

import { usePagination, useTable } from 'react-table';

export const ArqueoCashDetalleOperacionesTable = ({ columns, data }) => {

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
    },
        usePagination
    );

    return (

        <div className="table-responsive-lg tablaP">
            <table {...getTableProps()} className="table table-hover text-lg-center">

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

                <tbody className="table-white"
                    {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}
                                        {...cell.getCellProps({})}
                                    >
                                        {
                                            cell.render("Cell")
                                        }
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
