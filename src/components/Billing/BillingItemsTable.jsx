import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";

import {
    SetAddDetalleActualBilling,
    SetautoFocusCantidadBilling,
    SetautoFocusDescBilling,
    SetautoFocusPrecioUnitBilling,
    SetIsEditDetalleActualBilling,
    startDeleteDetalleActualBilling,
    SetPosicionActual,
    startDeleteLineDetalleBilling,
    SetSubTotalBilling,
    SetSubTotalGravadaBilling,
    SetSubTotalExentoBilling,
    SetDescuentoBilling,
    SetImp_VentaBilling,
    SetTotalBilling,
    SetAplicaDescuento
} from '../../actions/billing';


export const BillingItemsTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);

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

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    // Cuando cambia la data de ingreso se calculan los totales
    useEffect(() => {

        calculateTotalsGeneral();

    }, [data]);

    const calculateTotalsGeneral = () => {

        if (billings[numberScreen] === undefined) return;

        let SubTotalGeneral = 0;
        let SubTotalExcentoGeneral = 0;
        let SubTotalGravadoGeneral = 0;
        let MontoDescuentoGeneral = 0;
        let MontoImpuestoGeneral = 0;

        let index = 0;

        data.forEach(linea => {
            SubTotalGeneral = SubTotalGeneral + linea.SubTotal;
            SubTotalExcentoGeneral = SubTotalExcentoGeneral + linea.SubTotalExcento;
            SubTotalGravadoGeneral = SubTotalGravadoGeneral + linea.SubtotalGravado;
            MontoDescuentoGeneral = MontoDescuentoGeneral + linea.Monto_Descuento;
            MontoImpuestoGeneral = MontoImpuestoGeneral + linea.Monto_Impuesto;
            index = index + 1;
        });

        dispatch(SetSubTotalBilling({ value: SubTotalGeneral, number: numberScreen }));
        dispatch(SetSubTotalGravadaBilling({ value: SubTotalGravadoGeneral, number: numberScreen }));
        dispatch(SetSubTotalExentoBilling({ value: SubTotalExcentoGeneral, number: numberScreen }));
        dispatch(SetDescuentoBilling({ value: MontoDescuentoGeneral, number: numberScreen }));
        dispatch(SetImp_VentaBilling({ value: MontoImpuestoGeneral, number: numberScreen }));
        dispatch(SetTotalBilling({ value: SubTotalGeneral - MontoDescuentoGeneral + MontoImpuestoGeneral, number: numberScreen }));
        dispatch(SetAplicaDescuento({ value: false, number: numberScreen }));

    }

    const handleSelectedRow = async (cell) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        //Obtener el CodArticulo de articulo seleccionado
        const { CodArticulo } = cell.row.values;

        if (CodArticulo !== null) {

            const detalleActual = billings[numberScreen].factura.detalle[cell.row.id];

            dispatch(SetautoFocusPrecioUnitBilling({ value: true, number: numberScreen }));
            dispatch(SetautoFocusDescBilling({ value: false, number: numberScreen }));
            dispatch(SetautoFocusCantidadBilling({ value: false, number: numberScreen }));

            //Agregarlo al detalle Actual
            dispatch(SetPosicionActual({ value: cell.row.id, number: numberScreen }));
            dispatch(SetAddDetalleActualBilling({ value: detalleActual, number: numberScreen }));

            dispatch(SetIsEditDetalleActualBilling({ value: true, number: numberScreen }));

        }

    }

    const handleDeleteRow = (cell) => {

        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;

        //Obtener el CodArticulo de articulo seleccionado
        const { CodArticulo } = cell.row.values;

        const deleteLine = billings[numberScreen].factura.detalle[cell.row.id];

        if (CodArticulo !== null) {

            if (deleteLine.idVentaDetalle !== undefined) {

                // Se elimina la linea junto API
                dispatch(startDeleteLineDetalleBilling(
                    deleteLine,
                    numberScreen
                ));

            } else {

                // Se elimina la linea solo el estado
                dispatch(startDeleteDetalleActualBilling(
                    deleteLine,
                    numberScreen
                ));
            }
        }
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
                                                    onClick: (cell.column.id === 'icon')
                                                        ? () => handleDeleteRow(cell)
                                                        : () => handleSelectedRow(cell),
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
