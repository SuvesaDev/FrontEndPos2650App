import React from 'react';

import { useTable } from "react-table";
import { useSelector, useDispatch } from 'react-redux';


import {
    SetCleanAperturasSinCerrarCloseCash,
    SetIsOpenModalSeletedAperturaCloseCash,
    startGetDataOneCloseCash
} from '../../actions/CloseCashAction';

export const CloseCashSeletedAperturaModalTable = ({ columns, data }) => {

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

        //Obtener la data seleccionado
        const { apertura, nombre, cedula, fecha } = cell.row.original;

        if (apertura !== null) {

            // Se obtiene la data de la cierre de caja
            dispatch(startGetDataOneCloseCash(apertura, nombre, cedula, fecha));

            // Cerrar el modal
            dispatch(SetIsOpenModalSeletedAperturaCloseCash(false));

            // Clean las aperturas
            dispatch(SetCleanAperturasSinCerrarCloseCash());

        }

    }

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
                    {...getTableBodyProps()}
                >
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} >
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
