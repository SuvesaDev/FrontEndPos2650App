import React from 'react'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import {
    SetCantidadDenominacionArqueoCash,
    startEditArqueoCash
} from '../../actions/arqueocashAction';
import { ImSortNumbericDesc } from 'react-icons/im';


export const ArqueoCashDesgloceTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const { arqueo, isEditArqueoCash } = useSelector(state => state.ArqueCash);
    const { Anulado } = arqueo.encabezado;

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
    },
        usePagination
    );

    const handleChangeCantidadDetalleDenominacion = async ({ target }, cell) => {

        if (cell.column.id !== 'Cantidad') return;

        const { Id_Denominacion } = cell.row.original;

        if (Id_Denominacion !== undefined) {
            dispatch(SetCantidadDenominacionArqueoCash({
                Id_Denominacion,
                cantidad: target.value
            }));
        }
    }

    // const handleEnter = (e, cell) => {

    //     if (e.key !== 'Enter') return;

    //     if( cell.column.id !== 'Cantidad' ) return;

    //     const { 
    //         Id,
    //         Id_Arqueo,
    //         Id_Denominacion,
    //         Monto,
    //         Cantidad
    //     } = cell.row.original;

    //     if( Id !== undefined ) {

    //         if( isEditArqueoCash ) {

    //             const newEfectivo = {
    //                 id: Id,
    //                 idArqueo: Id_Arqueo,
    //                 idDenominacion: Id_Denominacion,
    //                 monto: Monto,
    //                 cantidad: Cantidad
    //             }
    //             // Type 1: Cheques y despositos edit
    //             dispatch( startEditArqueoCash( newEfectivo, 1 ) );

    //         } 
    //     }
    // }

    // const handleLostFocus = (e, cell) => {

    //     if( cell.column.id !== 'Cantidad' ) return;

    //     const { 
    //         Id,
    //         Id_Arqueo,
    //         Id_Denominacion,
    //         Monto,
    //         Cantidad
    //     } = cell.row.original;

    //     if( Id !== undefined ) {

    //         if( isEditArqueoCash ) {

    //             const newEfectivo = {
    //                 id: Id,
    //                 idArqueo: Id_Arqueo,
    //                 idDenominacion: Id_Denominacion,
    //                 monto: Monto,
    //                 cantidad: Cantidad
    //             }

    //             dispatch( startEditArqueoCash( newEfectivo, 1 ) );

    //         } 
    //     }
    // }

    return (
        <>
            <div className="table-responsive-lg tablaP">
                <table {...getTableProps()} className="table table-hover text-lg-center">

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
                                        return <td {...cell.getCellProps()}
                                            {...cell.getCellProps({})}
                                        >
                                            {
                                                (cell.column.id === 'Cantidad')
                                                    ?
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <ImSortNumbericDesc className="iconSize" />
                                                        </span>
                                                        <input
                                                            type='number'
                                                            min="0"
                                                            className="form-control"
                                                            disabled={Anulado}
                                                            // onKeyDown={ (e) => handleEnter(e, cell) }
                                                            // onBlur={ (e) => handleLostFocus(e, cell) }
                                                            value={cell.value}
                                                            onChange={(e) => handleChangeCantidadDetalleDenominacion(e, cell)}
                                                        />
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
