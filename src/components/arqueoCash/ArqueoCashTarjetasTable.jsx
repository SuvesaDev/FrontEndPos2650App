import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { usePagination, useTable } from 'react-table';

import {
    SetTotalTarjetaArqueoCash,
    startEditArqueoCash
} from '../../actions/arqueocashAction';
import { GoNumber } from 'react-icons/go';
import { FaColonSign } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa';

export const ArqueoCashTarjetasTable = ({ columns, data }) => {

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

    const handleChangeMontoDetalleTarjeta = async ({ target }, cell) => {

        if (cell.column.id !== 'Monto') return;

        const index = parseInt(cell.row.id);

        if (index !== undefined) {
            dispatch(SetTotalTarjetaArqueoCash({
                index,
                Monto: target.value
            }));
        }
    }

    // const handleEnter = (e, cell) => {

    //     if (e.key !== 'Enter') return;

    //     if( cell.column.id !== 'Monto' ) return;

    //     const { 
    //         Id,
    //         IdArqueo,
    //         IdTarjeta,
    //         Monto
    //     } = cell.row.original;

    //     if( Id !== undefined ) {

    //         if( isEditArqueoCash ) {

    //             const newTarjeta = {
    //                 id: Id,
    //                 idArqueo: IdArqueo,
    //                 idTarjeta: IdTarjeta,
    //                 monto: Monto
    //             }
    //             // Type = 2 Edit tarjeta
    //             dispatch( startEditArqueoCash( newTarjeta, 2 ) );
    //         } 
    //     }
    // }

    // const handleLostFocus = (e, cell) => {

    //     if( cell.column.id !== 'Monto' ) return;

    //     const { 
    //         Id,
    //         IdArqueo,
    //         IdTarjeta,
    //         Monto
    //     } = cell.row.original;

    //     if( Id !== undefined ) {

    //         if( isEditArqueoCash ) {

    //             const newTarjeta = {
    //                 id: Id,
    //                 idArqueo: IdArqueo,
    //                 idTarjeta: IdTarjeta,
    //                 monto: Monto
    //             }
    //             // Type = 2 Edit tarjeta
    //             dispatch( startEditArqueoCash( newTarjeta, 2 ) );

    //         } 
    //     }
    // }

    return (

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
                    {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {

                                    return (
                                        <td {...cell.getCellProps()} {...cell.getCellProps({})}>
                                            {(cell.column.id === 'Monto') ? (
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <GoNumber className="iconSize" />
                                                    </span>
                                                    {(cell.row.values.Moneda === 'Colones' || cell.row.values.Moneda === 'COLON' ) ? (
                                                        <>
                                                            <input
                                                                type='number'
                                                                className="form-control"
                                                                disabled={Anulado}
                                                                value={cell.value}
                                                                onChange={(e) => handleChangeMontoDetalleTarjeta(e, cell)}
                                                            />
                                                            <span className="input-group-text">
                                                                <FaColonSign className="iconSize" />
                                                            </span>
                                                            <input
                                                                type='text'
                                                                className="form-control"
                                                                disabled
                                                                value={
                                                                    new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(cell.value)
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <input
                                                                type='number'
                                                                className="form-control"
                                                                disabled={Anulado}
                                                                value={cell.value}
                                                                onChange={(e) => handleChangeMontoDetalleTarjeta(e, cell)}
                                                            />
                                                            <span className="input-group-text">
                                                                <FaDollarSign className="iconSize" />
                                                            </span>
                                                            <input
                                                                type='text'
                                                                className="form-control"
                                                                disabled
                                                                value={
                                                                    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cell.value)
                                                                }
                                                            />

                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                cell.render("Cell")
                                            )}
                                        </td>
                                    );

                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
    )
}
