import React from 'react';

import { useTable } from "react-table";
import { useSelector, useDispatch } from 'react-redux';


import {
    CleanCloseCashSearchCloseCash,
    SetActiveButtonRemoveCloseCash,
    SetCheckCierreSearchModalCloseCash,
    SetCheckFechasSearchModalCloseCash,
    SetCheckNombreSearchModalCloseCash,
    SetCleanAperturasSinCerrarCloseCash,
    SetDisableInputsFechasSearchModalCloseCash,
    SetIsOpenModalSearchCloseCash,
    SetIsOpenModalSeletedAperturaCloseCash,
    SetValorSearchCloseCash,
    startGetDataOneCloseCash,
    startGetOneCloseCash
} from '../../actions/CloseCashAction';

export const CloseCashSearchModalTable = ({ columns, data }) => {

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
        const { numApertura, nombre, cedula, fechaCierre, fechaApertura, cierre } = cell.row.original;

        if (numApertura !== null) {

            // Se deshabilita el icon de anular
            dispatch(SetActiveButtonRemoveCloseCash(false));

            // Se obtiene la data de la cierre de caja
            dispatch(startGetOneCloseCash(numApertura, nombre, cedula, fechaCierre, fechaApertura, cierre));

            // Cerrar el modal
            dispatch(SetIsOpenModalSearchCloseCash(false));

            dispatch(SetValorSearchCloseCash(''));
            dispatch(SetCheckCierreSearchModalCloseCash(true));
            dispatch(SetCheckNombreSearchModalCloseCash(false));
            dispatch(SetCheckFechasSearchModalCloseCash(false));
            dispatch(SetDisableInputsFechasSearchModalCloseCash(true));
            dispatch(CleanCloseCashSearchCloseCash());

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
        </>
    )
}
