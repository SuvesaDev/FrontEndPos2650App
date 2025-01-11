import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';

export const CloseCashDetalleOperacionesTable = ({ columns, data }) => {

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

        // if(!isInventoryDisable) {

        //     //Obtiene el price seleccionado
        //     const price = cell.row.values;

        //     //Se establece en el estado y cambia al modo editar
        //     if(price != undefined) {
        //         dispatch( SelectedPricesSellInventory( price ) );
        //         dispatch( IsEditPricesSellInventory( true ) );
        //     }
        // }

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

                <tbody className="table-white"
                    {...getTableBodyProps()}
                >
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}
                            >
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps({
                                                onClick: () => handleSelectedRow(cell)
                                            })}
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
