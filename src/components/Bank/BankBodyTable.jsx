import React from 'react'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import { MdDeleteForever } from 'react-icons/md';
import { VscFolderActive } from 'react-icons/vsc';

import {
    SetBancoActualBank,
    SetIdSeletedBancoBank,
    SetIsEditBank,
    startActiveBank,
    startDisableBank
} from '../../actions/BankAction';

export const BankBodyTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const { idSeletedBanco } = useSelector(state => state.bank);

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

    const handleSelectedRow = (cell) => {

        //Obtiene los datos del banco seleccionado
        const { id, banco } = cell.row.original;

        // Se establece el idBanco seleccionado
        dispatch(SetIdSeletedBancoBank(id));

        // Se establece la descripcion del banco seleccionado
        dispatch(SetBancoActualBank(banco));

        // Se establece que esta en modo edit
        dispatch(SetIsEditBank(true));

    }

    const handleDeleteRow = (cell) => {

        // Se obtiene el id de la cuenta seleccionado
        const { id, banco, activo } = cell.row.original;

        if (activo === true) {

            // Disable
            dispatch(startDisableBank(id, banco));

        } else {
            // Active
            dispatch(startActiveBank(id, banco));
        }
    }

    return (
        <>
            <div className='table-responsive-md tablaP'>
                <table {...getTableProps()} className="table table-dark table-hover table-bordered text-md-center">

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
                                <tr {...row.getRowProps()}
                                >
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}
                                            {...cell.getCellProps({
                                                onClick: (cell.column.id === 'activo')
                                                    ? () => handleDeleteRow(cell)
                                                    : () => handleSelectedRow(cell),
                                            })}
                                        >
                                            {
                                                (cell.column.id === 'activo')
                                                    ? (cell.value)
                                                        ? <div
                                                        >
                                                            <>
                                                                <button className='btn btn-danger'>
                                                                    <MdDeleteForever className='iconSize' />
                                                                </button>
                                                            </>
                                                        </div>
                                                        : <div
                                                        >
                                                            <>
                                                                <button className='btn btn-success'>
                                                                    <VscFolderActive className='iconSize' />
                                                                </button>
                                                            </>
                                                        </div>
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