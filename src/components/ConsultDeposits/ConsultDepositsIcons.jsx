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
import { FaEye, FaEyeSlash, FaWindowClose } from 'react-icons/fa';


import { DeleteTab } from '../../actions/tabs';
import {
    CleanStateConsultDeposits,
    SetClaveInternaConsultDeposits,
    SetVisiblePasswordConsultDeposits,
    startSearchDepositsConsultDeposits,
    startSearchPreDepositsConsultDeposits,
    startValidateClaveInternaConsultDeposits
} from '../../actions/ConsultDepositsAction';

import { ConsultDepositsPreDepositsModal } from './ConsultDepositsPreDepositsModal';
import { ConsultDepositsDepositsModal } from './ConsultDepositsDepositsModal';

export const ConsultDepositsIcons = () => {

    const dispatch = useDispatch();

    const {
        activeButtonSearch,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        currentTab,
        optionssearchPreDepositos,
        checkNumeroPreDeposito,
        checkNumAperturaPreDeposito,
        checkCajeroPreDeposito,
        checkDepositantePreDeposito,
        checkFechasPreDeposito,
        optionssearchDepositos,
        checkNumeroDeposito,
        checkBancoDeposito,
        checkCajeroDeposito,
        checkFechasDeposito,
        disableInputs,
        startOpeningConsultDeposito
    } = useSelector(state => state.consultDeposits);

    const stateTabs = useSelector(state => state.tabs);

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

            dispatch(startValidateClaveInternaConsultDeposits(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordConsultDeposits(!visiblePassword));
        }

    }

    const handleSearch = (e) => {

        if (disableInputs) return;

        if (currentTab === 'Depositos') {
            handleClickSearchDeposits(e);
        } else if (currentTab === 'PreDepositos') {
            handleClickSearchPreDeposits(e);
        }

    }

    const handleClickSearchPreDeposits = (e) => {

        if (optionssearchPreDepositos.numero !== '' || optionssearchPreDepositos.numApertura !== '' || optionssearchPreDepositos.cajero !== '' || optionssearchPreDepositos.depositante !== '' || checkFechasPreDeposito) {

            e.preventDefault();

            // Busqueda por numero
            if (checkNumeroPreDeposito && !checkNumAperturaPreDeposito
                && !checkCajeroPreDeposito
                && !checkDepositantePreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero: optionssearchPreDepositos.numero,
                    numApertura: null,
                    cajero: null,
                    depositante: null,
                    fechaDesde: null,
                    fechaHasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por num Apertura
            if (checkNumAperturaPreDeposito && !checkNumeroPreDeposito
                && !checkCajeroPreDeposito
                && !checkDepositantePreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: optionssearchPreDepositos.numApertura,
                    cajero: null,
                    depositante: null,
                    fechaDesde: null,
                    fechaHasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por cajero
            if (checkCajeroPreDeposito && !checkNumeroPreDeposito
                && !checkNumAperturaPreDeposito
                && !checkDepositantePreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: null,
                    cajero: optionssearchPreDepositos.cajero,
                    depositante: null,
                    fechaDesde: null,
                    fechaHasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por depositante
            if (checkDepositantePreDeposito && !checkNumeroPreDeposito
                && !checkNumAperturaPreDeposito
                && !checkCajeroPreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: null,
                    cajero: null,
                    depositante: optionssearchPreDepositos.depositante,
                    fechaDesde: null,
                    fechaHasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por fechas
            if (checkFechasPreDeposito && !checkNumeroPreDeposito
                && !checkNumAperturaPreDeposito
                && !checkCajeroPreDeposito
                && !checkDepositantePreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: null,
                    cajero: null,
                    depositante: null,
                    fechaDesde: optionssearchPreDepositos.fechaDesde,
                    fechaHasta: optionssearchPreDepositos.fechaHasta
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor escriba un criterio de busqueda.'
            });
        }

    }

    const handleClickSearchDeposits = (e) => {

        if (disableInputs) return;

        if (optionssearchDepositos.numero !== '' || optionssearchDepositos.banco !== '' || optionssearchDepositos.cajero !== '' || checkFechasDeposito) {

            e.preventDefault();

            // Busqueda por numero
            if (checkNumeroDeposito && !checkBancoDeposito
                && !checkCajeroDeposito
                && !checkFechasDeposito) {

                const searchDeposits = {
                    numero: optionssearchDepositos.numero,
                    banco: null,
                    cajero: null,
                    fechaDesde: null,
                    fechaHasta: null
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

                return;
            }

            // Busqueda por Banco
            if (checkBancoDeposito && !checkNumeroDeposito
                && !checkCajeroDeposito
                && !checkFechasDeposito) {

                const searchDeposits = {
                    numero: null,
                    banco: optionssearchDepositos.banco,
                    cajero: null,
                    fechaDesde: null,
                    fechaHasta: null
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

                return;
            }

            // Busqueda por cajero
            if (checkCajeroDeposito && !checkNumeroDeposito
                && !checkBancoDeposito
                && !checkFechasDeposito) {

                const searchDeposits = {
                    numero: null,
                    banco: null,
                    cajero: optionssearchDepositos.cajero,
                    fechaDesde: null,
                    fechaHasta: null
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

                return;
            }

            // Busqueda por fechas
            if (checkFechasDeposito && !checkNumeroDeposito
                && !checkBancoDeposito
                && !checkCajeroDeposito) {

                const searchDeposits = {
                    numero: null,
                    banco: null,
                    cajero: null,
                    fechaDesde: optionssearchDepositos.fechaDesde,
                    fechaHasta: optionssearchDepositos.fechaHasta
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

                return;
            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor escriba un criterio de busqueda.'
            });
        }

    }

    const handleCloseWindowConsultDeposits = (e) => {

        if (startOpeningConsultDeposito) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la busqueda de Depósitos y Pre Depósitos?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanStateConsultDeposits());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(stateTabs.currentTab.name, stateTabs.currentTab.routePage));
            dispatch(CleanStateConsultDeposits());

        }

    }

    return (
        <>

            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSearch
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
                        onClick={handleSearch}
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindowConsultDeposits}
                    >
                        {(startOpeningConsultDeposito) ? "Cancelar" : "Cerrar"} {""}
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
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaConsultDeposits)}
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

            <ConsultDepositsPreDepositsModal />
            <ConsultDepositsDepositsModal />

        </>

    )
}
