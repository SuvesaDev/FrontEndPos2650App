import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { FaRegSave, FaWindowClose } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { DeleteTab } from '../../actions/tabs';
import {
    CleanStateBancosBank,
    SetClaveInternaBank,
    SetVisiblePasswordBank,
    startSaveBank,
    startValidateClaveInternaBank
} from '../../actions/BankAction';
import { FaEye, FaEyeSlash, FaFloppyDisk, FaKey, FaUserCheck } from 'react-icons/fa6';

export const BankIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);

    const {
        activeButtonSave,
        claveInterna,
        visiblePassword,
        disableInputsUser,
        nameUser,
        bancoActual,
        disableInputs,
        isEditBanco,
        idSeletedBanco,
        startOpeningBank
    } = useSelector(state => state.bank);

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

            dispatch(startValidateClaveInternaBank(claveInterna));
        }

    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisiblePasswordBank(!visiblePassword));
        }
    }

    const handleSaveBank = (e) => {

        if (activeButtonSave && !disableInputs) {

            e.preventDefault();

            if (bancoActual === '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba una descripción para el nuevo banco.'
                });

                return;
            }

            const newBank = {
                id: 0,
                banco: bancoActual,
                activo: true
            }

            dispatch(startSaveBank(newBank));
        }

    }

    const handleEditBank = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            if (bancoActual === '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba una descripción para el editar banco.'
                });

                return;
            }

            const editBank = {
                id: idSeletedBanco,
                banco: bancoActual,
                activo: true
            }

            dispatch(startEditBank(editBank));
        }

    }

    const handleCloseWindowBank = (e) => {

        if (startOpeningBank) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea cancelar la ${(isEditBanco) ? 'edición' : 'creación'} de banco?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanStateBancosBank());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanStateBancosBank());

        }

    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={activeButtonSave ? 'btn btn-success espacio' : 'btn btn-success espacio disabled'}
                        onClick={(isEditBanco) ? handleEditBank : handleSaveBank}
                    >
                        Registrar <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindowBank}
                    >
                        {(startOpeningBank) ? 'Cancelar' : 'Cerrar'} <FaWindowClose className="iconSize" />
                    </button>
                </div>

                <div className="col-md-3 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Clave Interna"
                            type={(visiblePassword) ? 'text' : 'password'}
                            name="claveInterna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaBank)}
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

                <div className="col-md-3 mb-2 espacio">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de Usuario"
                            disabled={true}
                            value={nameUser}
                        />
                    </div>
                </div>
            </div>
        </>


    )
}
