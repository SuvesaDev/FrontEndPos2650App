import React from 'react';

import { useTable } from "react-table";

export const CollectTablePrincipal = ({ columns, data }) => {

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

    return (

        <>
            <div className='table-responsive-md tablaP'>
                <table
                    {...getTableProps()}
                    className="table table-dark table-hover table-bordered text-md-center"
                >
                    <thead className="table-dark">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        // className={ 
                                        //     (column.render("Header") === "Número Factura") 
                                        //     ? 'collect_body-table-header-numeroFactura'
                                        //     : 'collect_body-table-header-fecha'
                                        // }
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody
                        className='table-secondary'
                        {...getTableBodyProps()}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} 
                                    // className='modal-searchCustomerCollect-table-body-row'
                                >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                // className='modal-searchCustomerCollect-table-body-cell'
                                                {...cell.getCellProps()}
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
