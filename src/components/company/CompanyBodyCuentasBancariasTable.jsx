import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import { MdDeleteForever } from 'react-icons/md';

import {
    SetIdBancoCuentaBancariaActualCompany,
    SetIdMonedaCuentaBancariaActualCompany,
    SetIndexCuentaBancariaSeletedCompany,
    SetIsCuentaBancariaEditCompany,
    SetNameBancoCuentaBancariaActualCompany,
    SetNameMonedaCuentaBancariaActualCompany,
    SetNumeroCuentaBancariaActualCompany,
    SetRemoveCuentaBancariaCompany
} from '../../actions/CompanyAction';

export const CompanyBodyCuentasBancariasTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const { empresa } = useSelector(state => state.company);
    const { cuentasBancarias } = empresa;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
    } = useTable({
        columns,
        data,
    },
        usePagination
    );

    const handleSelectedRow = async (cell) => {

        //Obtiene los datos de la cuenta seleccionado
        const { banco, idBanco, idMoneda, moneda, numero } = cell.row.original;

        if (banco !== null && idBanco !== null && idMoneda !== null && moneda !== null && numero !== null) {

            // Se establece que esta en modo editar
            dispatch(SetIsCuentaBancariaEditCompany(true));

            // Se establece el index de la cuenta seleccionada
            dispatch(SetIndexCuentaBancariaSeletedCompany(cell.row.id));

            // Se establece los valores de cuenta bancarias
            dispatch(SetNumeroCuentaBancariaActualCompany(numero));
            dispatch(SetIdBancoCuentaBancariaActualCompany(idBanco));
            dispatch(SetIdMonedaCuentaBancariaActualCompany(idMoneda));
            dispatch(SetNameBancoCuentaBancariaActualCompany(banco));
            dispatch(SetNameMonedaCuentaBancariaActualCompany(moneda));

        }

    }

    const handleDeleteRow = (cell) => {

        // Se obtiene el id de la cuenta seleccionado
        const idLinea = cell.row.id;

        // Se obtiene la linea seleccionada
        const deleteLine = cuentasBancarias[idLinea];

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar la cuenta ${deleteLine.numero}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            if (result.isConfirmed) {
                if (deleteLine !== undefined) {
                    // Se elimina la linea
                    dispatch(SetRemoveCuentaBancariaCompany(deleteLine));
                }
            }

        });
    }

    return (
        <>
            <div className="table-responsive-md tablaP">
                <table className="table table-dark table-hover table-bordered text-md-center" {...getTableProps()}>
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
                        className='table-secondary'
                        {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}
                                            {...cell.getCellProps({
                                                onClick: (cell.column.id === 'accion')
                                                    ? () => handleDeleteRow(cell)
                                                    : () => handleSelectedRow(cell),
                                            })}
                                        >
                                            {
                                                (cell.column.id === 'accion')
                                                    ?
                                                    <>
                                                        <button className='btn btn-danger'>
                                                            <MdDeleteForever className='iconSize' />
                                                        </button>
                                                    </>
                                                    : cell.render("Cell")
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
