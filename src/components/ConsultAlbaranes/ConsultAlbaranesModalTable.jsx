import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { usePagination, useTable } from 'react-table';

import { startDeleteLineAlbaranConsultAlbaranes } from '../../actions/consultAlbaranesAction';

export const ConsultAlbaranesBodyTable = ({ columns, data }) => {

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

    const dispatch = useDispatch();

    const { albaranActual } = useSelector( state => state.consultAlbaranes );

    const handleDeleteRow = async (cell) => {
        
        if( cell.column.id !== 'icon' ) return;
        
        const { id } = cell.row.original;
        
        if( id !== undefined ) {
            dispatch(startDeleteLineAlbaranConsultAlbaranes( id, albaranActual.id ));
        }
    }

    return (
        <>
            <div className='consultAlbaranes-modal-table-main'>
                <table {...getTableProps()}>
                    
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className='consultAlbaranes-modal-table-header'
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody 
                        className='consultAlbaranes-modal-table-body'
                        {...getTableBodyProps()}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} className='consultAlbaranes-modal-table-body-row'>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}
                                            className={
                                                (cell.column.id === 'descripcion')
                                                ? 'consultAlbaranes-modal-table-body-cell-descripcion'
                                                : (cell.column.id === 'cantidad')
                                                ? 'consultAlbaranes-modal-table-body-cell-cantidad'
                                                : (cell.column.id === 'precioVenta')
                                                ? 'consultAlbaranes-modal-table-body-cell-precioVenta'
                                                : (cell.column.id === 'iva')
                                                ? 'consultAlbaranes-modal-table-body-cell-iva'
                                                : (cell.column.id === 'descuento')
                                                ? 'consultAlbaranes-modal-table-body-cell-descuento'
                                                : (cell.column.id === 'total')
                                                ? 'consultAlbaranes-modal-table-body-cell-total'
                                                : 'consultAlbaranes-modal-table-body-cell-icon'
                                            }
                                            {...cell.getCellProps({
                                                onClick: () => handleDeleteRow(cell)
                                            })}
                                        >
                                            {cell.render("Cell")}
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
