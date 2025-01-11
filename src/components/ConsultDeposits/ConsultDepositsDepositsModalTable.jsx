import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';

export const ConsultDepositsDepositsModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();
    const { deposito } = useSelector( state => state.generateDeposits );

    const { montoDeposito } = deposito;

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

    const handleCheckRowSeleccionar = (e, cell) => {

        // const { 
        //     id,
        //     fecha,
        //     cajero,
        //     cedula,
        //     depositante,
        //     monto,
        //     seleccionar
        // } = cell.row.original;
        
        // if( !seleccionar ) {

        //     const newFecha = fecha.split(' ');
        //     //Add
        //     dispatch( SetAddPreDepositoGenerateDeposits( {
        //         preDeposito: {
        //             id,
        //             fecha: newFecha[0] + 'T' + newFecha[1],
        //             cajero,
        //             cedula,
        //             depositante,
        //             monto
        //         }
        //     }));

        //     const newMonto = montoDeposito + monto;

        //     dispatch( SetMontoDepositoGenerateDeposits( newMonto ) );
        // } else {
        //     //Remove
        //     dispatch( SetRemovePreDepositoGenerateDeposits( id ));

        //     const newMonto = montoDeposito - monto;

        //     dispatch( SetMontoDepositoGenerateDeposits( newMonto ) );
        // }
        

    }

    return (
        
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

                <tbody
                    className="table-secondary"
                    {...getTableBodyProps()}
                >
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} 
                            >
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            // className={
                                            //     (cell.column.id === 'seleccionar')
                                            //         ? 'modal_Deposits-table-table-cell-checkbox'
                                            //         : 'modal_Deposits-table-table-cell'
                                            // }
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
