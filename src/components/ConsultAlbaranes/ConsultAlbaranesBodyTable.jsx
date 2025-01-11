import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import {
    openModalConsultAlbaranes,
    startGetOneAlbaran,
    SetAddAlbaranFacturarConsultAlbaranes,
    SetRemoveAlbaranFacturarConsultAlbaranes,
    SetRemoveAllAlbaranesFacturarConsultAlbaranes,
    checkMarcaTodosConsultAlbaranes,
    SetEditLineaAlbaranConsultAlbaranes,
    SetEditExtranjeroConsultAlbaranes
} from '../../actions/consultAlbaranesAction';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

export const ConsultAlbaranesBodyTable = ({ columns, data }) => {

    const dispatch = useDispatch();
    const {
        albaranes,
        albarnesTable,
        albaranesFacturar,
        checkMarcaTodos,
        checkExtrajerosTodos,
        disableInputs,
        aumentoExtranjero
    } = useSelector(state => state.consultAlbaranes);

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

        if (!disableInputs) {
            dispatch(openModalConsultAlbaranes(true));
            dispatch(startGetOneAlbaran(cell.row.original.id))
        }
    }

    const handleCheckRowFactura = (e, cell) => {

        const { id } = cell.row.original;

        const exitsAlbaran = albaranesFacturar.find(albaran => albaran.id === id);

        if (checkMarcaTodos) {
            dispatch(checkMarcaTodosConsultAlbaranes(false));
            dispatch(SetRemoveAllAlbaranesFacturarConsultAlbaranes())
        }

        if (exitsAlbaran === undefined) {

            // Ingresarlo el albaran a la lista de facturar
            const newAlbaran = albarnesTable.find(albaran => albaran.id === id);
            dispatch(SetAddAlbaranFacturarConsultAlbaranes(newAlbaran));

        } else {
            // Sacar el albaran de la lista de facturar
            dispatch(SetRemoveAlbaranFacturarConsultAlbaranes(id));
        }
    }

    const handleCheckRowExtranjero = (e, cell) => {

        const { id } = cell.row.original;
        const idLinea = cell.row.id;

        const exitsAlbaran = albarnesTable.find(albaran => albaran.id === id);

        // Aumentar el porcentaje de extranjero de las filas seleccionadas
        if (aumentoExtranjero === 0) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'No se cargo el porcentaje de aumento de extranjero'
            });

            return;
        }

        if (exitsAlbaran.subtotal === exitsAlbaran.subtotalOriginal) {

            // Aumentar 
            let montoAumento = 0;

            montoAumento = exitsAlbaran.subtotal * (aumentoExtranjero / 100);
            exitsAlbaran.subtotal = exitsAlbaran.subtotal + montoAumento;
            exitsAlbaran.total = exitsAlbaran.subtotal + exitsAlbaran.impuesto;

            dispatch(SetEditLineaAlbaranConsultAlbaranes(exitsAlbaran, idLinea));

            dispatch(SetEditExtranjeroConsultAlbaranes({ index: parseInt(idLinea), extranjero: true }));

        } else if (exitsAlbaran.subtotal > exitsAlbaran.subtotalOriginal) {

            // Disminuir
            exitsAlbaran.subtotal = exitsAlbaran.subtotalOriginal;
            exitsAlbaran.total = exitsAlbaran.subtotal + exitsAlbaran.impuesto;

            dispatch(SetEditLineaAlbaranConsultAlbaranes(exitsAlbaran, idLinea));

            dispatch(SetEditExtranjeroConsultAlbaranes({ index: parseInt(idLinea), extranjero: false }));

        }

    }

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className="table-responsive-md tablaP">
                        <table
                            {...getTableProps()}
                            className="table table-dark table-hover table-bordered text-md-center"
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
                                                        onClick: (cell.column.id === 'facturar' || cell.column.id === 'extranjero')
                                                            ? () => { }
                                                            : () => handleSelectedRow(cell),
                                                    })}
                                                >
                                                    {
                                                        (cell.column.id === 'facturar')
                                                            ? (checkMarcaTodos)
                                                                ? <input
                                                                    type="checkbox"
                                                                    disabled={disableInputs}
                                                                    checked={(checkMarcaTodos) ?? true}
                                                                    onChange={(e) => handleCheckRowFactura(e, cell)}
                                                                    class="form-check-input checkP"
                                                                />
                                                                : <input
                                                                    type="checkbox"
                                                                    disabled={disableInputs}
                                                                    onChange={(e) => handleCheckRowFactura(e, cell)}
                                                                    class="form-check-input checkP"
                                                                />
                                                            : (cell.column.id === 'extranjero')
                                                                ? (checkExtrajerosTodos)
                                                                    ? <input
                                                                        type="checkbox"
                                                                        disabled={disableInputs}
                                                                        checked={(checkExtrajerosTodos) ?? true}
                                                                        onChange={(e) => handleCheckRowExtranjero(e, cell)}
                                                                        class="form-check-input checkP"
                                                                    />
                                                                    : <input
                                                                        type="checkbox"
                                                                        disabled={disableInputs}
                                                                        checked={cell.value}
                                                                        onChange={(e) => handleCheckRowExtranjero(e, cell)}
                                                                        class="form-check-input checkP"
                                                                    />
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
                                    disabled={disableInputs}
                                />
                            </div>
                        </div>

                        <div className='col-md-3 mb-2'>
                            <select className='form-select' disabled={disableInputs} style={{ width: '150px' }} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                                {
                                    [10, 25, 50].map(pageSize => (
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
