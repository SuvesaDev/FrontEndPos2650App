import { useRef } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

import { useSelector, useDispatch } from 'react-redux';

import { FaTabletScreenButton, FaUser } from 'react-icons/fa6';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { MdAddCircle, MdCancel } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

import { RoleAddModuleModalTable } from './RoleAddModuleModalTable';

import { 
    CleanModuloActualRole,
    CleanModulosModuloActualRole,
    SetAddModulosRole,
    SetBorrarModuloActualRole,
    SetCrearModuloActualRole, 
    SetEditModulosRole, 
    SetIdModuloSeletedRole, 
    SetIdPantallaModuloActualRole, 
    SetIsEditModuloRole, 
    SetModificarModuloActualRole,
    SetNombrePantallaModuloActualRole,
    SetVerModuloActualRole
} from '../../actions/RoleAction';

export const RoleAddModuleModal = () => {

    const dispatch = useDispatch();
    const btnCerrar = useRef(null);

    const {
        moduloActual,
        modulos,
        pantallasWeb,
        isEditModulo,
        idModuloSeleted
    } = useSelector(state => state.role);

    const { 
        idPantalla,
        nombrePantalla,
        crear,
        modificar,
        borrar,
        ver
    } = moduloActual;

    const columns = [
        {
            Header: "Nombre Pantalla",
            accessor: "nombrePantalla",
        },
        {
            Header: "Crear",
            accessor: "crear",
        },
        {
            Header: "Modificar",
            accessor: "modificar",
        },
        {
            Header: "Borrar",
            accessor: "borrar",
        },
        {
            Header: "Ver",
            accessor: "ver",
        },
        {
            Header: "Acciones",
            accessor: "accion",
        },
    ];

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    const changeNombrePantalla = ({ target }) => {

        if(target.value != null || target.value != undefined) {

            const nombre = pantallasWeb.find(pantalla => pantalla.id == target.value).nombre;

            dispatch(SetIdPantallaModuloActualRole(target.value));
            dispatch(SetNombrePantallaModuloActualRole(nombre));

        }

    };

    const handleAddModulo = async (e) => {

        e.preventDefault();

        const pantalla = modulos.find(mod => mod.idPantalla == idPantalla);

        if( pantalla == null || pantalla == undefined) {
            const newModulo = {
                idPantalla,
                nombrePantalla,
                crear,
                modificar,
                borrar,
                ver
            }

            dispatch(SetAddModulosRole(newModulo));
            dispatch(CleanModuloActualRole());
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: `La pantalla ${nombrePantalla} ya esta registrada.`
            });
        }
        
    }

    const handleEditModulo = async (e) => {

        e.preventDefault();

        const editModulo = {
            id: idModuloSeleted,
            data: {
                idPantalla,
                nombrePantalla,
                crear,
                modificar,
                borrar,
                ver
            }
        }

        dispatch(SetEditModulosRole(editModulo));
        dispatch(CleanModuloActualRole());
        dispatch(SetIsEditModuloRole(false));
    }

    const handleCancelEdit = (e) => {
    
        e.preventDefault();

        // Se cambia el modo de edit
        dispatch(SetIsEditModuloRole(false));

        dispatch(CleanModuloActualRole());

        // Se reset el idSeleccionado
        dispatch(SetIdModuloSeletedRole(0));
    
    }

    const closeModal = (e) => {

        e.preventDefault();

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea cancelar esta configuracion?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Mantener',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
            if (result.isDenied) {

                // Se cambia el modo de edit
                dispatch(SetIsEditModuloRole(false));

                dispatch(CleanModuloActualRole());

                // Se reset el idSeleccionado
                dispatch(SetIdModuloSeletedRole(0));

                dispatch(CleanModulosModuloActualRole());

                btnCerrar.current.click();
            }
        });
    }

    const handleSaveModulo = (e) => {
    
        e.preventDefault();

        Swal.fire({
            icon: 'success',
            title: `Modulos agregados correctamente`,
            showConfirmButton: false,
            timer: 1500
        });

        // Se cambia el modo de edit
        dispatch(SetIsEditModuloRole(false));

        dispatch(CleanModuloActualRole());

        // Se reset el idSeleccionado
        dispatch(SetIdModuloSeletedRole(0));

        btnCerrar.current.click();
    
    }

    return (

        <>
            <div className="modal fade" id="modalCrearModulo">

                <div className="modal-dialog modal-xl modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Crear Modulo <FaUser className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="row mb-2 text-center">

                                <div className="col-md-3 mb-2">
                                    <h5>Nombre Pantalla</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaTabletScreenButton className="iconSize" />
                                        </span>
                                        <select
                                            type="text"
                                            name="codPresentacion"
                                            className="form-select"
                                            value={idPantalla}
                                            onChange={e => changeNombrePantalla(e)}
                                        >
                                            <option value={0} selected disabled hidden>
                                                {" "}
                                                Seleccione...{" "}
                                            </option>
                                            { 
                                                pantallasWeb != null ? (
                                                    pantallasWeb.length === 0 ? (
                                                    <option value="">No se cargaron las pantallas</option>
                                                    ) : (
                                                        pantallasWeb.map((pantalla) => {
                                                            return (
                                                                <option key={pantalla.id} value={pantalla.id}>
                                                                    {" "}
                                                                    {pantalla.nombre}{" "}
                                                                </option>
                                                            );
                                                        })
                                                    )
                                                ) : (
                                                    <option value="">No se cargaron las pantallas</option>
                                                )}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">

                                    <h5>Seleccione los permisos</h5>

                                    <div className="row mb-2 text-center">

                                        <div className="col-md-6">
                                            <div class="form-check">
                                                <input 
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                    checked={crear} 
                                                    id="checkCrear" 
                                                    onChange={(e) =>
                                                        handleInputChangeCheckBoxWithDispatch(e, SetCrearModuloActualRole)
                                                    }
                                                />
                                                <label class="form-check-label" for="checkCrear">
                                                    Crear
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input 
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                    checked={modificar} 
                                                    id="checkModificar"
                                                    onChange={(e) =>
                                                        handleInputChangeCheckBoxWithDispatch(e, SetModificarModuloActualRole)
                                                    }
                                                />
                                                <label class="form-check-label" for="checkModificar">
                                                    Modificar
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div class="form-check">
                                                <input 
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                    checked={borrar} 
                                                    id="checkBorrar" 
                                                    onChange={(e) =>
                                                        handleInputChangeCheckBoxWithDispatch(e, SetBorrarModuloActualRole)
                                                    }
                                                />
                                                <label class="form-check-label" for="checkBorrar">
                                                    Borrar
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input 
                                                    class="form-check-input" 
                                                    type="checkbox" 
                                                    checked={ver} 
                                                    id="checkVer" 
                                                    onChange={(e) =>
                                                        handleInputChangeCheckBoxWithDispatch(e, SetVerModuloActualRole)
                                                    }
                                                />
                                                <label class="form-check-label" for="checkVer">
                                                    Ver
                                                </label>
                                            </div>
                                        </div> 

                                    </div>
                                    
                                </div>

                                <div className="col-md-3 mb-2">
                                    <hr />
                                    {
                                        (isEditModulo)
                                            ?
                                            <>
                                                <button
                                                    className='btn btn-warning espacio'
                                                    onClick={handleEditModulo}
                                                >
                                                    Editar <FaEdit className='iconSize' />
                                                </button>

                                                <button
                                                    className='btn btn-danger espacio'
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancelar <MdCancel className='iconSize' />
                                                </button>
                                            </>
                                            :
                                            <button
                                                className='btn btn-success'
                                                onClick={handleAddModulo}
                                            >
                                                Agregar <MdAddCircle className='iconSize' />
                                            </button>
                                    }
                                    
                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <hr />
                                <div className="col-md-12 mb-3">
                                    <RoleAddModuleModalTable columns={columns} data={modulos} />
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button 
                                className='btn btn-success'
                                onClick={handleSaveModulo}
                            >
                                Aceptar <IoIosAddCircle className="iconSize" />
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={closeModal}
                            >
                                Cerrar <IoIosCloseCircle className="iconSize" />
                            </button>
                            <button 
                                data-bs-dismiss="modal"
                                ref={btnCerrar}
                            ></button>
                        </div>

                    </div>

                </div>
            </div >
        </>

    )
}
