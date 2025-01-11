import React from 'react';
import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';

import { FaCalendar, FaCashRegister, FaCoins, FaDollarSign, FaExchangeAlt, FaHashtag, FaPercentage, FaSearch, FaUser } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { IoPricetagsSharp } from "react-icons/io5";

import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { RepaymentBodyTablaFactura } from './RepaymentBodyTablaFactura';

import {
    SetCantidadDetalleActualRepayment,
    SetDescuentoRepayment,
    SetImpuestoRepayment,
    SetMontoRepayment,
    SetMonto_ImpuestoDetalleActualRepayment,
    SetNumeroCajaRepayment,
    SetNumeroFacturaRepayment,
    SetSubTotalExcentoDetalleActualRepayment,
    SetSubTotalExcentoRepayment,
    SetSubtotalGravadoDetalleActualRepayment,
    SetSubTotalGravadoRepayment,
    SetTipoFacturaRepayment,
    startAddDetalleActualRepayment,
    startSearchOneBilling,
    SetIsOpenSearchBillingModalRepayment,
    SetTipoBilling,
    SetNumeroCajaBilling,
    SetNum_FacturaBilling,
    SetShowMessageInfoRepayment,
    SetDeleteLineaArticuloRepayment,
    SetAddDetalleRepayment,
    SetIsReturnAllArticulosRepayment,
    SetIsShowSecondTabRepayment
} from '../../actions/repaymentAction';
import { MdPriceChange } from 'react-icons/md';
import { TbAdjustmentsDollar, TbNumber } from 'react-icons/tb';
import { FaBoxesStacked, FaCirclePlus } from 'react-icons/fa6';

export const RepaymentBody = () => {

    const dispatch = useDispatch();

    const {
        factura,
        devolucion,
        detalleArticuloActual,
        disableInputs,
        disableInputsBody,
        showMessageHelp,
        isReturnAllArticulos
    } = useSelector(state => state.repayment);

    const { allTiposFacturas } = useSelector(state => state.tiposFacturas);
    const { monedasInventory } = useSelector(state => state.monedas);

    const {
        fecha,
        nombre_Cliente,
        Total,
        Cod_Moneda,
        tipo,
        NumeroCaja,
        num_Factura
    } = factura.encabezado;

    const { detalle } = devolucion

    const {
        codFxArticulo,
        Cantidad,
        CantidadOriginal,
        CantVet,
        CantBod,
        Precio_Unit,
        Descuento,
        Impuesto
    } = detalleArticuloActual

    const columns = [
        {
            Header: "Id Venta",
            accessor: "id_venta_detalle",
        },
        {
            Header: "Codigo Articulo",
            accessor: "codArticulo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        }
    ];

    //calculos de totales generales
    useEffect(() => {

        let subTotal = parseFloat(Precio_Unit * Cantidad);
        let montoDesccuento = parseFloat(subTotal * (Descuento / 100));
        let montoImpuesto = parseFloat((subTotal - montoDesccuento) * (Impuesto / 100));
        //dispatch()

        if (Impuesto > 0) {
            dispatch(SetMonto_ImpuestoDetalleActualRepayment(montoImpuesto))
            dispatch(SetSubTotalExcentoDetalleActualRepayment(0));
            dispatch(SetSubtotalGravadoDetalleActualRepayment(subTotal));
        } else {
            dispatch(SetMonto_ImpuestoDetalleActualRepayment(0))
            dispatch(SetSubTotalExcentoDetalleActualRepayment(subTotal));
            dispatch(SetSubtotalGravadoDetalleActualRepayment(0));
        }


    }, [Cantidad]);

    //calculos de totales generales
    useEffect(() => {
        let SubTotalGeneral = 0;
        let SubTotalExcentoGeneral = 0;
        let SubTotalGravadoGeneral = 0;
        let MontoDescuentoGeneral = 0;
        let MontoImpuestoGeneral = 0;
        if (detalle.length !== 0) {
            detalle.forEach(linea => {
                SubTotalExcentoGeneral = SubTotalExcentoGeneral + linea.SubTotalExcento;
                SubTotalGravadoGeneral = SubTotalGravadoGeneral + linea.SubtotalGravado;
                SubTotalGeneral = (SubTotalExcentoGeneral + SubTotalGravadoGeneral);
                MontoDescuentoGeneral = MontoDescuentoGeneral + linea.Monto_Descuento;
                MontoImpuestoGeneral = MontoImpuestoGeneral + linea.Monto_Impuesto;
            });
        }

        dispatch(SetSubTotalGravadoRepayment(SubTotalGravadoGeneral));
        dispatch(SetSubTotalExcentoRepayment(SubTotalExcentoGeneral));
        dispatch(SetDescuentoRepayment(MontoDescuentoGeneral));
        dispatch(SetImpuestoRepayment(MontoImpuestoGeneral));
        dispatch(SetMontoRepayment(SubTotalGeneral - MontoDescuentoGeneral + MontoImpuestoGeneral));
    }, [detalle]);

    const handleKeyDownNumFactura = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (num_Factura !== '') {
                dispatch(startSearchOneBilling(num_Factura, 2));
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba un número de factura para buscar.'
                });
            }
        }
    }

    const handleSearchBillingRepayment = (e) => {
        if (!disableInputs) {
            dispatch(SetIsOpenSearchBillingModalRepayment(true));
        }
    }

    const handleKeyDownCantidadDevoluccion = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (Cantidad === 0 || Cantidad === "0") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'La cantidad a devolver debe ser mayor a cero.'
                });

                return;
            }

            dispatch(startAddDetalleActualRepayment(detalleArticuloActual));
        }
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleMouseEnter = (e) => {
        e.preventDefault();
        dispatch(SetShowMessageInfoRepayment(true));
    }

    const handleMouseLeave = (e) => {
        e.preventDefault();
        dispatch(SetShowMessageInfoRepayment(false));
    }

    const handleAddDevolucion = (e) => {

        if (disableInputsBody || isReturnAllArticulos) {
            return;
        }

        e.preventDefault();

        if (Cantidad === 0 || Cantidad === "0") {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'La cantidad a devolver debe ser mayor a cero.'
            });

            return;
        }

        dispatch(startAddDetalleActualRepayment(detalleArticuloActual));
    }

    const handleAddAllDevolucion = (e) => {

        if (disableInputsBody || isReturnAllArticulos) {
            return;
        }

        e.preventDefault();

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea devolver todos los actículos?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Agregar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {

                factura.detalle.forEach(detalle => {

                    let subTotal = parseFloat(detalle.precioUnit * detalle.cantidad);
                    let montoDescuento = parseFloat(subTotal * (detalle.descuento / 100));
                    let montoImpuesto = parseFloat((subTotal - montoDescuento) * (detalle.impuesto / 100));

                    const newDetalle = {
                        CantBod: detalle.cantBod,
                        CantVet: detalle.cantVen,
                        Cantidad: `${detalle.cantidad}`,
                        CantidadOriginal: detalle.cantidad,
                        Descripcion: detalle.descripcion,
                        Descuento: detalle.descuento,
                        Id_Art_Venta: detalle.id_factura,
                        Impuesto: detalle.impuesto,
                        Monto_Descuento: montoDescuento,
                        Monto_Impuesto: (detalle.impuesto > 0) ? montoImpuesto : 0,
                        Precio_Base: 0,
                        Precio_Costo: 0,
                        Precio_Flete: 0,
                        Precio_Otros: 0,
                        Precio_Unit: detalle.precioUnit,
                        SubTotal: subTotal,
                        SubTotalExcento: (detalle.impuesto > 0) ? 0 : subTotal,
                        SubtotalGravado: (detalle.impuesto > 0) ? subTotal : 0,
                        codFxArticulo: detalle.codFxArticulo,
                        id_articulo_V: detalle.id_venta_detalle,
                    }

                    dispatch(SetAddDetalleRepayment(newDetalle));

                    dispatch(SetDeleteLineaArticuloRepayment(detalle.id_venta_detalle));
                });

                dispatch(SetIsReturnAllArticulosRepayment(true));
                dispatch(SetIsShowSecondTabRepayment(true));
            }

        });

    }

    return (
        <>
            <div className='row mb-2 text-center'>
                <div className='col-md-8 mb-2'>
                    <div className='row'>
                        <div className="col-md-3 mb-3">
                            <h5>Tipo</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <MdPriceChange className="iconSize" />
                                </span>
                                <select
                                    name='tipoFactura'
                                    className='form-select'
                                    disabled={true}
                                    value={tipo}
                                    onChange={e => handleInputChangeWithDispatch(e, SetTipoBilling)}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                    {

                                        (allTiposFacturas != null)
                                            ? (allTiposFacturas.length === 0)
                                                ? <option value=''>No Tipos de Factura</option>
                                                : allTiposFacturas.map(tipoF => {
                                                    return <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                                                })
                                            : <option value=''>No Tipos de Factura</option>

                                    }

                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Caja</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCashRegister className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    name='NumeroCaja'
                                    className='form-control'
                                    placeholder='Número de Caja'
                                    disabled={true}
                                    value={NumeroCaja}
                                    onChange={e => handleInputChangeWithDispatch(e, SetNumeroCajaBilling)}
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Número Factura</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaHashtag className="iconSize" />
                                </span>
                                <input
                                    className='form-control'
                                    type='text'
                                    name='num_Factura'
                                    placeholder='Número de Factura'
                                    disabled={(disableInputs) ? disableInputs : !disableInputsBody}
                                    value={num_Factura}
                                    onChange={e => handleInputChangeWithDispatch(e, SetNum_FacturaBilling)}
                                    onKeyDown={handleKeyDownNumFactura}
                                />
                                <button
                                    className={
                                        (disableInputs)
                                            ? "btn btn-primary disabled"
                                            : "btn btn-primary"
                                    }
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalBuscarFactDevo"
                                    onClick={handleSearchBillingRepayment}
                                >
                                    <FaSearch className="iconSize" />
                                </button>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Fecha</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendar className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    type="date"
                                    name="fechaDevoluciones"
                                    disabled={true}
                                    value={fecha}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12 mb-3">
                            <h5>Nombre del Cliente</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUser className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    placeholder="Nombre del Cliente"
                                    type='text'
                                    name='nombreClienteDevoluciones'
                                    disabled={true}
                                    value={nombre_Cliente}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-4 mb-3">
                            <h5>Moneda</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCoins className="iconSize" />
                                </span>
                                <select
                                    name='monedaDevolucionnes'
                                    className='form-select'
                                    disabled={true}
                                    value={Cod_Moneda}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                    {
                                        (monedasInventory != null)
                                            ? (monedasInventory.length === 0)
                                                ? <option value={0} >No Monedas</option>
                                                : monedasInventory.map(moneda => {
                                                    return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                                                })
                                            : <option value={0} >No Monedas</option>
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5>Monto</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <TbAdjustmentsDollar className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    placeholder="Monto Total"
                                    type='text'
                                    name='montoDevoluciones'
                                    disabled={true}
                                    value={Total}
                                />
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5>Código</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaHashtag className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    placeholder="Código Producto"
                                    type='text'
                                    name='codigoDevoluciones'
                                    disabled={true}
                                    value={codFxArticulo}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-3 mb-3">
                            <h5>Cantidad Original</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <TbNumber className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    name='cantOriginalDevoluciones'
                                    className="form-control"
                                    placeholder="Cantidad Original"
                                    disabled={true}
                                    value={CantidadOriginal}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <h5>Precio Unitario</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <IoPricetagsSharp className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    name='precioUnitarioDevoluciones'
                                    className="form-control"
                                    placeholder="Precio Unitario"
                                    disabled={true}
                                    value={Precio_Unit}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Devolución</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaExchangeAlt className="iconSize" />
                                </span>
                                <input
                                    type='number'
                                    max={CantidadOriginal}
                                    min={0}
                                    name='DevolucionDevoluciones'
                                    className='form-control'
                                    disabled={(disableInputs) ? disableInputs : disableInputsBody}
                                    value={Cantidad}
                                    onChange={e => handleInputChangeWithDispatch(e, SetCantidadDetalleActualRepayment)}
                                    onKeyDown={handleKeyDownCantidadDevoluccion}
                                />
                            </div>
                        </div>


                        <div className="col-md-3 mb-3">
                            <h5>Descuento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    className='form-control'
                                    type='text'
                                    name='descuentoDevoluciones'
                                    disabled={true}
                                    value={Descuento}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-3 mb-3'></div>
                        <div className='col-md-3 mb-3'>
                            <button
                                className={
                                    (disableInputs)
                                        ? 'btn btn-dark disabled'
                                        : 'btn btn-dark '
                                }
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <BsFillInfoCircleFill
                                    className='iconSize'
                                />
                            </button>
                            {
                                (showMessageHelp && !disableInputs)
                                    ? <p className='fondoPop'>Puedes agregar el producto de devolucion con Enter en el campo de Devolucion o el botón de Agregar</p>
                                    : null
                            }
                        </div>
                        <div className='col-md-3 mb-3'>
                            <button
                                className={(disableInputsBody)
                                    ? 'btn btn-success disabled'
                                    : (isReturnAllArticulos)
                                        ? 'btn btn-success disabled'
                                        : 'btn btn-success'
                                }
                                onClick={handleAddDevolucion}
                            >
                                Agregar <FaCirclePlus className='iconSize' />
                            </button>
                        </div>

                        <div className='col-md-3 mb-3'>
                            <button
                                className={(disableInputsBody)
                                    ? 'btn btn-success disabled'
                                    : (isReturnAllArticulos)
                                        ? 'btn btn-success disabled'
                                        : 'btn btn-success'
                                }
                                onClick={handleAddAllDevolucion}
                            >
                                Agregar Todos <FaCirclePlus className='iconSize' />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='col-md-4 mb-2'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>
                                Artículo que se Pueden Devolver
                            </h4>
                        </div>
                        <div className='card-body'>
                            <RepaymentBodyTablaFactura columns={columns} data={factura.detalle} />
                        </div>
                        <div className='card-footer'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <h5>Vete</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='text'
                                            name='veteDevoluciones'
                                            disabled={true}
                                            value={CantVet}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <h5>Cantidad Bodega</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBoxesStacked className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='text'
                                            name='cantBodDevoluciones'
                                            disabled={true}
                                            value={CantBod}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
