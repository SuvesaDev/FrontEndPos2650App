import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
    SetExonerarBilling,
    SetDescuentoGeneral,
    SetAplicaDescuento,
    SetExtranjeroBilling,
    startEditDetalleBilling,
} from "../../actions/billing";
import { FaPercentage } from 'react-icons/fa';
import { FaColonSign } from "react-icons/fa6";

export const BillingTotals = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { billings, aumentoExtranjero } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;
        dispatch(action({ value: target.value, number: numberScreen }));
    };

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    const handleKeyDownDescuentoGeneral = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            Swal.fire({
                title: `¿Desea aplicar el descuento general de ${billings[numberScreen].descuentoGeneral}% ?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Aplicar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {
                    dispatch(SetAplicaDescuento({ value: true, number: numberScreen }));

                    calculateDescuentoGeneral(true);
                }

            });
        }
    }

    const handleCheckExtranjero = ({ target }) => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasHeader === true && billings[numberScreen].factura.detalle.length > 0) {
            dispatch(SetExtranjeroBilling({ value: target.checked, number: numberScreen }));
            calculateExtranjero((target.checked === true) ? 1 : 2);
        } else {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Ingrese un producto para aplicar el aumento de Extranjero'
            });

            return;

        }

    }

    // Tipo 1 = Aumentar
    // Tipo 2 = Disminuir
    const calculateExtranjero = (tipo) => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].aumentoExtranjero === 0 && billings[numberScreen].factura.detalle.length !== 0) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'No se cargo el porcentaje de aumento de extranjero'
            });

            return;
        }

        if (billings[numberScreen].factura.detalle.length === 0) {
            return;
        }

        if (tipo === 1) {

            // Aumentar
            let index = 0;
            let montoAumento = 0;

            billings[numberScreen].factura.detalle.forEach(linea => {

                let precioUnit = parseFloat(linea.Precio_Unit);
                let cantidad = parseFloat(linea.Cantidad);
                let impuesto = parseFloat(linea.Impuesto);

                montoAumento = precioUnit * (aumentoExtranjero / 100);
                linea.Precio_Unit = precioUnit + montoAumento;
                linea.SubTotal = (linea.Precio_Unit * cantidad);
                linea.Monto_Impuesto = linea.SubTotal * (impuesto / 100);

                if (linea.Impuesto > 0) {
                    linea.SubtotalGravado = linea.SubTotal;
                    linea.SubTotalExcento = 0;
                } else {
                    linea.SubtotalGravado = 0;
                    linea.SubTotalExcento = linea.SubTotal;
                }

                dispatch(startEditDetalleBilling(linea, index, numberScreen));

                index = index + 1;
            });

        } else if (tipo === 2) {

            //Disminuir
            let index = 0;
            let montoAumento = 0;

            billings[numberScreen].factura.detalle.forEach(linea => {

                let precioUnitOriginal = parseFloat(linea.Precio_UnitOriginal);
                let precioUnit = parseFloat(linea.Precio_Unit);
                let cantidad = parseFloat(linea.Cantidad);
                let impuesto = parseFloat(linea.Impuesto);

                montoAumento = precioUnitOriginal * (aumentoExtranjero / 100);
                linea.Precio_Unit = precioUnit - montoAumento;
                linea.SubTotal = (linea.Precio_Unit * cantidad);
                linea.Monto_Impuesto = linea.SubTotal * (impuesto / 100);

                if (linea.Impuesto > 0) {
                    linea.SubtotalGravado = linea.SubTotal;
                    linea.SubTotalExcento = 0;
                } else {
                    linea.SubtotalGravado = 0;
                    linea.SubTotalExcento = linea.SubTotal;
                }

                dispatch(startEditDetalleBilling(linea, index, numberScreen));

                index = index + 1;
            });

        }

    }

    const calculateDescuentoGeneral = (aplicaDescuento) => {

        if (billings[numberScreen] === undefined) return;

        if (aplicaDescuento === true) {

            if (billings[numberScreen].factura.detalle.length !== 0) {

                let index = 0;

                billings[numberScreen].factura.detalle.forEach(linea => {

                    if (linea.max_Descuento >= parseFloat(billings[numberScreen].descuentoGeneral)) {

                        linea.Descuento = billings[numberScreen].descuentoGeneral;

                        linea.SubTotal = (linea.Precio_Unit * linea.Cantidad);
                        linea.Monto_Descuento = linea.SubTotal * (linea.Descuento / 100);
                        linea.Monto_Impuesto = (linea.SubTotal - linea.Monto_Descuento) * (linea.Impuesto / 100);

                        if (linea.Impuesto > 0) {
                            linea.SubtotalGravado = linea.SubTotal;
                            linea.SubTotalExcento = 0;
                        } else {
                            linea.SubtotalGravado = 0;
                            linea.SubTotalExcento = linea.SubTotal;
                        }

                        dispatch(startEditDetalleBilling(linea, index, numberScreen));
                        index = index + 1;

                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Producto tiene un maximo descuento de ' + linea.max_Descuento + ' %',
                            text: linea.Descripcion
                        });

                    }

                });

                dispatch(SetAplicaDescuento({ value: false, number: numberScreen }));
            }
        }

    }

    return (

        <>
            <div className='card'>

                <div className="card-header">
                    <h5>Totales</h5>
                </div>

                <div className="card-body">
                    <div className="row mb-2">

                        <div className="col-md-12 mb-2">
                            <h5>Sub. Gravado</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="SubTotalGravada"
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? 
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].factura.encabezado.SubTotalGravada)
                                            : 0
                                    }
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <hr />
                            <h5>Sub. Exento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="SubTotalExento"
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? 
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].factura.encabezado.SubTotalExento)
                                            : 0
                                    }
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <hr />
                            <h5>SubTotal</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="SubTotal"
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? 
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].factura.encabezado.SubTotal)
                                            : 0
                                    }
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <hr />
                            <h5>Descuento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    name="descuentoGeneral"
                                    className="form-control"
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].descuentoGeneral
                                            : 0
                                    }
                                    onKeyDown={handleKeyDownDescuentoGeneral}
                                    onChange={e => handleInputChangeWithDispatch(e, SetDescuentoGeneral)}
                                />

                                <span className="input-group-text">
                                    <FaColonSign
                                        className="iconSize" />
                                </span>
                                <input
                                    name="Descuento"
                                    className="form-control"
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? 
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].factura.encabezado.Descuento)
                                            : 0
                                    }
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <hr />
                            <h5>Imp. Venta</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    name="Imp_Venta"
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? 
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].factura.encabezado.Imp_Venta)
                                            : 0
                                    }
                                    disabled
                                />
                            </div>
                            { (billings[numberScreen] !== undefined) 
                                ? (billings[numberScreen].isCostaPets) 
                                    ? <hr />
                                    : null
                                : null
                            }
                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-12 mb-2 d-none" : "col-md-12 mb-2" :  "col-md-12 mb-2"}>
                            <hr />
                            <h5>Monto Cupon</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    name="MontoCupon"
                                    value={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].factura.encabezado.MontoCupon
                                            : 0
                                    }
                                    disabled
                                />
                            </div>
                            <hr />

                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-6 mb-2 d-none" : "col-md-6 mb-2" :  "col-md-6 mb-2"}>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkExonerar"
                                    name="Exonerar"
                                    class="form-check-input checkP"

                                    checked={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].factura.encabezado.Exonerar
                                            : 0
                                    }
                                    onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetExonerarBilling)}
                                />
                                <h5 className="form-check-label textRed" for="checkExonerar">Exonerar</h5>
                            </div>
                            <hr />
                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-6 mb-2 d-none" : "col-md-6 mb-2" :  "col-md-6 mb-2"}>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input checkP"
                                    id="checkExtrajero"
                                    name="extranjero"
                                    checked={
                                        (billings[numberScreen] !== undefined)
                                            ? billings[numberScreen].extranjero
                                            : false
                                    }
                                    onChange={e => handleCheckExtranjero(e)}
                                />
                                <h5 className="form-check-label textRed" for="checkExtrajero">Extranjero</h5>
                            </div>
                            <hr />
                        </div>

                        <div className="col-md-12 mb-0">
                            <h3 className='bg-primary text-white'>Total</h3>
                            <h4 className='bg-dark text-white'>{
                                (billings[numberScreen] !== undefined)
                                    ?
                                    new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(billings[numberScreen].factura.encabezado.Total)
                                    : 0
                            }</h4>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}
