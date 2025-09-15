import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";

import { startGetOneFollowingConsignment } from '../../../../actions/FollowingConsignmentAction';

export const FollowingConsignmentIBodyListTable = ({ columns, data }) => {

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
        
        if(cell.column.id === 'icon') {
            const { idConsignacion } = cell.row.original;
            dispatch(startGetOneFollowingConsignment(idConsignacion));
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
                                                    onClick: (cell.column.id === 'icon')
                                                        ? () => handleSelectedRow(cell)
                                                        : () => {},
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
        </>
    )
}
