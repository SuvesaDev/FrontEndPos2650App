import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbTrashXFilled } from 'react-icons/tb';
import { PiKeyFill } from 'react-icons/pi';
import { FaEye, FaEyeSlash, FaWindowClose } from 'react-icons/fa';

import { DeleteTab } from '../../actions/tabs';

import {
    CleanGenerateDeposits,
    SetClaveInternaGenerateDeposits,
    SetVisiblePasswordGenerateDeposits,
    startSaveGenerateDeposits,
    startValidateClaveInternaGenerateDeposits
} from '../../actions/GenerateDepositsAction';

export const GenerateDepositsIcons = () => {

    const dispatch = useDispatch();

    const {
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        startOpeningDeposito,
        deposito
    } = useSelector(state => state.generateDeposits);

    const { currentTab } = useSelector(state => state.tabs);

    const {
        id,
        numeroDeposito,
        fecha,
        idCuenta,
        montoDeposito,
        montoEnLetras,
        idEmpresa,
        preDepositos
    } = deposito;

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

            dispatch(startValidateClaveInternaGenerateDeposits(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordGenerateDeposits(!visiblePassword));
        }

    }

    const handleSaveGenerateDeposits = async (e) => {

        if (activeButtonSave) {

            e.preventDefault();

            const newDeposits = {
                id,
                numeroDeposito,
                fecha,
                idCuenta,
                montoDeposito,
                montoEnLetras,
                idEmpresa,
                preDepositos
            }

            dispatch(startSaveGenerateDeposits(newDeposits));
        }
    }

    const handleCloseWindowDownPayment = (e) => {

        if (startOpeningDeposito) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar los cambios en generar depósitos?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanGenerateDeposits());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanGenerateDeposits());

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
                        onClick={handleSaveGenerateDeposits}
                    >
                        Registrar <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSearch
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
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
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaGenerateDeposits)}
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
        </>

    )
}
