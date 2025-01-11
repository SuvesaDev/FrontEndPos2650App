import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbEditCircle, TbTrashXFilled } from 'react-icons/tb';
import { PiKeyFill } from 'react-icons/pi';
import { FaEye, FaEyeSlash, FaWindowClose } from 'react-icons/fa';

import { DeleteTab } from '../../actions/tabs';

import {
    CleanPreDeposits,
    SetClaveInternaPreDeposits,
    SetIsOpenModalSearchPreDeposits,
    SetVisiblePasswordPreDeposits,
    startEditPreDeposits,
    startSavePreDeposits,
    startValidateClaveInternaPreDeposits
} from '../../actions/PreDepositsAction';

import { PreDepositsSearchModal } from './PreDepositsSearchModal';

export const PreDepositsIcons = () => {

    const dispatch = useDispatch();


    const {
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        preDeposito,
        isEditPreDeposits,
        startOpeningPreDeposito
    } = useSelector(state => state.preDeposits);

    const {
        id,
        fecha,
        cajero,
        nombreCajero,
        cedula,
        depositante,
        numApertura,
        monto,
        observaciones
    } = preDeposito;

    const { currentTab } = useSelector(state => state.tabs);

    const { auth } = useSelector(state => state.login);

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

            dispatch(startValidateClaveInternaPreDeposits(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordPreDeposits(!visiblePassword));
        }
    }

    const handleSearchPreDeposits = async (e) => {

        if (activeButtonSearch) {

            e.preventDefault();

            dispatch(SetIsOpenModalSearchPreDeposits(true));
        }
    }

    const handleSavePreDeposits = async (e) => {

        if (activeButtonSave) {

            e.preventDefault();

            const newPreDeposits = {
                id: 0,
                fecha: fecha,
                cajero,
                cedula: cedula.toString(),
                depositante,
                idEmpresa: 0,
                numApertura,
                idDeposito: 0,
                monto,
                observaciones
            }

            dispatch(startSavePreDeposits(newPreDeposits));
        }
    }

    const handleEditPreDeposits = async (e) => {

        if (activeButtonSave) {

            e.preventDefault();

            const newPreDeposits = {
                id,
                fecha: fecha,
                cajero,
                cedula: cedula.toString(),
                depositante,
                idEmpresa: auth.idSurcursal,
                numApertura,
                idDeposito: null,
                monto,
                observaciones
            }

            dispatch(startEditPreDeposits(newPreDeposits));
        }
    }

    const handleCloseWindowPreDeposito = (e) => {

        if (startOpeningPreDeposito) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar los cambios en pre depósito?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanPreDeposits());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanPreDeposits());

        }

    }

    return (

        <>

            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    {(isEditPreDeposits) ?
                        <>
                            <button
                                className={
                                    activeButtonSave
                                        ? "btn btn-warning espacio"
                                        : "btn btn-warning espacio disabled"
                                }
                                onClick={handleEditPreDeposits}
                            >
                                Editar <TbEditCircle className="iconSizeBtn" />
                            </button>
                        </>
                        :
                        <>
                            <button
                                className={
                                    activeButtonSave
                                        ? "btn btn-success espacio"
                                        : "btn btn-success espacio disabled"
                                }
                                onClick={handleSavePreDeposits}
                            >
                                Registrar <MdNoteAdd className="iconSizeBtn" />
                            </button>
                        </>


                    }


                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSearch
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
                        onClick={handleSearchPreDeposits}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarPreDeposito"
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
                    // onClick={handleDisableDownPayment}
                    >
                        Anular <TbTrashXFilled className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindowPreDeposito}
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
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaPreDeposits)}

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

            <PreDepositsSearchModal />

        </>

    )
}
