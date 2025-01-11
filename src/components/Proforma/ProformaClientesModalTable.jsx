import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from "react-table";
import { SetCedulaClienteDataBudgets, SetCodigoClienteDataBudgets, SetContactoClienteDataBudgets, SetMaximoDescuentoClienteDataBudgets, SetNombreClienteDataBudgets, SetTelefonoClienteDataBudgets, SetTipoCedulaClienteDataBudgets, SetTipoPrecioClienteDataBudgets } from '../../actions/budgetsAction';

export const ProformaClientesModalTable = ({ columns, data }) => {
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
        console.log(cell)
        const { cedula, nombre, telefono_01, e_Mail, idTipoIdentificacion, identificacion, descuento, tipoprecio} = cell;
        dispatch(SetCedulaClienteDataBudgets(cedula))
        dispatch(SetNombreClienteDataBudgets(nombre))
        dispatch(SetTelefonoClienteDataBudgets(telefono_01))
        dispatch(SetCodigoClienteDataBudgets(identificacion))
        dispatch(SetContactoClienteDataBudgets(e_Mail))
        dispatch(SetTipoCedulaClienteDataBudgets(idTipoIdentificacion))
        dispatch(SetMaximoDescuentoClienteDataBudgets(descuento))
        dispatch(SetTipoPrecioClienteDataBudgets(tipoprecio))
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
                                                    onClick: (e) => {
                                                        handleSelectedRow(cell.row.original);
                                                    }
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
