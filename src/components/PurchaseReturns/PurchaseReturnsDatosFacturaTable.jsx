import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";
import { SetAddDetalleActualPurchaseReturns } from '../../actions/purchaseReturnsAction';


export const PurchaseReturnsDatosFacturaTable = ({ columns, data }) => {
    const dispatch = useDispatch();

    const { devolucion } = useSelector(state => state.purchaseReturns);
    const { articulos } = devolucion;

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

        //Obtener el CodArticulo de articulo seleccionado
        const { CodArticulo } = cell.row.values;

        if (CodArticulo !== null) {
            const detalleActual = articulos[cell.row.id];
            //Agregarlo al detalle Actual
            //dispatch( SetPosicionActual( cell.row.id ) );
            dispatch(SetAddDetalleActualPurchaseReturns(detalleActual));
        }

    }

    return (
        <>
            <div className="table-responsive-md tablaP">
                <table
                    {...getTableProps()}
                    className="table table-dark table-hover table-bordered text-md-center" >
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
                                                    onClick: () => handleSelectedRow(cell),
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



