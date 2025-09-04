import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { FaPercentage } from 'react-icons/fa';
import { FaColonSign } from "react-icons/fa6";


export const ConsignmentTotals = () => {

    const dispatch = useDispatch();

    const { factura } = useSelector(state => state.consignment);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        // if (billings[numberScreen] === undefined || !billings[numberScreen].enableItems) return;
        // dispatch(action({ value: target.value, number: numberScreen }));
    };

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    const handleKeyDownDescuentoGeneral = (e) => {

        // if (e.key === 'Enter') {

        //     e.preventDefault();

        //     Swal.fire({
        //         title: `¿Desea aplicar el descuento general de ${billings[numberScreen].descuentoGeneral}% ?`,
        //         showDenyButton: true,
        //         showCancelButton: false,
        //         confirmButtonText: 'Aplicar',
        //         denyButtonText: `Cancelar`,
        //     }).then(async (result) => {

        //         if (result.isConfirmed) {
        //             dispatch(SetAplicaDescuento({ value: true, number: numberScreen }));

        //             calculateDescuentoGeneral(true);
        //         }

        //     });
        // }
    }

    const calculateDescuentoGeneral = (aplicaDescuento) => {

        // if (billings[numberScreen] === undefined) return;

        // if (aplicaDescuento === true) {

        //     if (billings[numberScreen].factura.detalle.length !== 0) {

        //         let index = 0;

        //         billings[numberScreen].factura.detalle.forEach(linea => {

        //             if (linea.max_Descuento >= parseFloat(billings[numberScreen].descuentoGeneral)) {

        //                 linea.Descuento = billings[numberScreen].descuentoGeneral;

        //                 linea.SubTotal = (linea.Precio_Unit * linea.Cantidad);
        //                 linea.Monto_Descuento = linea.SubTotal * (linea.Descuento / 100);
        //                 linea.Monto_Impuesto = (linea.SubTotal - linea.Monto_Descuento) * (linea.Impuesto / 100);

        //                 if (linea.Impuesto > 0) {
        //                     linea.SubtotalGravado = linea.SubTotal;
        //                     linea.SubTotalExcento = 0;
        //                 } else {
        //                     linea.SubtotalGravado = 0;
        //                     linea.SubTotalExcento = linea.SubTotal;
        //                 }

        //                 dispatch(startEditDetalleBilling(linea, index, numberScreen));
        //                 index = index + 1;

        //             } else {

        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Producto tiene un maximo descuento de ' + linea.max_Descuento + ' %',
        //                     text: linea.Descripcion
        //                 });

        //             }

        //         });

        //         dispatch(SetAplicaDescuento({ value: false, number: numberScreen }));
        //     }
        // }

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
                                    value={ new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(factura.encabezado.SubTotalGravada)}
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
                                    value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(factura.encabezado.SubTotalExento)}
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
                                    value={ new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(factura.encabezado.SubTotal) }
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <hr />
                            <h5>Descuento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign
                                        className="iconSize" />
                                </span>
                                <input
                                    name="Descuento"
                                    className="form-control"
                                    value={ new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(factura.encabezado.Descuento) }
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
                                    value={ new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(factura.encabezado.Imp_Venta) }
                                    disabled
                                />
                            </div>

                            <hr />
                        </div>

                        <div className="col-md-12 mb-0">
                            <h3 className='bg-primary text-white'>Total</h3>
                            <h4 className='bg-dark text-white'>
                                {
                                    new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(factura.encabezado.Total)
                                }
                            </h4>
                        </div>

                    </div>
                </div>

            </div>
        </>

    )
}
