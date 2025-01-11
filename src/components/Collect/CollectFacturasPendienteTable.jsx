import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from "react-table";

import { 
    CleanStateSearchCustomerModalCollect,
    SetCedulaCustomerAbonoCollect, 
    SetDisableBtnAddCollect, 
    SetFacturasPendientesCollect, 
    SetIdentificacionCustomerAbonoCollect, 
    SetIsOpenModalSearchCustomerCollect, 
    SetNombreCustomerAbonoCollect, 
    startGetOneDetalleFacturaCollect
} from '../../actions/CollectAction';

export const CollectFacturasPendienteTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    // const { customersAllFacturas } = useSelector(state => state.collect);

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

    const handleSelectedRow = async (cell) => {
        
        const { idFactura } = cell.row.original;

        if( idFactura !== undefined ){

            dispatch( startGetOneDetalleFacturaCollect( idFactura ) );

            dispatch( SetDisableBtnAddCollect( false ) );
            
        }
        
    }

    return (
        <>
            <div className="table-responsive-md tablaP">

                <table
                    {...getTableProps()}
                    className="table table-bordered table-hover text-md-center"
                >
                    <thead className="table-dark">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        // className={ 
                                        //     (column.render("Header") === "Número Factura") 
                                        //     ? 'collect_body-table-header-numeroFactura'
                                        //     : 'collect_body-table-header-fecha'
                                        // }
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
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    onClick: () => handleSelectedRow(cell)
                                                })}
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
        </>
    )
}
