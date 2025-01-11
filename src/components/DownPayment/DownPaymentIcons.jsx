import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { HiDocumentAdd } from 'react-icons/hi';
import { FaRegSave, FaSearch } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbTrashXFilled } from 'react-icons/tb';
import { PiKeyFill } from 'react-icons/pi';
import { FaEye, FaEyeSlash, FaUserCheck, FaWindowClose } from 'react-icons/fa';


import { DownPaymentSearchModal } from './DownPaymentSearchModal';
import { DownPaymentSearchCustomerModal } from './DownPaymentSearchCustomerModal';

import { DeleteTab } from '../../actions/tabs';
import {
    CleanEntregaCuentaDownPayment,
    CleanEntregaDownPayment,
    SetClaveInternaDownPayment,
    SetIsOpenModalSearchDownPayment,
    SetIsSearchEntregaCuentaDownPayment,
    SetVisiblePasswordDownPayment,
    startDisableDownPayment,
    startSaveDownPayment,
    startValidateClaveInternaDownPayment
} from '../../actions/DownPaymentAction';

export const DownPaymentIcons = () => {

    const dispatch = useDispatch();

    const {
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        isDisableEntrega,
        startOpeningEntrega,
        isSearchEntrega,
        entregaCuenta
    } = useSelector(state => state.downPayment);

    const { dollar } = useSelector(state => state.sidebar);
    const { idSurcursal } = useSelector(state => state.login);
    const { currentTab } = useSelector(state => state.tabs);

    const {
        id,
        monto,
        formaPago,
        denominacion,
        usuario,
        nombre,
        codMoneda,
        moneda,
        fecha,
        numApertura,
        vuelto,
        numeroDocumento,
        tipoDocumento,
        montoEntregaCuenta,
        montoDisponibleCuenta,
        codCliente,
        cedula
    } = entregaCuenta;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleOnKeyDownUser = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (claveInterna == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba su contraseña.'
                });

                return;
            }

            dispatch(startValidateClaveInternaDownPayment(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordDownPayment(!visiblePassword));
        }
    }

    const handleSearchDownPayment = (e) => {

        if (activeButtonSearch) {

            dispatch(SetIsOpenModalSearchDownPayment(true));
        }
    }

    const handleNewDownPayment = async (e) => {

        if (activeButtonSave && isSearchEntrega) {

            e.preventDefault();

            // Se cambia el isSearchEntrega
            dispatch(SetIsSearchEntregaCuentaDownPayment(false));

            // Se limpia el estado
            dispatch(CleanEntregaDownPayment());
        }
    }

    const handleSaveDownPayment = async (e) => {

        if (activeButtonSave) {

            e.preventDefault();

            let surcursal = 0;

            // Se obtiene las idSurcursal si no estan cargadas
            if (idSurcursal === 0) {
                surcursal = JSON.parse(localStorage.getItem('auth')).idSurcursal;
            } else {
                surcursal = idSurcursal;
            }

            const newDownPayment = {
                monto: parseFloat(monto),
                formaPago,
                denominacion: denominacion,
                usuario: usuario,
                nombre: nombre,
                codMoneda: parseInt(codMoneda),
                moneda: moneda,
                tipoCambio: (moneda === 'DOLAR') ? parseFloat(dollar) : 0,
                fecha: fecha,
                numApertura: numApertura,
                vuelto: vuelto,
                numeroDocumento: numeroDocumento,
                sucursal: surcursal,
                tipoDocumento: tipoDocumento,
                montoEntregaCuenta: parseFloat(montoEntregaCuenta),
                montoDisponibleCuenta: parseFloat(montoDisponibleCuenta),
                codCliente: parseInt(codCliente)
            }

            dispatch(startSaveDownPayment(newDownPayment, cedula));
        }
    }

    const handleDisableDownPayment = (e) => {

        if (activeButtonRemove && !isDisableEntrega) {

            e.preventDefault();

            dispatch(startDisableDownPayment(id, codCliente, nombre));
        }
    }

    const handleCloseWindowDownPayment = (e) => {

        if (startOpeningEntrega) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar los cambios en entrega a cuenta?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanEntregaCuentaDownPayment());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanEntregaCuentaDownPayment());

        }

    }

    return (
        <>

            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSave
                                ? "btn btn-success espacio"
                                : "btn btn-success espacio disabled"
                        }
                        onClick={handleNewDownPayment}
                    >
                        {
                            (isSearchEntrega)
                                ?
                                <>
                                    Nuevo <MdNoteAdd className="iconSize" />
                                </>
                                :
                                <>
                                    Registrar <FaRegSave className="iconSize" />
                                </>
                        }
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSearch
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscaEntregaCuentaGen"
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonRemove
                                ? "btn btn-danger espacio"
                                : "btn btn-danger espacio disabled"
                        }
                        onClick={handleDisableDownPayment}

                    >
                        Anular <TbTrashXFilled className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindowDownPayment}
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
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
                            disabled={disableInputsUser}
                            value={claveInterna}
                            className="form-control"
                            placeholder="Clave Interna"
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaDownPayment)}
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

            </div>
            <DownPaymentSearchCustomerModal />
            <DownPaymentSearchModal />
        </>

    )
}
