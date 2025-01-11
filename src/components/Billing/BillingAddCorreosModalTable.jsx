import React, { useEffect, useState } from 'react';
import { useTable } from "react-table";

import { useSelector, useDispatch } from 'react-redux';

import {
    IsCorreoComprobanteEditBilling,
    SeletedCorreoComprobantesBilling,
    SetCorreoComprobanteActualBilling
} from '../../actions/billing';

export const BillingAddCorreosModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

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

        //Obtener el correo seleccionado
        const { correoComprobante } = cell.row.values;

        if (correoComprobante !== null) {
            dispatch(SeletedCorreoComprobantesBilling({ value: correoComprobante, number: numberScreen }));
            dispatch(SetCorreoComprobanteActualBilling({ value: correoComprobante, number: numberScreen }));
            dispatch(IsCorreoComprobanteEditBilling({ value: true, number: numberScreen }));
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
        </>
    )
}