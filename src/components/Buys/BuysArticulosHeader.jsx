import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaHashtag, FaPercentage, FaSearch } from 'react-icons/fa';
import { BsFillInfoCircleFill, BsSortNumericDown } from 'react-icons/bs';
import { TbEditCircle, TbNotes } from 'react-icons/tb';
import { FaCirclePlus, FaColonSign, FaGift, FaMoneyBill, FaTruckFast } from 'react-icons/fa6';
import { MdRebaseEdit } from 'react-icons/md';

import {
    CleanDetalleActualCompras,
    SetBaseDetalleActualCompras,
    SetCabysDetalleActualCompras,
    SetCantidadDetalleActualCompras,
    SetCodArticuloDetalleActualCompras,
    SetCostoDetalleActualCompras,
    SetDescuentoCompras,
    SetDescuentoDetalleActualCompras,
    SetFleteDetalleActualCompras,
    SetImpuestoCompras,
    SetImpuestoDetalleActualCompras,
    SetIsOpenModalSearchCodigoCabysCompras,
    SetMonto_DescuentoDetalleActualCompras,
    SetMonto_ImpuestoDetalleActualCompras,
    SetOpenSearchInventoryCompras,
    SetOtrosDetalleActualCompras,
    SetRegaliaDetalleActualCompras,
    SetShowMessageHelpCompras,
    SetSubTotalExcentoDetalleActualCompras,
    SetSubTotalExentoCompras,
    SetSubTotalGravadaCompras,
    SetSubtotalGravadoDetalleActualCompras,
    SetTotalDetalleActualCompras,
    SetTotalFacturaCompras,
    startAddDetalleActualCompras,
    startEditDetalleActualCompras,
    startGetOneInventoryCompras
} from '../../actions/ComprasAction';

export const BuysArticulosHeader = () => {

    const dispatch = useDispatch();

    const {
        detalleArticuloActual,
        compras,
        PosicionActual,
        disableInputs,
        disableInputsDetalle,
        showMessageHelp,
        isDetalleActualEdit,
        isCostaPets
    } = useSelector(state => state.compras);

    const { encabezado, detalle } = compras;

    const {
        CodArticulo,
        codFxArticulo,
        Descripcion,
        Cantidad,
        Regalia,
        Base,
        Flete,
        Otros,
        Costo,
        Descuento,
        Monto_Descuento,
        Impuesto,
        Monto_Impuesto,
        SubtotalGravado,
        SubTotalExcento,
        SubTotal,
        Total,
        precio_A,
        precio_B,
        precio_C,
        precio_D,
        Cabys,
    } = detalleArticuloActual;

    //calculos de totales generales
    useEffect(() => {

        let SubTotalExcentoGeneral = 0;
        let SubTotalGravadoGeneral = 0;
        let MontoDescuentoGeneral = 0;
        let MontoImpuestoGeneral = 0;
        let TotalFactura = 0;

        if (detalle.length !== 0) {

            detalle.forEach(linea => {
                SubTotalExcentoGeneral = SubTotalExcentoGeneral + linea.SubTotalExcento;
                SubTotalGravadoGeneral = SubTotalGravadoGeneral + linea.SubtotalGravado;
                MontoDescuentoGeneral = MontoDescuentoGeneral + linea.Monto_Descuento;
                MontoImpuestoGeneral = MontoImpuestoGeneral + linea.Monto_Impuesto;
                TotalFactura = TotalFactura + linea.Total;
            });
        }

        dispatch(SetSubTotalExentoCompras(SubTotalExcentoGeneral));
        dispatch(SetSubTotalGravadaCompras(SubTotalGravadoGeneral));
        dispatch(SetDescuentoCompras(MontoDescuentoGeneral));
        dispatch(SetImpuestoCompras(MontoImpuestoGeneral));

        dispatch(SetTotalFacturaCompras(TotalFactura));
        // dispatch(SetTotalFacturaCompras((SubTotalExcentoGeneral + SubTotalGravadoGeneral) - MontoDescuentoGeneral + MontoImpuestoGeneral));
    }, [detalle]);

    useEffect(() => {

        let base = parseFloat(Base);
        let flete = parseFloat(Flete);
        let otros = parseFloat(Otros);
        let cantidad = parseFloat(Cantidad);

        let subtotal = (cantidad * (base + flete + otros));
        let descuento = (subtotal * (Descuento / 100));
        let impuesto = (subtotal - descuento) * (Impuesto / 100);

        if (Impuesto > 0) {
            dispatch(SetSubtotalGravadoDetalleActualCompras(subtotal));
            dispatch(SetSubTotalExcentoDetalleActualCompras(0));
            dispatch(SetMonto_ImpuestoDetalleActualCompras(impuesto));
        } else {
            dispatch(SetSubtotalGravadoDetalleActualCompras(0));
            dispatch(SetSubTotalExcentoDetalleActualCompras(subtotal));
            dispatch(SetMonto_ImpuestoDetalleActualCompras(0));
        }

        dispatch(SetCostoDetalleActualCompras(base + flete + otros));

        dispatch(SetTotalDetalleActualCompras(subtotal - descuento + impuesto));

    }, [Base, Flete, Otros, Cantidad, Descuento, Monto_Descuento, Impuesto]);

    const handleSearchArticleBilling = (e) => {
        
        if (!disableInputs) {
            dispatch(SetOpenSearchInventoryCompras(true));
            dispatch(CleanDetalleActualCompras());
        }
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleAddCantidad = () => {
        dispatch(SetCantidadDetalleActualCompras(Cantidad + 1));
    }

    const handleChangePorcentajeDescuento = ({ target }) => {

        if (isNaN(target.value)) {
            dispatch(SetDescuentoDetalleActualCompras(0));
            return;
        }

        const newDescuento = parseInt(target.value);

        const montoDescuento = Costo * (newDescuento / 100);

        dispatch(SetDescuentoDetalleActualCompras(newDescuento));
        dispatch(SetMonto_DescuentoDetalleActualCompras(montoDescuento));
    }

    const handleChangeMontoDescuento = ({ target }) => {

        let newMontoDescuento = 0;

        if (target.value.length !== 0) {

            if (target.value[0] === "0" || Monto_Descuento === 0) {
                newMontoDescuento = parseFloat(target.value.substring(1));
            } else {
                newMontoDescuento = parseFloat(target.value);
            }

            const porcentajeDescuento = (newMontoDescuento / Costo) * 100;

            dispatch(SetMonto_DescuentoDetalleActualCompras(newMontoDescuento));
            dispatch(SetDescuentoDetalleActualCompras((!isNaN(porcentajeDescuento) ? porcentajeDescuento : 0)));

        } else {
            dispatch(SetMonto_DescuentoDetalleActualCompras(''));
            dispatch(SetDescuentoDetalleActualCompras(0));
        }
    }

    const handleChangeImpuesto = ({ target }) => {
        dispatch(SetImpuestoDetalleActualCompras(target.value));
    }

    const handleSearchCodigoCabys = () => {
        dispatch(SetIsOpenModalSearchCodigoCabysCompras(true));
    }

    const handleMouseEnter = (e) => {
        e.preventDefault();
        dispatch(SetShowMessageHelpCompras(true));
    }

    const handleMouseLeave = (e) => {
        e.preventDefault();
        dispatch(SetShowMessageHelpCompras(false));
    }

    const handleKeyDownCodigoArticulo = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (CodArticulo !== '' && CodArticulo !== "0") {
                dispatch(startGetOneInventoryCompras(parseInt(CodArticulo), 2));
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba un código valido.'
                });
            }

        }
    }

    const handleClickDownImpuesto = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (detalleArticuloActual.CodArticulo === '' || detalleArticuloActual.CodArticulo === 0) {
                return;
            }

            if (!isDetalleActualEdit) {
                dispatch(startAddDetalleActualCompras(detalleArticuloActual));
            } else {
                dispatch(startEditDetalleActualCompras(detalleArticuloActual, parseFloat(PosicionActual)));
            }
        }
    }

    const handleAddDetalle = (e) => {

        e.preventDefault();

        if (detalleArticuloActual.CodArticulo === '' || detalleArticuloActual.CodArticulo === 0) {
            return;
        }

        // console.log(PosicionActual);
        if (!isDetalleActualEdit) {
            dispatch(startAddDetalleActualCompras(detalleArticuloActual));
        } else {
            dispatch(startEditDetalleActualCompras(detalleArticuloActual, parseFloat(PosicionActual)));
        }
    }

    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-6 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Código del Artículo"
                            name="CodArticulo"
                            type='number'
                            min="0"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={CodArticulo}
                            onChange={e => handleInputChangeWithDispatch(e, SetCodArticuloDetalleActualCompras)}
                            onKeyDown={e => handleKeyDownCodigoArticulo(e)}
                        />
                        <button
                            className={
                                (disableInputs)
                                    ? 'btn btn-primary disbaled'
                                    : (disableInputsDetalle)
                                        ? 'btn btn-primary disbaled'
                                        : 'btn btn-primary'
                            }
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modalBuscarArticulo"
                            onClick={handleSearchArticleBilling}

                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-6 mb-2">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Descripción del Artículo"
                            name="Descripcion"
                            disabled={true}
                            value={Descripcion}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-2 mb-3">
                    <h5>Cantidad</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <BsSortNumericDown className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='Cantidad'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Cantidad}
                            onChange={e => handleInputChangeWithDispatch(e, SetCantidadDetalleActualCompras)}
                        />
                        <button
                            className={
                                (disableInputs)
                                    ? 'btn btn-primary disabled'
                                    : (disableInputsDetalle)
                                        ? 'btn btn-primary disabled'
                                        : 'btn btn-primary'
                            }
                            type="button"
                            onClick={handleAddCantidad}
                        >
                            <FaCirclePlus className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className={ (isCostaPets) ? 'col-md-2 mb-3 d-none' : 'col-md-2 mb-3' }>
                    <h5>Regalías</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaGift className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='Regalia'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Regalia}
                            onChange={e => handleInputChangeWithDispatch(e, SetRegaliaDetalleActualCompras)}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Base</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdRebaseEdit className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='Base'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Base}
                            onChange={e => handleInputChangeWithDispatch(e, SetBaseDetalleActualCompras)}
                        />
                        <input
                            className="form-control"
                            type='text'
                            disabled
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Base)
                            }
                        />
                    </div>
                </div>

                <div className={ (isCostaPets) ? 'col-md-2 mb-3 d-none' : 'col-md-2 mb-3' }>
                    <h5>Fletes</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaTruckFast className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='Flete'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Flete}
                            onChange={e => handleInputChangeWithDispatch(e, SetFleteDetalleActualCompras)}
                        />
                        <input
                            className="form-control"
                            type='text'
                            disabled
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Flete)
                            }
                        />
                    </div>
                </div>

                <div className={ (isCostaPets) ? 'col-md-2 mb-3 d-none' : 'col-md-2 mb-3' }>
                    <h5>Otros</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='Otros'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Otros}
                            onChange={e => handleInputChangeWithDispatch(e, SetOtrosDetalleActualCompras)}
                        />
                        <input
                            className="form-control"
                            type='text'
                            disabled
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Otros)
                            }
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Costo</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaColonSign className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='Costo'
                            disabled={true}
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Costo)
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Descuento</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPercentage className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='tipoDescuentoArticulo'
                            type='number'
                            min="0"
                            max="100"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Descuento}
                            onChange={e => handleChangePorcentajeDescuento(e)}
                        />
                        <input
                            className="form-control"
                            type='text'
                            placeholder='0'
                            disabled
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Monto_Descuento)
                            }
                            onChange={e => handleChangeMontoDescuento(e,)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Cabys</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            className='form-control'
                            name='Cabys'
                            type='number'
                            placeholder='0'
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Cabys}
                            onChange={e => handleInputChangeWithDispatch(e, SetCabysDetalleActualCompras)}
                        />
                        <button
                            className={
                                (disableInputs)
                                    ? 'btn btn-primary disabled'
                                    : (disableInputsDetalle)
                                        ? 'btn btn-primary disabled'
                                        : 'btn btn-primary'
                            }
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modalBuscarCodigoCabys"
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Impuesto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPercentage className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='tipoImpArticulo'
                            type='number'
                            min="0"
                            max="13"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value={Impuesto}
                            onChange={e => handleChangeImpuesto(e)}
                            onKeyDown={e => handleClickDownImpuesto(e)}
                        />
                        <input
                            className="form-control"
                            name='Monto_Impuesto'
                            disabled={true}
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Monto_Impuesto)
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetDescuentoDetalleActualCompras)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Total Compra</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMoneyBill className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name='totalCompraArticulo'
                            disabled={true}
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Total)
                            }
                        />
                    </div>
                </div>
            </div>
            
            <div className="row mb-2 text-center">
                {/* <div className="col-md-2 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name="codigo2"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value='0'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Cantidad</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <BsSortNumericDownAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name="cantidadP"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value='0'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Costo</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaColonSign className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name="CostoP"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value='0'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Sub Total</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaWallet className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name="SubTotalP"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            value='0'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            id="checkBonificadoBuys"
                            type="checkbox"
                            disabled={(disableInputs) ? disableInputs : disableInputsDetalle}
                            name="bonificado"
                        />
                        <h5 className="form-check-label" for="checkBonificadoBuys">Bonificado</h5>
                    </div>
                    <hr />
                </div> */}

                <div className="col-md-2 mb-3">
                    <hr />
                    <button
                        className={
                            (disableInputs)
                                ? 'btn btn-dark disbaled'
                                : (disableInputsDetalle)
                                    ? 'btn btn-dark disbaled'
                                    : 'btn btn-dark'
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <BsFillInfoCircleFill
                            className='iconSize'
                        />
                    </button>


                    {
                        (showMessageHelp && !disableInputs && !disableInputsDetalle)
                            ? (isDetalleActualEdit)
                                ? <p className="fondoPop">Puedes editar el producto con Enter en el campo de Porcentaje Impuesto o el botón de Editar</p>
                                : <p className="fondoPop">Puedes agregar el producto con Enter en el campo de Porcentaje Impuesto o el botón de Agregar</p>
                            : null
                    }
                </div>
                <div className="col-md-1 mb-3">
                    <hr />
                    <button className={
                        (isDetalleActualEdit)
                            ? 'btn btn-warning'
                            : 'btn btn-success'
                    }
                        onClick={handleAddDetalle}>
                        {(isDetalleActualEdit) ?
                            <>
                                Editar <TbEditCircle className='iconSize' />
                            </>
                            :
                            <>
                                Agregar <FaCirclePlus className='iconSize' />
                            </>}
                    </button>
                </div>
            </div>

        </>

    )
}