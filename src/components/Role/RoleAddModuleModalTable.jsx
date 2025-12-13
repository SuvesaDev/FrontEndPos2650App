import React from 'react'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import { MdDeleteForever } from 'react-icons/md';
import { VscFolderActive } from 'react-icons/vsc';

import { 
    SetBorrarModuloActualRole,
    SetCrearModuloActualRole,
    SetDeleteModuloRole,
    SetIdModuloSeletedRole,
    SetIdPantallaModuloActualRole, 
    SetIsEditModuloRole, 
    SetModificarModuloActualRole, 
    SetNombrePantallaModuloActualRole,
    SetVerModuloActualRole
} from '../../actions/RoleAction';

export const RoleAddModuleModalTable = ({ columns, data }) => {

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
        const { 
            idPantalla,
            nombrePantalla,
            crear,
            modificar,
            borrar,
            ver 
        } = cell.row.original;

        dispatch( SetIdPantallaModuloActualRole(idPantalla));
        dispatch( SetNombrePantallaModuloActualRole(nombrePantalla));
        dispatch( SetCrearModuloActualRole(crear));
        dispatch( SetModificarModuloActualRole(modificar));
        dispatch( SetBorrarModuloActualRole(borrar));
        dispatch( SetVerModuloActualRole(ver));
        
        // Se establece que esta en modo edit
        dispatch(SetIsEditModuloRole(true));

        dispatch(SetIdModuloSeletedRole(cell.row.index));

    }

    const handleDeleteRow = (cell) => {

        // Se obtiene el id de la cuenta seleccionado
        dispatch(SetDeleteModuloRole(cell.row.index))
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
                                                onClick: (cell.column.id === 'accion')
                                                    ? () => handleDeleteRow(cell)
                                                    : () => handleSelectedRow(cell),
                                            })}
                                        >
                                            {
                                                (cell.column.id === 'crear' || cell.column.id === 'modificar'
                                                    || cell.column.id === 'borrar' || cell.column.id === 'ver'
                                                )
                                                    ? (cell.value)
                                                        ? 'Activo'
                                                        : 'Desactivado'
                                                    : (cell.column.id === 'accion')
                                                        ?   <div >
                                                                <>
                                                                    <button className='btn btn-danger'>
                                                                        <MdDeleteForever className='iconSize' />
                                                                    </button>
                                                                </>
                                                            </div>
                                                        :   cell.render("Cell")
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