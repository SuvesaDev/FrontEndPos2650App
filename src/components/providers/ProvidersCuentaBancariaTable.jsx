import React from 'react'
import { useTable } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';

import {
    SetIndexCuentasBancariasActualProveedores,
    SetIsEditCuentasBancariasActualProveedores,
    SetSelectedCuentasBancariasActualProveedores,
    startDeleteCuentaBancariaProveedores
} from '../../actions/ProveedoresAction';

export const ProvidersCuentaBancariaTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const {
        proveedor,
        disableInputs
    } = useSelector(state => state.proveedores);

    const { cuentasBancariasProveedors } = proveedor;

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

        if (!disableInputs) {

            //Obtiene el cuenta seleccionado
            const selectedCuenta = cuentasBancariasProveedors[cell.row.id];

            //Se establece en el estado y cambia al modo editar
            if (selectedCuenta != undefined) {
                dispatch(SetSelectedCuentasBancariasActualProveedores(selectedCuenta));
                dispatch(SetIndexCuentasBancariasActualProveedores(cell.row.id));
                dispatch(SetIsEditCuentasBancariasActualProveedores(true));
            }
        }
    }

    const handleDeleteRow = (cell) => {
        if (!disableInputs) {
            dispatch(startDeleteCuentaBancariaProveedores(cuentasBancariasProveedors[cell.row.id]));
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

                    <tbody
                        className='table-white'
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
                                                        ? () => handleDeleteRow(cell)
                                                        : () => handleSelectedRow(cell),
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
