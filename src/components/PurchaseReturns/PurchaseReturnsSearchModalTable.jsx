import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";


import { SetopenSearchModalPurchaseReturns, SetValorFiltroSearchModalPurchaseReturns, startSearchOneCompraPurchaseReturns, startSearchOnePurchaseReturns } from '../../actions/purchaseReturnsAction';
import { SetDefaultProveedorFilterCompras } from '../../actions/ComprasAction';


export const PurchaseReturnsSearchModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const {optionsSearchCompras } = useSelector(state => state.compras)

    const {proveedoresInventory } = useSelector(state => state.proveedores)
    


    const {
        valorfiltro,
    } = optionsSearchCompras;

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

        // //Obtener el id de presentacion seleccionado
        const { IdCompra } = cell.row.values;

        if (IdCompra !== null) {

            dispatch(startSearchOnePurchaseReturns(IdCompra));

            //Clean el state de busqueda de ubicaciones
            dispatch(SetValorFiltroSearchModalPurchaseReturns(''));

            //Set default filter
            dispatch( SetDefaultProveedorFilterCompras( proveedoresInventory ) )

            //Cerrar el modal
            dispatch(SetopenSearchModalPurchaseReturns(false));
        }

    }

    return (
        <>
            <div className="table-responsive-md tablaP">
                <table
                    {...getTableProps()}
                    className="table table-dark table-hover table-bordered text-md-center">
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
                                <tr {...row.getRowProps()} >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    onClick: () => handleSelectedRow(cell)
                                                })}
                                                data-bs-dismiss="modal"
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
