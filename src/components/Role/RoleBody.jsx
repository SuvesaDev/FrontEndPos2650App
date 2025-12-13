import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { TbNotes } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle, MdCancel, MdDriveFileRenameOutline, MdViewModule } from 'react-icons/md';
import { RoleBodyTable } from './RoleBodyTable';

import { 
    SetDescripcionRoleActualRole, 
    SetNombreRoleActualRole, 
    startSaveRole
} from '../../actions/RoleAction';

export const RoleBody = () => {

    const dispatch = useDispatch();

    const {
        disableInputs,
        roleActual,
        roles
    } = useSelector(state => state.role);

    const { nombre, descripcion } = roleActual;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSaveRole = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            if (nombre === '' || descripcion === '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba el nombre y la descripcion para el nuevo rol.'
                });

                return;
            }

            const newRole = {
                id: 0,
                nombre,
                descripcion,
                modulos: [],
                estado: true
            }

            dispatch( startSaveRole(newRole) );
        }

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
            accessor: "descripcion",
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
                            disabled={disableInputs}
                            className='form-control'
                            placeholder="Nombre del Rol"
                            value={nombre}
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreRoleActualRole)}
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
                            disabled={disableInputs}
                            className='form-control'
                            placeholder="Descripcion del Rol"
                            value={descripcion}
                            onChange={e => handleInputChangeWithDispatch(e, SetDescripcionRoleActualRole)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">

                    <div className="row mb-2 text-center">
                        <hr />

                        <div className="col-md-6 mb-3">
                             <button
                                className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary espacio'}
                                data-bs-toggle="modal"
                                data-bs-target="#modalCrearModulo"
                            >
                                Modulos <MdViewModule className='iconSize' />
                            </button>
                        </div>

                        <div className="col-md-6 mb-3">
                             <button
                                className={(disableInputs) ? 'btn btn-success disabled' : 'btn btn-success espacio'}
                                onClick={handleSaveRole}
                            >
                                Agregar <MdAddCircle className='iconSize' />
                            </button>
                        </div>

                    </div>
                    
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
                    <RoleBodyTable columns={columns} data={roles} />
                </div>
            </div>

        </>

    )
}
