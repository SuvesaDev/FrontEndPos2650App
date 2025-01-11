import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from "react-table";
import { SetCabysDetalleActualBudgets, SetCantidadDetalleActualBudgets, SetCleanDetalleActualBudgets, SetCodArticuloDetalleActualBudgets, SetCodigoMonedaVentaDetalleActualBudgets, SetCodigoPDetalleActualBudgets, SetCostoDetalleActualBudgets, SetDescripcionDetalleActualBudgets, SetDescuentoDetalleActualBudgets, SetDescuentoGeneralBudgets, SetDetalleFacturaBudgets, SetImpuestoDetalleActualBudgets, SetImpuestoVentaGeneralBudgets, SetIsEditArticleBudgets, SetIsNewArticleBudgets, SetMaxDescuentoDetalleActualBudgets, SetMontoDescuentoDetalleActualBudgets, SetMontoImpuestoDetalleActualBudgets, SetPrecioADetalleActualBudgets, SetPrecioOtrosDetalleActualBudgets, SetSubFamiliaDetalleActualBudgets, SetSubTotalDetalleActualBudgets, SetSubTotalExcentoDetalleActualBudgets, SetSubTotalExentoGeneralBudgets, SetSubTotalGeneralBudgets, SetSubTotalGravadoGeneralBudgets, SetSubtotalGravadoDetalleActualBudgets, SetTotalDetalleActualBudgets, SetTotalGeneralBudgets, startGetQuantityArticleBudgetByCodArticulo } from '../../actions/budgetsAction';
import Swal from 'sweetalert2';

export const ProformaTableArticules = ({ columns, data }) => {
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
    const { detalleFactura } = useSelector(state => state.budgets);

    const handleSelectedRow = async (cell) => {
        const {
            Codigo,
            CodArticulo,
            Descripcion,
            Cantidad,
            PrecioCosto,
            PrecioBase,
            PrecioFlete,
            PrecioOtros,
            PrecioUnit,
            Descuento,
            MontoDescuento,
            Impuesto,
            MontoImpuesto,
            SubtotalGravado,
            SubTotalExcento,
            SubTotal,
            Total,
            Cabys,
            SubFamilia,
            MaxDescuento,
            TipoCambioValorCompra,
            CodMonedaVenta,
            Existencias
        } = cell;
 
        console.log(cell)
        dispatch(SetCleanDetalleActualBudgets())
        dispatch(SetIsNewArticleBudgets(false))
        dispatch(SetIsEditArticleBudgets(true))

        dispatch(SetCodigoPDetalleActualBudgets(Codigo))
        dispatch(SetCodArticuloDetalleActualBudgets(CodArticulo));
        dispatch(SetDescripcionDetalleActualBudgets(Descripcion));
        dispatch(SetCostoDetalleActualBudgets(PrecioCosto));
        dispatch(SetPrecioADetalleActualBudgets(PrecioUnit));
        dispatch(SetCabysDetalleActualBudgets(Cabys));
        dispatch(SetMaxDescuentoDetalleActualBudgets(MaxDescuento))
        dispatch(SetSubFamiliaDetalleActualBudgets(SubFamilia))
        dispatch(SetPrecioOtrosDetalleActualBudgets(PrecioOtros))
        dispatch(SetCodigoMonedaVentaDetalleActualBudgets(CodMonedaVenta))

        //Datos Generales de Calculos
        dispatch(SetCantidadDetalleActualBudgets(Cantidad));
        dispatch(SetMontoDescuentoDetalleActualBudgets(MontoDescuento))
        dispatch(SetDescuentoDetalleActualBudgets(Descuento))
        dispatch(SetSubTotalDetalleActualBudgets(SubTotal))
        dispatch(SetSubTotalExcentoDetalleActualBudgets(SubTotalExcento))
        dispatch(SetSubtotalGravadoDetalleActualBudgets(SubtotalGravado))
        dispatch(SetTotalDetalleActualBudgets(Total))
        dispatch(SetImpuestoDetalleActualBudgets(Impuesto));
        dispatch(SetMontoImpuestoDetalleActualBudgets(MontoImpuesto))
        //No se usa solo se muestra
        dispatch(startGetQuantityArticleBudgetByCodArticulo(CodArticulo))
    }



    const handleDeleteRow = (cell) => {
        Swal.fire({
            title: `¿Está seguro(a) de eliminar este producto?`,
            icon: 'question',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Mantener',
            denyButtonText: `Eliminar`,
        }).then(async (result) => {
            if (result.isDenied) {
                const nuevoDetalleFactura = detalleFactura.filter(detalle => detalle.CodArticulo !== cell.CodArticulo);
                dispatch(SetDetalleFacturaBudgets(nuevoDetalleFactura));
            }
        });
    }

    return (
        <>
            <div class="table-responsive-md tablaP">
                <table
                    {...getTableProps()}
                    className="table table-bordered table-hover text-lg-center"
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
                                                    onClick: (cell.column.id === 'deleteRow')
                                                        ? () => handleDeleteRow(cell.row.original)
                                                        : () => handleSelectedRow(cell.row.original),
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
