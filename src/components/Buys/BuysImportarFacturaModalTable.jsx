import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useTable } from "react-table";
import { useDispatch, useSelector } from 'react-redux';

import { PiLinkSimpleFill } from 'react-icons/pi';
import { FaSearch, FaCommentDollar, FaGift, FaSortNumericDownAlt } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";


import {
    SetAllPrecioPreciosImportarFacturaCompras,
    SetArrayLotesImportarFacturaCompras,
    SetCantidadInternoDetalleCompras,
    SetCantidadLotesImportarFacturaCompras,
    SetCodigoInternoDetalleCompras,
    SetCodigoInventarioSeleccionadoCompras,
    SetCodigoProSeletedPreciosImportarFacturaCompras,
    SetDescripcionInternoDetalleCompras,
    SetImpuestoNetoPreciosImportarFacturaCompras,
    SetIsOpenModalPrecioImportarFacturaCompras,
    SetIsOpenModalSearchInventarioModalCompras,
    SetNuevoCostoInternoDetalleCompras,
    SetNuevoCostoPreciosImportarFacturaCompras,
    SetNumeroLineaLotesImportarFacturaCompras,
    SetRegaliaInternoDetalleCompras,
    startUnirInventariosXMLCompras
} from '../../actions/ComprasAction';
import { FaHashtag } from 'react-icons/fa6';

export const BuysImportarFacturaModalTable = ({ columns, data }) => {
    
    const dispatch = useDispatch();

    const { isCostaPets, billingImportXML } = useSelector(state => state.compras);

    const {
        detalleServicio
    } = billingImportXML;

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

    const handleChangeCodigoInternoBuys = async ({ target }, cell) => {

        if (cell.column.id !== 'codigoInt') return;

        const { codigoPro } = cell.row.original;

        if (codigoPro !== undefined) {

            dispatch(SetCodigoInternoDetalleCompras({
                codigoPro,
                codigoInt: target.value
            }));

        }
    }

    const handleChangeDescripcionInternoBuys = async ({ target }, cell) => {

        if (cell.column.id !== 'descripcionInt') return;

        const { codigoPro } = cell.row.original;

        if (codigoPro !== undefined) {

            dispatch(SetDescripcionInternoDetalleCompras({
                codigoPro,
                descripcionInt: target.value
            }));

        }
    }

    const handleChangeCantidadInternaBuys = async ({ target }, cell) => {

        if (cell.column.id !== 'cantidad') return;

        const { codigoPro, precioUnitario, numeroLinea } = cell.row.original;

        const existLotes = detalleServicio.find( detalle => detalle.codigoComercial.codigo == codigoPro && detalle.numeroLinea == numeroLinea);

        if( existLotes.lotes.length == 0 ) {
        
            Swal.fire({
                icon: "warning",
                title: "Lotes",
                text: "Para modificar la cantidad se debe primero agregar un lote",
            });

            return;

        }

        let newCantidad = parseInt(target.value);
        let precioXML = parseFloat(precioUnitario);

        if (codigoPro !== undefined) {

            dispatch(SetCantidadInternoDetalleCompras({
                codigoPro,
                numeroLinea,
                cantidad: target.value
            }));

            // Se actualiza la cantidad en el lote
            dispatch( SetCantidadLotesImportarFacturaCompras({
                codigoPro,
                numeroLinea,
                cantidad: target.value,
                lote: existLotes.lotes[0].lote
            }) );

            let nuevoCo = precioXML / newCantidad;

            dispatch(SetNuevoCostoInternoDetalleCompras({
                codigoPro,
                nuevoCosto: nuevoCo
            }));

        }
    }

    const handleChangeRegaliaBuys = async ({ target }, cell) => {

        if (cell.column.id !== 'regalia') return;

        const { codigoPro } = cell.row.original;

        if (codigoPro !== undefined) {

            dispatch(SetRegaliaInternoDetalleCompras({
                codigoPro,
                regalia: target.value
            }));

        }
    }

    const handleSearchInventario = (cell) => {

        // Se obtiene el codigo seleccionado
        const { codigoPro } = cell.row.original;

        dispatch(SetCodigoInventarioSeleccionadoCompras(codigoPro));

        const iconSearchInventario = document.getElementById("iconSearchImportarFacturaModalBuys");
        iconSearchInventario.setAttribute("data-bs-toggle", "modal");
        iconSearchInventario.setAttribute("data-bs-target", "#modalImportarSearchInventario");
        iconSearchInventario.click();
        iconSearchInventario.removeAttribute("data-bs-toggle", "modal");
        iconSearchInventario.removeAttribute("data-bs-target", "#modalImportarSearchInventario");

        // dispatch(SetIsOpenModalSearchInventarioModalCompras(true));
    }

    const handleUnirProducto = (e, cell) => {

        e.preventDefault();

        const { codigoInt, codigoPro, descripcionPro } = cell.row.original;

        if (codigoInt === "") {
            // Se muestra mensaje
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Seleccione un inventario para unir.'
            });
            return;
        }
        const unionProduct = {
            codigoProveedor: codigoPro,
            descripcionProveedor: descripcionPro,
            codigoInterno: codigoInt
        }

        dispatch(startUnirInventariosXMLCompras(unionProduct));
    }

    const handlePrecioProducto = (e, cell) => {

        e.preventDefault();

        const { nuevoCosto, impuestoNeto, codigoPro, costos } = cell.row.original;

        if (nuevoCosto !== 0) {

            dispatch(SetNuevoCostoPreciosImportarFacturaCompras(nuevoCosto));
            dispatch(SetImpuestoNetoPreciosImportarFacturaCompras(impuestoNeto));
            dispatch(SetCodigoProSeletedPreciosImportarFacturaCompras(codigoPro));

            dispatch(SetAllPrecioPreciosImportarFacturaCompras(costos));

            const iconPrecio = document.getElementById("iconPrecio");
            iconPrecio.setAttribute("data-bs-toggle", "modal");
            iconPrecio.setAttribute("data-bs-target", "#modalImportarPrecioFactura");
            iconPrecio.click();
            iconPrecio.removeAttribute("data-bs-toggle", "modal");
            iconPrecio.removeAttribute("data-bs-target", "#modalImportarPrecioFactura");

            // dispatch(SetIsOpenModalPrecioImportarFacturaCompras(true));

        } else {
            // Se muestra mensaje
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Indique la cantidad para el calculo del nuevo costo.'
            });
        }

    }

    const handleOpenModalLotes = (e, cell) => {
        
        // Se obtiene el codigo seleccionado
        const { codigoPro, codigoInt, numeroLinea } = cell.row.original;

        if( codigoInt == null || codigoInt == undefined || codigoInt == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'No se puede agregar un lote porque no se realizado la union de un producto interno.'
            });
            return;
        }

        dispatch(SetCodigoProSeletedPreciosImportarFacturaCompras(codigoPro));

        dispatch( SetNumeroLineaLotesImportarFacturaCompras(numeroLinea) );

        const detalle = detalleServicio.find( detalle => detalle.codigoComercial.codigo == codigoPro && detalle.numeroLinea == numeroLinea );
        const { lotes } = detalle;
        dispatch( SetArrayLotesImportarFacturaCompras(lotes) );

        // const iconLotesModal = document.getElementById("iconLotesModalBuys");
        // iconLotesModal.setAttribute("data-bs-toggle", "modal");
        // iconLotesModal.setAttribute("data-bs-target", "#modalLotesBuys");
        // iconLotesModal.click();
        // iconLotesModal.removeAttribute("data-bs-toggle", "modal");
        // iconLotesModal.removeAttribute("data-bs-target", "#modalLotesBuys");
        

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
                                <tr {...row.getRowProps()} >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                            >
                                                {
                                                    (cell.column.id === 'codigoInt')
                                                        ? <>
                                                            <div className="input-group">
                                                                <span className="input-group-text">
                                                                    <FaHashtag className="iconSize" />
                                                                </span>
                                                                <input
                                                                    className='form-control'
                                                                    type='number'
                                                                    min="0"
                                                                    value={cell.value}
                                                                    disabled={(cell.value !== "") ? true : false}
                                                                    onChange={(e) => handleChangeCodigoInternoBuys(e, cell)}
                                                                />
                                                            </div>
                                                            {
                                                                (cell.value === "")
                                                                    ? <button
                                                                        id='iconSearchImportarFacturaModalBuys'
                                                                    >
                                                                        <FaSearch
                                                                            onClick={e => handleSearchInventario(cell)}
                                                                        />
                                                                    </button>
                                                                    : null
                                                            }
                                                        </>
                                                        : (cell.column.id === 'descripcionInt')
                                                            ? <textarea
                                                                className='form-control text-center'
                                                                value={cell.value}
                                                                disabled={(cell.value !== "") ? true : false}
                                                                onChange={(e) => handleChangeDescripcionInternoBuys(e, cell)}
                                                            />
                                                            : (cell.column.id === 'cantidad')
                                                                ?
                                                                <>
                                                                    <div className="input-group">
                                                                        <span className="input-group-text">
                                                                            <FaSortNumericDownAlt className="iconSize" />
                                                                        </span>
                                                                        <input
                                                                            className='form-control'
                                                                            type='number'
                                                                            min={1}
                                                                            value={cell.value}
                                                                            disabled={false}
                                                                            onChange={(e) => handleChangeCantidadInternaBuys(e, cell)}
                                                                        />
                                                                    </div>
                                                                </>
                                                                : (cell.column.id === 'regalia')
                                                                    ?
                                                                    <>
                                                                        <div className="input-group">
                                                                            <span className="input-group-text">
                                                                                <FaGift className="iconSize" />
                                                                            </span>
                                                                            <input
                                                                                className='form-control'
                                                                                type='number'
                                                                                value={cell.value}
                                                                                disabled={false}
                                                                                onChange={(e) => handleChangeRegaliaBuys(e, cell)}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                    : (cell.column.id === 'estado')
                                                                        ? <>
                                                                                {
                                                                                    (isCostaPets)
                                                                                        ?   <button className='btn btn-dark'
                                                                                                title='Lotes'
                                                                                                id="iconLotesModalBuys"
                                                                                                data-bs-toggle="modal"
                                                                                                data-bs-target="#modalLotesBuys"
                                                                                                onClick={(e) => handleOpenModalLotes(e, cell)}
                                                                                            >
                                                                                                <FaCartShopping
                                                                                                    className='iconSize'
                                                                                                />
                                                                                            </button>
                                                                                        :   <button className={(cell.value) ? 'btn btn-dark disabled' : 'btn btn-dark'}
                                                                                                title='Regalia'
                                                                                                onClick={e => handleUnirProducto(e, cell)}>
                                                                                                <FaGift
                                                                                                    className='iconSize'
                                                                                                />
                                                                                            </button>
                                                                                }
                                                                            <hr />

                                                                            <button className={(cell.value) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                                                                                title='Unir'
                                                                                onClick={e => handleUnirProducto(e, cell)}>
                                                                                <PiLinkSimpleFill
                                                                                    className='iconSize'
                                                                                />
                                                                            </button>

                                                                            <hr />
                                                                            <button
                                                                                className={'btn btn-success'}
                                                                                title='Precio'
                                                                                id='iconPrecio'
                                                                                onClick={e => handlePrecioProducto(e, cell)}
                                                                            >
                                                                                <FaCommentDollar className='iconSize' />
                                                                            </button>

                                                                        </>
                                                                        : cell.render("Cell")
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div >
        </>

    )
}
