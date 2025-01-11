import React from 'react';
import { useTable } from "react-table";

import { useDispatch } from 'react-redux';

import { startGetOneArqueoCash } from '../../actions/arqueocashAction';

export const ArqueoCashSearchArqueoCashModalTable = ({ columns, data }) => {

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

        //Obtener el id de apertura seleccionado
        const { arqueo } = cell.row.original;

        if (arqueo !== undefined && arqueo !== null) {
            // Se llama end-point para traer un arqueo
            dispatch(startGetOneArqueoCash(arqueo));
        }

    }

    return (
        <>
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
