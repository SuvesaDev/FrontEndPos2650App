import React from 'react'
import { useDispatch } from 'react-redux';
import { usePagination, useTable } from 'react-table';
import { SetOpenModalDetailsPreventaCharge } from '../../actions/ChargeAction';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
export const ChargeBodyTable = ({ columns, data }) => {

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

    const handleSelectedRow = async (cell) => {

        // Levantar el modal
        dispatch(SetOpenModalDetailsPreventaCharge(true));

        // //Obtener el id de Usuario seleccionado
        // const { idUsuario } = cell.row.values;

        // if( idUsuario !== null ) {

        //     // Se obtiene ese usuario
        //     dispatch( startGetOneUsers( idUsuario ) );

        //     //Cerrar el modal
        //     dispatch( SetIsOpenModalSearchUsers( false ) );

        //     //Clean el state de busqueda de users
        //     dispatch( CleanSearchOptionsUsers() );

        // }

    }

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className="table-responsive-lg tablaP">
                        <table className="table table-hover text-lg-center" {...getTableProps()}>
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
                                {...getTableBodyProps()}>
                                {page.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td
                                                    {...cell.getCellProps({
                                                        onDoubleClick: () => handleSelectedRow(cell),
                                                    })}
                                                >
                                                    {
                                                        cell.render("Cell")
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
                    <div className='row mb-2 text-center'>
                        <div className='col-md-2 mb-2'>
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
                                    [10, 25, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Mostrar {pageSize}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='col-md-4 mb-2'>
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
