import React from 'react'
import { useTable } from 'react-table';

export const ChargeDetailsPreventaTableModal = ({ columns, data }) => {
    
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
        }
    );

    return (
        <>
            <div className='modal_detailsPreventa-details-table-main'>
                <table {...getTableProps()}>

                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className={
                                        (column.render("id") === "codArticulo")
                                        ? 'modal_detailsPreventa-details-table-header-codArticulo'
                                        : (column.render("id") === "descripcion")
                                        ? 'modal_detailsPreventa-details-table-header-descripcion'
                                        : (column.render("id") === "cantidad")
                                        ? 'modal_detailsPreventa-details-table-header-cantidad'
                                        : (column.render("id") === "impuesto")
                                        ? 'modal_detailsPreventa-details-table-header-impuesto'
                                        : (column.render("id") === "subTotal")
                                        ? 'modal_detailsPreventa-details-table-header-subTotal'
                                        : 'modal_detailsPreventa-details-table-header-total'
                                    }
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody 
                        className='modal_detailsPreventa-details-table-body'
                        {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}
                                        className='modal_detailsPreventa-details-table-cell'
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
        </>

    )
}
