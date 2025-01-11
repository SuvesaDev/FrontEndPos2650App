import { FaCalendar, FaHashtag, FaMoneyBill, FaPrint, FaSearch } from "react-icons/fa"
import { FaBuildingNgo, FaFilePdf, FaShop } from "react-icons/fa6"
import { GiWallet } from "react-icons/gi"
import { TbNotes } from "react-icons/tb"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { SetDatosReporteWihoutPay, SetFechaDesdeWihoutPay, SetFechaHastaWihoutPay, SetFechaReporteWihoutPay, startGetDatosSucursalActual } from "../../actions/countswihoutpay";
import Swal from "sweetalert2";
import { AiFillExclamationCircle } from "react-icons/ai";
import { CountsWihoutPayPDF } from "./CountsWihoutPayPDF";

export const CountsWihoutPayBody = () => {
    const dispatch = useDispatch();

    const {
        disableInputs,
        cedulaProveedor,
        nombreProveedor,
        codigoProveedor,
        telefonoProveedor,
        direccionProveedor,
        plazodiasProveedor,
        fechaDesde,
        fechaHasta,
        fechaReporte,
        datosReporte,
        datosSucursal, } = useSelector(state => state.wihoutpay);

    const { monedasInventory } = useSelector(state => state.monedas);

    const { auth, idSurcursal } = useSelector(state => state.login);
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };


    const handleInputDoubleChangeWithDispatch = ({ target }, action1, action2) => {
        const costaRicaDateTime = format(new Date(), 'EEEE, dd MMMM, yyyy HH:mm:ss', {
            locale: es,
            timeZone: 'America/Costa_Rica',
        });
        dispatch(action1(target.value));
        dispatch(action2(costaRicaDateTime))
    };



    const handleGenerateReport = () => {
        const costaRicaDateTime = format(new Date(), 'EEEE, dd MMMM, yyyy HH:mm:ss', {
            locale: es,
            timeZone: 'America/Costa_Rica',
        });
        dispatch(startGetDatosSucursalActual(idSucursalOF))
        dispatch(SetFechaReporteWihoutPay(costaRicaDateTime))
        if (fechaDesde != "" && fechaHasta != "" && cedulaProveedor != "" && nombreProveedor != "") {

            const reporte = {
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
                fechaActual: fechaReporte,
                datosProveedor: {
                    cedulaProveedor: cedulaProveedor,
                    nombreProveedor: nombreProveedor,
                    codigoProveedor: codigoProveedor,
                    telefonoProveedor: telefonoProveedor,
                    direccionProveedor: direccionProveedor,
                    plazodiasProveedor: plazodiasProveedor,
                },
                datosSucursal: datosSucursal,
                facturas: [
                    {
                        numeroFactura: '1233',
                        tipoFactura: 'CRE',
                        fechaFactura: '22/01/2024',
                        totalFactura: 69014.75,
                        abonosFactura: 0.00,
                        notasCredito: 0.00,
                        notasDebito: 0.00,
                        devolucion: 0.00,
                        saldoActual: 69014.75,
                    },
                    {
                        numeroFactura: '1234',
                        tipoFactura: 'CRE',
                        fechaFactura: '13/02/2024',
                        totalFactura: 79014.75,
                        abonosFactura: 0.00,
                        notasCredito: 0.00,
                        notasDebito: 0.00,
                        devolucion: 0.00,
                        saldoActual: 79014.75,
                    },
                ]

            }
            console.log(reporte)
            dispatch(SetDatosReporteWihoutPay(reporte))
        } else {
            Swal.fire('Error!', 'Complete los campos vacíos.', 'error');
        }
    }
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Cédula del Proveedor'
                            disabled={true}
                            value={cedulaProveedor}
                        />
                        <button
                            type="button"
                            className={
                                (disableInputs)
                                    ? 'btn btn-primary disabled'
                                    : 'btn btn-primary'
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#modalBuscarProveedoresCW"
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBuildingNgo className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Nombre del Proveedor'
                            disabled={true}
                            value={nombreProveedor}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Fecha Desde</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type='date'
                            className='form-control'
                            disabled={disableInputs}
                            value={fechaDesde}
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetFechaDesdeWihoutPay)
                            }
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Fecha Hasta</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type='date'
                            className='form-control'
                            disabled={disableInputs}
                            value={fechaHasta}
                            onChange={(e) =>
                                handleInputDoubleChangeWithDispatch(e, SetFechaHastaWihoutPay, SetFechaReporteWihoutPay)
                            }
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <hr />
                    <button
                        className={
                            (disableInputs)
                                ? 'btn btn-danger disabled'
                                : 'btn btn-danger'
                        }
                        onClick={handleGenerateReport}
                    >
                        Mostrar <FaFilePdf onClick={handleGenerateReport} className="iconSize" /></button>
                </div>
            </div>

            <hr />
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <h4>Reporte</h4>
                </div>
                <div className="card-body">
                    <div className="row mb-2 text-center" >
                        <div className="col-md-12 mb-2">
                            {datosReporte && Object.keys(datosReporte).length > 0 ? (
                                <CountsWihoutPayPDF data={datosReporte} />
                            ) : (
                                <center>
                                    <div className="toast show">
                                        <div className={"card-header toast-warning"}>
                                            <strong className="me-auto">
                                                2650 Informa <AiFillExclamationCircle className="iconSize" />
                                            </strong>
                                        </div>
                                        <div className="toast-body">
                                            <p className="text-danger">
                                                Datos del reporte sin consultar.
                                            </p>
                                        </div>
                                    </div>
                                </center>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
