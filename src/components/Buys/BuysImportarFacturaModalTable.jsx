import React from 'react';
import Swal from 'sweetalert2';
import { useTable } from "react-table";
import { useDispatch } from 'react-redux';

import { PiLinkSimpleFill } from 'react-icons/pi';
import { FaSearch, FaCommentDollar, FaGift, FaSortNumericDownAlt } from 'react-icons/fa';

import {
    SetAllPrecioPreciosImportarFacturaCompras,
    SetCantidadInternoDetalleCompras,
    SetCodigoInternoDetalleCompras,
    SetCodigoInventarioSeleccionadoCompras,
    SetCodigoProSeletedPreciosImportarFacturaCompras,
    SetDescripcionInternoDetalleCompras,
    SetImpuestoNetoPreciosImportarFacturaCompras,
    SetIsOpenModalPrecioImportarFacturaCompras,
    SetIsOpenModalSearchInventarioModalCompras,
    SetNuevoCostoInternoDetalleCompras,
    SetNuevoCostoPreciosImportarFacturaCompras,
    SetRegaliaInternoDetalleCompras,
    startUnirInventariosXMLCompras
} from '../../actions/ComprasAction';
import { FaHashtag } from 'react-icons/fa6';

export const BuysImportarFacturaModalTable = ({ columns, data }) => {

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

        const { codigoPro, precioUnitario } = cell.row.original;

        let newCantidad = parseInt(target.value);
        let precioXML = parseFloat(precioUnitario);

        if (codigoPro !== undefined) {

            dispatch(SetCantidadInternoDetalleCompras({
                codigoPro,
                cantidad: target.value
            }));

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

                                                                            <button className={(cell.value) ? 'btn btn-dark disabled' : 'btn btn-dark'}
                                                                                title='Unir'
                                                                                onClick={e => handleUnirProducto(e, cell)}>
                                                                                <FaGift
                                                                                    className='iconSize'
                                                                                />
                                                                            </button>
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
                                                                                title='Unir'
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
