import { FaCashRegister, FaDollarSign, FaPercentage, FaUser } from "react-icons/fa"
import { FaColonSign, FaPercent, FaTruck } from "react-icons/fa6"
import { HiReceiptPercent } from "react-icons/hi2"
import { TbNotes } from "react-icons/tb"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCostoTransporteBudgets, SetDescuentoGeneralBudgets, SetImpuestoVentaGeneralBudgets, SetIsAnulateBudgets, SetIsConfirmBudgets, SetNombreQuienConfirmaBudgets, SetNombreQuienCotizaBudgets, SetObservacionesBudgets, SetSubTotalExentoGeneralBudgets, SetSubTotalGeneralBudgets, SetSubTotalGravadoGeneralBudgets, SetTotalGeneralBudgets } from "../../actions/budgetsAction";

export const ProformaTotals = () => {

    const dispatch = useDispatch();

    const { disableInputs, costoTransporte, nombrequienCotiza, disableInputsChecks,
        moneda,
        monedaNombre, isConfirm, isAnulate, observaciones, subTotalGeneral,
        subTotalGravadoGeneral,
        subTotalExentoGeneral,
        descuentoGeneral,
        impuestoVentaGeneral,
        totalGeneral, detalleFactura } = useSelector(state => state.budgets);
    const { auth } = useSelector(state => state.login);
    const { monedasInventory, tiposIdentificacion } = useSelector(state => state.monedas);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };


    const handleInputChangeCheck = ({ target }, action) => {
        dispatch(action(target.checked));
        if (!isConfirm) {
            dispatch(SetNombreQuienConfirmaBudgets(auth.username))
        } else {
            dispatch(SetNombreQuienConfirmaBudgets("Sin Confirmar"))
        }
    };


    const handleInputChangeNumberWithDispatch = ({ target }, action) => {
        const value = parseFloat(target.value);
        if (value > 0) {
            dispatch(action(value));
        } else {
            dispatch(action(0));
        }
    };

    useEffect(() => {
        if (detalleFactura.length > 0) {
            const intervalId = setInterval(() => {
                const sumValues = detalleFactura.reduce((accumulator, detalle) => {
                    accumulator.MontoImpuesto += detalle.MontoImpuesto;
                    accumulator.SubtotalGravado += detalle.SubtotalGravado;
                    accumulator.SubTotalExcento += detalle.SubTotalExcento;
                    accumulator.SubTotal += detalle.SubTotal;
                    accumulator.Total += detalle.Total;
                    accumulator.MontoDescuento += detalle.MontoDescuento;
                    return accumulator;
                }, {
                    MontoImpuesto: 0,
                    SubtotalGravado: 0,
                    SubTotalExcento: 0,
                    SubTotal: 0,
                    Total: 0,
                    MontoDescuento: 0
                });
                dispatch(SetSubTotalGeneralBudgets(sumValues.SubTotal));
                dispatch(SetSubTotalGravadoGeneralBudgets(sumValues.SubtotalGravado));
                dispatch(SetSubTotalExentoGeneralBudgets(sumValues.SubTotalExcento));
                dispatch(SetDescuentoGeneralBudgets(sumValues.MontoDescuento));
                dispatch(SetImpuestoVentaGeneralBudgets(sumValues.MontoImpuesto));
                if (costoTransporte > 0) {
                    dispatch(SetTotalGeneralBudgets(sumValues.Total + costoTransporte));
                } else {
                    dispatch(SetTotalGeneralBudgets(sumValues.Total));
                }
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [detalleFactura, costoTransporte, dispatch]);



    const validateCurrency = (value) => {
        if (moneda == 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda == 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    }
    return (
        <>

            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            placeholder="Anotaciones importantes...."
                            rows="3"
                            value={observaciones}
                            onChange={(e) => handleInputChangeWithDispatch(e, SetObservacionesBudgets)}
                        ></textarea>
                    </div>
                </div>

                <div className="col-md-12 mb-0">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Totales de Cotización</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2 mb-3">
                                    <h5>Sub.Gravado</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            {
                                                moneda == 1 ?
                                                    <FaColonSign className="iconSize" />
                                                    : moneda == 2 ?
                                                        <FaDollarSign className="iconSize" />
                                                        :
                                                        <FaColonSign className="iconSize" />
                                            }
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Subtotal Gravado"
                                            value={validateCurrency(subTotalGravadoGeneral)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Sub.Exento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            {
                                                moneda == 1 ?
                                                    <FaColonSign className="iconSize" />
                                                    : moneda == 2 ?
                                                        <FaDollarSign className="iconSize" />
                                                        :
                                                        <FaColonSign className="iconSize" />
                                            }
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Subtotal Exento"
                                            value={validateCurrency(subTotalExentoGeneral)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Sub.Total</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            {
                                                moneda == 1 ?
                                                    <FaColonSign className="iconSize" />
                                                    : moneda == 2 ?
                                                        <FaDollarSign className="iconSize" />
                                                        :
                                                        <FaColonSign className="iconSize" />
                                            }
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Subtotal General"
                                            value={validateCurrency(subTotalGeneral)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Descuento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Porcentaje de Descuento"
                                            value={descuentoGeneral ? validateCurrency(descuentoGeneral) : validateCurrency(0)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>



                                <div className="col-md-2 mb-3">
                                    <h5>IV %</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <HiReceiptPercent className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Impuesto de Venta"
                                            value={impuestoVentaGeneral ? validateCurrency(impuestoVentaGeneral) : validateCurrency(0)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Transporte</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaTruck className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder="Ingrese Transporte"
                                            min={0}
                                            value={costoTransporte}
                                            disabled={disableInputs}
                                            onChange={(e) => handleInputChangeNumberWithDispatch(e, SetCostoTransporteBudgets)}
                                        />
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={costoTransporte ? validateCurrency(costoTransporte) : validateCurrency(0)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Total</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCashRegister className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Total General"
                                            value={totalGeneral ? validateCurrency(totalGeneral) : validateCurrency(0)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-3 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Nombre Crea Cotización"
                                            disabled={disableInputs}
                                            value={nombrequienCotiza}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetNombreQuienCotizaBudgets)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-2">
                                    <br />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkSeConfirmo"
                                            class="form-check-input checkP"
                                            disabled={disableInputsChecks}
                                            checked={isConfirm}
                                            onChange={(e) => handleInputChangeCheck(e, SetIsConfirmBudgets)
                                            }
                                        />
                                        <h5 className="form-check-label textRed" for="checkSeConfirmo">Se Confirmo</h5>
                                    </div>
                                    <hr />
                                </div>
                                <div className="col-md-2 mb-2">
                                    <br />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkAnulada"
                                            className="form-check-input checkP"
                                            disabled={disableInputsChecks}
                                            checked={isAnulate}
                                            onChange={(e) => handleInputChangeCheck(e, SetIsAnulateBudgets)
                                            }
                                        />
                                        <h5 className="form-check-label textRed" for="checkAnulada">Anulada</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
