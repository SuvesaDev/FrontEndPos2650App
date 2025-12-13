import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { TbNotes } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle, MdCancel, MdDriveFileRenameOutline } from 'react-icons/md';
import { RoleBodyTable } from './RoleBodyTable';

export const RoleBody = () => {

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

        // if (!disableInputs) {

        //     e.preventDefault();

        //     if (bancoActual === '') {

        //         Swal.fire({
        //             icon: 'warning',
        //             title: 'Advertencia',
        //             text: 'Escriba una descripción para el nuevo banco.'
        //         });

        //         return;
        //     }

        //     const newBank = {
        //         id: 0,
        //         banco: bancoActual,
        //         activo: true
        //     }

        //     dispatch(startSaveBank(newBank));
        // }

    }

    const handleEditBank = (e) => {

        // if (!disableInputs) {

        //     e.preventDefault();

        //     if (bancoActual === '') {

        //         Swal.fire({
        //             icon: 'warning',
        //             title: 'Advertencia',
        //             text: 'Escriba una descripción para el editar banco.'
        //         });

        //         return;
        //     }

        //     const editBank = {
        //         id: idSeletedBanco,
        //         banco: bancoActual,
        //         activo: true
        //     }

        //     dispatch(startEditBank(editBank));
        // }

    }

    const handleCancelEdit = (e) => {

        // if (!disableInputs) {

        //     e.preventDefault();

        //     // Se cambia el modo de edit
        //     dispatch(SetIsEditBank(false));

        //     // Se reset el bancoActual
        //     dispatch(SetBancoActualBank(''));

        //     // Se reset el idSeleccionado
        //     dispatch(SetIdSeletedBancoBank(0));
        // }

    }

    const columns = [
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Descripción",
            accessor: "banco",
        },
        {
            Header: "Modulos",
            accessor: "modulos",
        },
        {
            Header: "Estado",
            accessor: "estado",
        },
    ];

    return (
        <>
            <div className="row mb-2 text-center">

                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdDriveFileRenameOutline className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Nombre del Rol"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Descripcion</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdDriveFileRenameOutline className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Descripcion del Rol"
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <hr />
                    <button
                        className='btn btn-success'
                        // className={(disableInputs) ? 'btn btn-success disabled' : 'btn btn-success espacio'}
                        // onClick={handleSaveBank}
                        data-bs-toggle="modal"
                        data-bs-target="#modalCrearModulo"
                    >
                        Agregar <MdAddCircle className='iconSize' />
                    </button>
                    {/* {
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
                    } */}
                </div>
            </div>

            <div className="row mb-2 text-center">
                <hr />
                <div className="col-md-12 mb-3">
                    <RoleBodyTable columns={columns} data={[]} />
                </div>
            </div>

        </>

    )
}
