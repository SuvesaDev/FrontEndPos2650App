import React from 'react'

import { usePagination, useTable } from 'react-table';

export const CompanyBodyActividadesEmpresaTable = ({ columns, data }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
    } = useTable({
        columns,
        data,
    },
        usePagination
    );

    return (
        <>
            <div className="table-responsive-md tablaP">
                <table className="table table-dark table-hover table-bordered text-md-center" {...getTableProps()}>
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
                        {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}
                                            {...cell.getCellProps({})}
                                        >
                                            {
                                                (cell.column.id === 'estado')
                                                    ? (cell.value)
                                                        ? 'Activo'
                                                        : 'Desactivado'
                                                    : cell.render("Cell")
                                            }
                                        </td>
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
