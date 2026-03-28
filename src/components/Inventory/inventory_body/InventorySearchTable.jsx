import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";

import {
    CleanOptionsSearchModalInventory,
    CleanSearchInventory,
    CloseSearchModalInventory,
    IsOpenSearchModalFormulaInventory,
    IsOpenSearchModalRelacionados,
    SetCodigoArtBonificacionArticleInventory,
    SetCodigoArtFormulaArticleInventory,
    SetCodigoArtRelatedArticleInventory,
    SetCodigoBonificacionArticleInventory,
    SetCodigoDescargaInventory,
    SetCodigoFormulaArticleInventory,
    SetCodigoRelatedArticleInventory,
    SetDescripcionArtBonificacionArticleInventory,
    SetDescripcionFormulaArticleInventory,
    SetDescripcionRebajaOtro,
    SetDescripcionRelatedArticleInventory,
    SetIsOpenModalBonificacionInventory,
    startGetOneInventory
} from '../../../actions/inventory';

import { startGetOneInventoryBilling } from '../../../actions/billing';
import { startGetOneInventoryCompras } from '../../../actions/ComprasAction';
import { startGetOneInventoryInventoryAdjustment } from '../../../actions/InventoryAdjustmentAction';
import { startGetOneInventoryBillingConsultAlbaranes } from '../../../actions/consultAlbaranesAction';
import { startGetOneInventoryBudgets } from '../../../actions/budgetsAction';
import { startGetOneInventoryOrdenCompra } from '../../../actions/ordenCompraAction';
import { startGetOneInventoryBonificaciones } from '../../../actions/BonificacionesAction';
import { startGetOneInventoryConsignment } from '../../../actions/ConsignmentAction';

export const InventorySearchTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    let isRed = false;
    let isGreen = false;
    let isOrange = false;
    let isOliveDrab = false;
    let isPurple = false;

    const [numberScreen, setnumberScreen] = useState(null);

    const {
        isOpenSearchModalRebaja,
        isOpenSearchModalRelacionados,
        isOpenSearchModalFormula,
        isOpenModalSearchByBonificacion
    } = useSelector(state => state.inventory);

    const { dollar } = useSelector(state => state.sidebar);
    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);
    const { isOpenSearchInventoryAdjustment } = useSelector(state => state.InventoryAdjustment);
    const { isOpenSearchInventoryCompras } = useSelector(state => state.compras);
    const { isOpenSearchInventoryBudgets } = useSelector(state => state.budgets);
    const { isOpenModalSearchArticuloConsignment, factura } = useSelector(state => state.consignment);

    const { isOpenModalSearchInventoryConsultAlbaranes } = useSelector(state => state.consultAlbaranes);
    const { isOpenModalSearchInventoryOrdenCompra } = useSelector((state) => state.ordenCompra);
    const { isOpenModalSearchArticuloBonificaciones } = useSelector((state) => state.bonificaciones);

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

            dispatch( SetCodigoRelatedArticleInventory(codigo));
            dispatch( SetCodigoArtRelatedArticleInventory( cod_Articulo ) )
            dispatch( SetDescripcionRelatedArticleInventory(descripcion));
            dispatch(IsOpenSearchModalRelacionados(false));

        }  else if (isOpenSearchModalFormula) {

            dispatch( SetCodigoFormulaArticleInventory(codigo));
            dispatch( SetDescripcionFormulaArticleInventory(descripcion));
            dispatch( SetCodigoArtFormulaArticleInventory( cod_Articulo ) );
            dispatch(IsOpenSearchModalFormulaInventory(false));

        } else if (isOpenModalSearchByBonificacion) {

            dispatch( SetCodigoBonificacionArticleInventory(codigo));
            dispatch( SetDescripcionArtBonificacionArticleInventory(descripcion));
            dispatch( SetCodigoArtBonificacionArticleInventory( cod_Articulo ) );
            dispatch( SetIsOpenModalBonificacionInventory(false));

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

        } else if (isOpenModalSearchInventoryOrdenCompra) {
            //Llamar para traer el inventario desde Orden de compra
            dispatch(startGetOneInventoryOrdenCompra(codigo));
            
        } else if (isOpenModalSearchArticuloBonificaciones) {
            //Llamar para traer el inventario desde Bonificaciones
            dispatch(startGetOneInventoryBonificaciones(codigo));
            
        } else if (isOpenModalSearchArticuloConsignment) {

            // Parametros
            const parametros = {
                Cod_Moneda: factura.encabezado.Cod_Moneda,
                dollar
            };

            //Llamar para traer el inventario desde Registro de Consignacion
            dispatch( startGetOneInventoryConsignment(codigo, parametros) );
            
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
