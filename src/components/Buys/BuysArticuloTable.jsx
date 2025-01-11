import Swal from 'sweetalert2';
import React from 'react';
import { useTable } from "react-table";
import { useSelector, useDispatch } from 'react-redux';

import { MdDeleteForever } from 'react-icons/md';

import {
    CleanDetalleActualCompras,
    SetAddDetalleActualCompras,
    SetIsDetalleActualEditCompras,
    SetPosicionActualCompra,
    startDeleteDetalleCompras
} from '../../actions/ComprasAction';

export const BuysArticuloTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const { compras } = useSelector(state => state.compras);
    const { detalle } = compras;

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

    const handleDeleteRow = (cell) => {

        //Obtener el CodArticulo de articulo seleccionado
        const { CodArticulo } = cell.row.values;

        if (CodArticulo !== null) {

            const detalleActual = detalle[cell.row.id];

            if (detalleActual.isImportXML === true) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: `Este producto ${detalleActual.Descripcion} es importado desde XML no se puede editar o eliminar.`
                });

                return;
            }

            dispatch(startDeleteDetalleCompras(detalleActual));
            dispatch(CleanDetalleActualCompras());
            dispatch(SetIsDetalleActualEditCompras(false));
        }
    }

    const handleSelectedRow = async (cell) => {

        //Obtener el CodArticulo de articulo seleccionado
        const { CodArticulo } = cell.row.values;

        if (CodArticulo !== null) {

            const detalleActual = detalle[cell.row.id];

            if (detalleActual.isImportXML === true) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: `Este producto ${detalleActual.Descripcion} es importado desde XML no se puede editar o eliminar.`
                });

                return;
            }

            //Agregarlo al detalle Actual
            dispatch(SetPosicionActualCompra(cell.row.id));
            dispatch(SetIsDetalleActualEditCompras(true));
            dispatch(SetAddDetalleActualCompras(detalleActual));
        }

    }

    return (
        <>
            <div className="table-responsive-md tablaP">
                <table className="table table-dark table-hover table-bordered text-md-center"
                    {...getTableProps()}
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

                    <tbody className="table-secondary"
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
                                                {
                                                    (cell.column.id === 'icon')
                                                        ? <>
                                                            <button className='btn btn-danger'>
                                                                <MdDeleteForever className='iconSize' />
                                                            </button>

                                                        </>
                                                        : cell.render("Cell")
                                                }
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
