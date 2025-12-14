import React from 'react'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import { MdDeleteForever } from 'react-icons/md';
import { VscFolderActive } from 'react-icons/vsc';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
    } = useTable({
        columns,
        data,
    },
        usePagination
    );

    const { pageIndex, pageSize } = state;

    const handleGotoPage = (e) => {
        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
        gotoPage(pageNumber);
    }

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
            <div className='card'>
                <div className='card-body'>
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
                </div>

                <div className='card-footer'>
                    <div className='row mb-2'>
                        <div className='col-md-3 mb-2'>
                            <span>
                                Pagina{' '}
                                <strong>
                                    {pageIndex + 1} de {pageOptions.length}
                                </strong>{' '}
                            </span>
                        </div>

                        <div className='col-md-3 mb-2'>
                            <div className="input-group" style={{ width: '180px' }}>
                                <span className="input-group-text">
                                    Ir a la pagina: {' '}
                                </span>
                                <input
                                    type='number'
                                    className='form-control'
                                    defaultValue={pageIndex + 1}
                                    onChange={handleGotoPage}
                                />
                            </div>
                        </div>

                        <div className='col-md-3 mb-2'>
                            <select className='form-select' style={{ width: '150px' }} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                                {
                                    [5, 10, 15].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Mostrar {pageSize}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='col-md-3 mb-2'>
                            <div className='inline-containerCenter'>
                                <button
                                    className='btn btn-dark'
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                                >
                                    <FaArrowLeftLong className="iconSize" />
                                </button>

                                <button
                                    className='btn btn-dark'
                                    onClick={previousPage}
                                    disabled={!canPreviousPage}
                                >
                                    Anterior
                                </button>

                                <button
                                    className='btn btn-dark'
                                    onClick={nextPage}
                                    disabled={!canNextPage}
                                >
                                    Siguiente
                                </button>

                                <button
                                    className='btn btn-dark'
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                                >
                                    <FaArrowRightLong className="iconSize" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}