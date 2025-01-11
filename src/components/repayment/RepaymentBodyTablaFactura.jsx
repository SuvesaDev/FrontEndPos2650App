import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import {
    SetCantBodDetalleActualRepayment,
    SetCantVetDetalleActualRepayment,
    SetCodigoDetalleActualRepayment,
    SetDescripcionDetalleActualRepayment,
    SetDescuentoDetalleActualRepayment,
    Setid_articulo_VDetalleActualRepayment,
    SetId_Art_VentaDetalleActualRepayment,
    SetImpuestoDetalleActualRepayment,
    SetPosicionActualRepayment,
    SetPrecio_UnitDetalleActualRepayment,
    SetIdVentaDetalleSelectedRepayment,
    SetCantidadOriginalDetalleActualRepayment
} from '../../actions/repaymentAction';

export const RepaymentBodyTablaFactura = ({ columns, data }) => {
    const dispatch = useDispatch();

    const { factura, idVentaDetalleSelected } = useSelector(state => state.repayment);
    const { detalle } = factura;

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
        const { codArticulo } = cell.row.values;

        if (codArticulo !== null) {

            const detalleActual = detalle[cell.row.id];

            //Agregarlo al detalle Actual
            dispatch(SetPosicionActualRepayment(cell.row.id));
            // dispatch( SetAddDetalleFacturaRepayment( detalleActual ) );

            dispatch(SetDescripcionDetalleActualRepayment(detalleActual.descripcion));
            dispatch(SetCantidadOriginalDetalleActualRepayment(detalleActual.cantidad));
            dispatch(SetCantVetDetalleActualRepayment(detalleActual.cantVen));
            dispatch(SetCantBodDetalleActualRepayment(detalleActual.cantBod));

            dispatch(SetPrecio_UnitDetalleActualRepayment(detalleActual.precioUnit));
            dispatch(SetDescuentoDetalleActualRepayment(detalleActual.descuento));
            dispatch(SetImpuestoDetalleActualRepayment(detalleActual.impuesto));
            dispatch(SetCodigoDetalleActualRepayment(detalleActual.codFxArticulo));
            dispatch(SetId_Art_VentaDetalleActualRepayment(detalleActual.id_factura));
            dispatch(Setid_articulo_VDetalleActualRepayment(detalleActual.id_venta_detalle));

            dispatch(SetIdVentaDetalleSelectedRepayment(detalleActual.id_venta_detalle));

        }

    }

    return (
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
    )
}
