import React, { useRef } from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { TbNotes } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle, MdCancel, MdDriveFileRenameOutline, MdViewModule } from 'react-icons/md';
import { RoleBodyTable } from './RoleBodyTable';

import { 
    CleanRoleActualRole,
    SetDescripcionRoleActualRole, 
    SetEditRole, 
    SetIdSeletedRole, 
    SetIsEditRoleRole, 
    SetNombreRoleActualRole, 
    startEditRole, 
    startSaveRole
} from '../../actions/RoleAction';

export const RoleBody = () => {

    const dispatch = useDispatch();
    const btnModulo = useRef(null);

    const {
        disableInputs,
        roleActual,
        roles,
        modulos,
        isEditRole,
        idRoleSeleted
    } = useSelector(state => state.role);

    const { 
        id,
        nombre, 
        descripcion,
        estado
    } = roleActual;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSaveRole = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            if (nombre === '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba el nombre y la descripcion para el nuevo rol.'
                });

                return;
            }

            if (modulos == undefined || modulos.length == 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Favor, ingresar los modulos del numero rol.'
                });

                return;
            }

            const newRole = {
                id: 0,
                nombre,
                descripcion,
                modulos,
                estado: true
            }

            dispatch( startSaveRole(newRole) );
        }

    }

    const handleEditRole = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            if (nombre === '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba el nombre y la descripcion para el nuevo rol.'
                });

                return;
            }

            if (modulos == undefined || modulos.length == 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Favor, ingresar los modulos del numero rol.'
                });

                return;
            }

            const editRole = {
                id: idRoleSeleted,
                data: {
                    id,
                    nombre,
                    descripcion,
                    modulos,
                    estado
                }
            }

            dispatch(startEditRole(editRole))

        }

    }

    const handleCancelEdit = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            // Se cambia el modo de edit
            dispatch(SetIsEditRoleRole(false));

            // Se reset el bancoActual
            dispatch(CleanRoleActualRole());

            dispatch(SetIdSeletedRole(0));
        }

    }

    const handleModulo = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            if( nombre != '' && nombre != null && nombre != undefined ) {
                btnModulo.current.click();
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba el nombre y la descripcion para el nuevo rol para asignar modulos'
                });
            }
        }

    }

    const columns = [
        {
            Header: "Descripción",
            accessor: "descripcion",
        },
        {
            Header: "Estado",
            accessor: "estado",
        },
        {
            Header: "Acciones",
            accessor: "accion",
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

                {/* <div className="col-md-3 mb-3">
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
                </div> */}

                <div className="col-md-5 mb-3">

                    <div className="row mb-2 text-center">
                        <hr />

                        <div className="col-md-3 mb-3">
                             <button
                                className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary espacio'}
                                onClick={handleModulo}
                            >
                                Modulos <MdViewModule className='iconSize' />
                            </button>
                            <button 
                                ref={btnModulo}
                                className='d-none'
                                data-bs-toggle="modal"
                                data-bs-target="#modalCrearModulo"
                            ></button>
                        </div>

                        {
                            (isEditRole)
                                ?
                                <div className="col-md-6 mb-3">
                                    <div className="row mb-2 text-center">

                                        <div className="col-md-6 mb-3">
                                            <button
                                                className={(disableInputs) ? 'btn btn-warning disabled' : 'btn btn-warning espacio'}
                                                onClick={handleEditRole}
                                            >
                                                Editar <FaEdit className='iconSize' />
                                            </button>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <button
                                                className={(disableInputs) ? 'btn btn-danger disabled' : 'btn btn-danger espacio'}
                                                onClick={handleCancelEdit}
                                            >
                                                Cancelar <MdCancel className='iconSize' />
                                            </button>
                                        </div>

                                    </div>                                    
                                </div>
                                :
                                <div className="col-md-6 mb-3">
                                    <button
                                        className={(disableInputs) ? 'btn btn-success disabled' : 'btn btn-success espacio'}
                                        onClick={handleSaveRole}
                                    >
                                        Agregar <MdAddCircle className='iconSize' />
                                    </button>
                                </div>
                        }                        

                    </div>
                    
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
