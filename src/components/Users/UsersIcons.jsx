import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaWindowClose } from 'react-icons/fa';

import { DeleteTab } from '../../actions/tabs';
import {
    CleanUsers,
    SetActiveButtonNewUsers,
    SetActiveButtonSaveUsers,
    SetDisableInputsUsers,
    SetIsOpenModalSearchUsers,
    SetStartOpeningUsers,
    startActiveAndDisableUsers,
    startEditUsers,
    startGetAllPerfiles,
    startValidatePassword
} from '../../actions/UsersAction';

import { UsersSearchModal } from './UsersSearchModal';
import { BsFillPersonCheckFill } from 'react-icons/bs';

export const UsersIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);

    const {
        activeButtonNew,
        activeButtonSave,
        activeButtonSearch,
        activeButtonRemove,
        startOpening,
        isEditUser,
        isEquealsClave,
        showCostaPets,
        user
    } = useSelector(state => state.users);

    const {
        id,
        idUsuario,
        nombre,
        claveEntrada,
        claveInterna,
        perfil,
        iniciales,
        cambiarPrecio,
        porcPrecio,
        aplicarDesc,
        porcDesc,
        existNegativa,
        usuario,
        observaciones,
        email,
        maximoVentas,
        activo,
        isAdministradorCostaPets,
        isAgenteCostaPets
    } = user;

    const handleNewUser = (e) => {

        if (activeButtonNew) {
            
            e.preventDefault();

            dispatch(SetDisableInputsUsers(false));
            dispatch(SetActiveButtonSaveUsers(true));
            dispatch(SetActiveButtonNewUsers(false));
            dispatch(SetStartOpeningUsers(true));

            //Traer catalogos
            dispatch( startGetAllPerfiles() );
        }

    }

    const handleSearchUser = (e) => {

        if (activeButtonSearch) {

            e.preventDefault();

            dispatch(SetIsOpenModalSearchUsers(true));
        }

    }

    const handleSaveUser = (e) => {

        if (activeButtonSave) {

            if( isValidPassword() ) {

                e.preventDefault();

                const newUser = {
                    id: 0,
                    idUsuario: idUsuario,
                    nombre: nombre,
                    claveEntrada: claveEntrada,
                    claveInterna: claveInterna,
                    perfil: parseInt(perfil),
                    iniciales: iniciales,
                    cambiarPrecio: cambiarPrecio,
                    porcPrecio: porcPrecio,
                    aplicarDesc: aplicarDesc,
                    porcDesc: porcDesc,
                    existNegativa: existNegativa,
                    usuario: usuario,
                    observaciones: observaciones,
                    email: email,
                    activo: true,
                    cantidadPreventas: maximoVentas,
                    costaPets: showCostaPets,
                    agenteCostaPets: (showCostaPets) ? isAgenteCostaPets : null,
                    administrador: (showCostaPets) ? isAdministradorCostaPets : null,
                }

                dispatch(startValidatePassword(newUser));
            }
            
        }
    }

    const handleEditUser = (e) => {

        if (activeButtonSave) {

            if( isValidPassword() ) {

                e.preventDefault();

                const editUser = {
                    id: id,
                    idUsuario: idUsuario,
                    nombre: nombre,
                    claveEntrada: claveEntrada,
                    claveInterna: claveInterna,
                    perfil: perfil,
                    iniciales: iniciales,
                    cambiarPrecio: cambiarPrecio,
                    porcPrecio: porcPrecio,
                    aplicarDesc: aplicarDesc,
                    porcDesc: porcDesc,
                    existNegativa: existNegativa,
                    usuario: usuario,
                    observaciones: observaciones,
                    email: email,
                    activo: activo,
                    cantidadPreventas: maximoVentas,
                    costaPets: showCostaPets,
                    agenteCostaPets: (showCostaPets) ? isAgenteCostaPets : null,
                    administrador: (showCostaPets) ? isAdministradorCostaPets : null,
                }

                dispatch(startEditUsers(editUser.id, editUser));
            }            
        }
    }

    const handleDisableUser = (e) => {

        if (activeButtonRemove) {

            e.preventDefault();

            dispatch(startActiveAndDisableUsers(id, nombre, 1));
        }

    }

    const handleActiveUser = (e) => {

        if (activeButtonRemove) {

            e.preventDefault();

            dispatch(startActiveAndDisableUsers(id, nombre, 2));
        }

    }

    const handleCloseWindowUser = (e) => {

        if (startOpening) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la creacion de usuario?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(CleanUsers());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(CleanUsers());

        }

    }

    const isValidPassword = () => {

        if (!isEquealsClave) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'La clave de entrada y la clave interna deben ser iguales.',
            });

            return false;
        }

        const regexMayusculaMiniscula = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
        if (!regexMayusculaMiniscula.test(claveEntrada)) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'La clave externa debe tener minimo una mayúscula y una minúscula .',
            });

            return false;

        }

        const regexNumeros = /^(?=.*\d).+$/;
        if (!regexNumeros.test(claveEntrada)) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'La clave externa debe tener al menos un número.',
            });

            return false;

        }

        const regexCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (!regexCaracterEspecial.test(claveEntrada)) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'La clave externa debe tener un carácter especial (!?$#@...)',
            });

            return false;

        }

        if (claveEntrada.length < 8 ) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'La clave de entrada debe tener 8 o más caracteres.',
            });

            return false;
        }

        return true;

    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonNew) ? 'btn btn-success espacio' : 'btn btn-success espacio disabled'}
                        onClick={handleNewUser}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSearch) ? 'btn btn-primary espacio' : 'btn btn-primary espacio disabled'}
                        onClick={handleSearchUser}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarUsuario"
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={activeButtonSave ? 'btn btn-dark espacio' : 'btn btn-dark espacio disabled'}
                        onClick={(isEditUser) ? handleEditUser : handleSaveUser}
                    >
                        {(isEditUser) ? 'Modificar' : 'Registrar'} <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    {
                        (user.activo)
                            ?
                            <>
                                <button className={(activeButtonRemove) ? 'btn btn-danger espacio' : 'btn btn-danger espacio disabled'}
                                    onClick={handleDisableUser}> Anular
                                    <RiDeleteBin2Fill
                                        className='iconSize'
                                    />
                                </button>
                            </>

                            :
                            <>
                                <button className={(activeButtonRemove) ? 'btn btn-warning espacio' : 'btn btn-warning espacio disabled'}
                                    onClick={handleActiveUser}>
                                    Activar
                                    <BsFillPersonCheckFill
                                        className='iconSize'
                                    />
                                </button>

                            </>
                    }
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                        onClick={handleCloseWindowUser}
                    >
                        Cerrar <FaWindowClose className="iconSize" />
                    </button>
                </div>

            </div>
            <UsersSearchModal />
        </>

    )
}
