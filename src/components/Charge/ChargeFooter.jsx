import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoneyBill } from 'react-icons/fa6';
import { PiKeyFill } from 'react-icons/pi';
import { FaEye, FaEyeSlash, FaUserCheck, FaWindowClose } from 'react-icons/fa';
import { DeleteTab } from '../../actions/tabs';
import {
    CleanStateCharge,
    SetClaveInternaUserCharge,
    SetIdUserCharge,
    SetIsOpenTicketModalCharge,
    SetVisiblePasswordUserCharge,
    startSaveCharge,
    startValidateClaveInternaCharge
} from '../../actions/ChargeAction';
import { ChargeDetailsPreventaModal } from './ChargeDetailsPreventaModal';
import { ChargeTicketModal } from './ChargeTicketModal';
import { ChargeTiqueteCaja } from './ChargeTiqueteCaja';
import { PDFViewer } from '@react-pdf/renderer';
import { ChargeTiqueteAbonoModal } from './ChargeTiqueteAbonoModal';
import { ChargeTiqueteAbono } from './ChargeTiqueteAbono';
import { AiFillExclamationCircle } from 'react-icons/ai';

export const ChargeFooter = () => {

    const dispatch = useDispatch();

    const { usersActive, idSurcursal, auth } = useSelector(state => state.login);
    const { currentTab } = useSelector(state => state.tabs);
    const { dollar } = useSelector(state => state.sidebar);
    const {
        userCharge,
        visiblePassword,
        disableInputsUser,
        disableIconsSearch,
        starOpening,
        preventa,
        isSearchPreventa,
        cobrar,
        totalCobrar,
        cambio,
        nameUserCharge,
        tiquete,
        isTiqueteNormal,
        tiqueteAbono,
    } = useSelector(state => state.charge);

    const { id, claveInterna } = userCharge;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

    const handleOnKeyDownUser = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (claveInterna == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba una contraseña.'
                });

                return;
            }

            dispatch(startValidateClaveInternaCharge(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordUserCharge(!visiblePassword));
        }
    }

    const handleCreateCharge = (e) => {

        if (starOpening === true && isSearchPreventa === true) {

            if (totalCobrar === 0) {

                e.preventDefault();

                let cobros = cobrar.map(cobro => {

                    if (cobro.montoPago != '') {
                        return {
                            id: cobro.id,
                            documento: parseFloat(cobro.documento),
                            tipoDocumento: cobro.tipoDocumento,
                            montoPago: cobro.montoPago,
                            formaPago: cobro.formaPago,
                            usuario: cobro.usuario,
                            nombre: cobro.nombre,
                            codMoneda: cobro.codMoneda,
                            nombremoneda: cobro.nombremoneda,
                            tipoCambio: (cobro.nombremoneda === 'DOLAR')
                                ? dollar
                                : 0,
                            fecha: cobro.fecha,
                            numapertura: cobro.numapertura,
                            vuelto: (cobro.formaPago === 'EFE')
                                ? (cambio !== 0.00) ? cambio : 0
                                : 0,
                            numeroDocumento: cobro.numeroDocumento,
                            idDocumento: cobro.idDocumento,
                            idSucursal: idSucursalOF
                        }
                    }
                });

                cobros = cobros.filter((c) => {
                    return c !== undefined;
                });

                dispatch(startSaveCharge(cobros));
            } else {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'No se puede realizar la operacion falta dinero por cobrar. Por favor intentelo de nuevo.'
                });

            }
        }
    }

    const handleCloseWindow = (e) => {

        if (starOpening) {

            let message = '';

            if (preventa.length > 0) {
                message = `¿Desea cancelar el cobro de la ficha #${preventa[0].ficha}?`
            } else {
                message = `¿Desea cancelar el cobro?`
            }

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: message,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {
                    e.preventDefault();

                    // Se limpia el estado
                    dispatch(CleanStateCharge());
                }

            });
        } else {

            e.preventDefault();

            // Se limpia el estado
            dispatch(CleanStateCharge());

            // Se ciera la tab
            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
        }

    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            disableIconsSearch
                                ? "btn btn-success espacio disabled"
                                : "btn btn-success espacio"
                        }
                        onClick={handleCreateCharge}
                        data-bs-toggle="modal"
                        data-bs-target={isTiqueteNormal === true ? "#modalTiqueteVenta" : "#modalTiqueteAbono"}
                    >
                        Cobrar <FaMoneyBill className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindow}
                    >
                        {(starOpening) ? "Cancelar" : "Cerrar"} {""}
                        <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-3 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>
                        <input
                            type={(visiblePassword) ? 'text' : 'password'}
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaUserCharge)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {visiblePassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                <div className="col-md-2 mb-2 espacio">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={nameUserCharge}
                        />
                    </div>
                </div>
            </div>
            <ChargeDetailsPreventaModal />
            <ChargeTiqueteAbonoModal />
            <ChargeTicketModal />

        </>

    )
}