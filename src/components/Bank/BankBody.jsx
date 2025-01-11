import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { BankBodyTable } from './BankBodyTable';

import {
    SetBancoActualBank,
    SetIdSeletedBancoBank,
    SetIsEditBank,
    startEditBank,
    startSaveBank
} from '../../actions/BankAction';
import { TbNotes } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle, MdCancel } from 'react-icons/md';

export const BankBody = () => {

    const dispatch = useDispatch();

    const {
        disableInputs,
        bancos,
        bancoActual,
        isEditBanco,
        idSeletedBanco
    } = useSelector(state => state.bank);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSaveBank = (e) => {

        if (!disableInputs) {

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

    const handleCancelEdit = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            // Se cambia el modo de edit
            dispatch(SetIsEditBank(false));

            // Se reset el bancoActual
            dispatch(SetBancoActualBank(''));

            // Se reset el idSeleccionado
            dispatch(SetIdSeletedBancoBank(0));
        }

    }

    const columns = [
        {
            Header: "Número",
            accessor: "id",
        },
        {
            Header: "Descripción",
            accessor: "banco",
        },
        {
            Header: "Opciones",
            accessor: "activo",
        },
    ];

    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-8 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="3"
                            name='descripcion'
                            disabled={disableInputs}
                            value={bancoActual}
                            onChange={e => handleInputChangeWithDispatch(e, SetBancoActualBank)}
                        ></textarea>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <hr />
                    {
                        (isEditBanco)
                            ?
                            <>
                                <button
                                    className={(disableInputs) ? 'btn btn-warning disabled' : 'btn btn-warning espacio'}
                                    onClick={handleEditBank}
                                >
                                    Editar <FaEdit className='iconSize' />
                                </button>

                                <button
                                    className={(disableInputs) ? 'btn btn-danger disabled' : 'btn btn-danger espacio'}
                                    onClick={handleCancelEdit}
                                >
                                    Cancelar <MdCancel className='iconSize' />
                                </button>
                            </>

                            :
                            <button
                                className={(disableInputs) ? 'btn btn-success disabled' : 'btn btn-success espacio'}
                                onClick={handleSaveBank}
                            >
                                Agregar <MdAddCircle className='iconSize' />
                            </button>
                    }
                </div>
            </div>

            <div className="row mb-2 text-center">
                <hr />
                <div className="col-md-12 mb-3">
                    <BankBodyTable columns={columns} data={bancos} />
                </div>
            </div>

        </>

    )
}
