import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from 'react-table';

import { 
    SetIsEditPriceSellPreciosImportarFacturaCompras,
    SetSelectedPricesPreciosImportarFacturaCompras 
} from '../../actions/ComprasAction';

export const BuysPrecioImportarFacturaModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();

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

        //Obtiene el price seleccionado
        const price = cell.row.values;

        //Se establece en el estado y cambia al modo editar
        if(price != undefined) {
            dispatch( SetSelectedPricesPreciosImportarFacturaCompras( price ) );
            dispatch( SetIsEditPriceSellPreciosImportarFacturaCompras( true ) );
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
                                        // className= 'modal_precioImportarFactura-body-table-header'
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody
                        // className='modal_precioImportarFactura-body-table-body'
                        className="table-secondary"
                        {...getTableBodyProps()}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} 
                                    // className={ (!isInventoryDisable) ? 'modal_precioImportarFactura-body-table-body-row' : 'modal_precioImportarFactura-body-table-body-row-disable'}>
                                    // className='modal_precioImportarFactura-body-table-body-row'
                                >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                // className='modal_precioImportarFactura-body-table-body-cell'
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
