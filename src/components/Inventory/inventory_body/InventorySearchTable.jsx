import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";

import {
    CleanOptionsSearchModalInventory,
    CleanSearchInventory,
    CloseSearchModalInventory,
    SetCodigoDescargaInventory,
    SetCodigoFormulaArticleInventory,
    SetCodigoRelatedArticleInventory,
    SetDescripcionFormulaArticleInventory,
    SetDescripcionRebajaOtro,
    SetDescripcionRelatedArticleInventory,
    startGetOneInventory
} from '../../../actions/inventory';

import { startGetOneInventoryBilling } from '../../../actions/billing';
import { startGetOneInventoryCompras } from '../../../actions/ComprasAction';
import { startGetOneInventoryInventoryAdjustment } from '../../../actions/InventoryAdjustmentAction';
import { startGetOneInventoryBillingConsultAlbaranes } from '../../../actions/consultAlbaranesAction';
import { startGetOneInventoryBudgets } from '../../../actions/budgetsAction';

export const InventorySearchTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    let isRed = false;
    let isGreen = false;
    let isOrange = false;
    let isOliveDrab = false;
    let isPurple = false;

    const {
        isOpenSearchModalRebaja,
        isOpenSearchModalRelacionados,
        isOpenSearchModalFormula
    } = useSelector(state => state.inventory);

    const { dollar } = useSelector(state => state.sidebar);
    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);
    const { isOpenSearchInventoryAdjustment } = useSelector(state => state.InventoryAdjustment);
    const { isOpenSearchInventoryCompras } = useSelector(state => state.compras);
    const { isOpenSearchInventoryBudgets } = useSelector(state => state.budgets);

    const { isOpenModalSearchInventoryConsultAlbaranes } = useSelector(state => state.consultAlbaranes);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

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

        //Obtener el id de inventario seleccionado
        const { codigo, cod_Articulo, descripcion } = cell.row.original;

        //Buscar el codigoPrincipal del inventario
        const id = data.find(inventory => inventory.cod_Articulo === cod_Articulo).codigo;

        if (isOpenSearchModalRebaja) {

            dispatch(SetCodigoDescargaInventory(cod_Articulo));
            dispatch(SetDescripcionRebajaOtro(descripcion));

        } else if (isOpenSearchModalRelacionados) {

            dispatch(SetCodigoRelatedArticleInventory(cod_Articulo));
            dispatch(SetDescripcionRelatedArticleInventory(descripcion));

        }  else if (isOpenSearchModalFormula) {

            dispatch(SetCodigoFormulaArticleInventory(cod_Articulo));
            dispatch(SetDescripcionFormulaArticleInventory(descripcion));

        } else if (billings[numberScreen] !== undefined) {

            if (billings[numberScreen].isOpenSearchInventoryBilling) {

                // Parametros
                const parametros = {
                    tipoPrecio: billings[numberScreen].clienteFacturacionEdit.tipoPrecio,
                    Cod_Moneda: billings[numberScreen].factura.encabezado.Cod_Moneda,
                    HasCartaExoneracionBilling: billings[numberScreen].HasCartaExoneracionBilling,
                    cartaBilling: billings[numberScreen].cartaBilling,
                    mag: billings[numberScreen].factura.encabezado.mag,
                    dollar
                };

                //Llamar para traer el inventario para facturar
                dispatch(startGetOneInventoryBilling(codigo, parametros, numberScreen));
            }

        } else if (isOpenSearchInventoryAdjustment) {
            //Llamar para traer el inventario desde ajustes de inventario
            dispatch(startGetOneInventoryInventoryAdjustment(id));

        } else if (isOpenSearchInventoryCompras) {
            //Llamar para traer el inventario desde compras
            dispatch(startGetOneInventoryCompras(codigo));
            
        } else if (isOpenSearchInventoryBudgets) {
            //Llamar para traer el inventario desde compras
            dispatch(startGetOneInventoryBudgets(codigo));
        } else if (isOpenModalSearchInventoryConsultAlbaranes) {
            //Llamar para traer el inventario desde consulta de Albaranes
            dispatch(startGetOneInventoryBillingConsultAlbaranes(codigo));

        } else {
            //Llamar para traer el inventario
            await dispatch(startGetOneInventory(codigo));
        }

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

                <tbody className="table-secondary"
                    {...getTableBodyProps()}
                >
                    {rows.map((row, i) => {
                        prepareRow(row);

                        if (row.values.existencia < 0) {
                            isRed = true;
                        }

                        if (row.values.prestamo < 0) {
                            isGreen = true;
                        }

                        if (row.values.prestamo > 0) {
                            isOrange = true;
                        }

                        if (row.values.existencia === 0) {
                            isOliveDrab = true;
                        }

                        if (row.values.consignacion === 'SI') {
                            isPurple = true;
                        }

                        return (
                            <tr {...row.getRowProps()} >
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps({
                                                onClick: () => {
                                                    handleSelectedRow(cell);
                                                    dispatch(CleanSearchInventory());
                                                    dispatch(CleanOptionsSearchModalInventory());
                                                }
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

        </div >
    )
}
