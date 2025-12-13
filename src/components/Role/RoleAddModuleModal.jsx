import Swal from 'sweetalert2';
import Modal from 'react-modal';

import { useSelector, useDispatch } from 'react-redux';

import { FaTabletScreenButton, FaUser } from 'react-icons/fa6';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

import { RoleBodyTable } from './RoleBodyTable';

export const RoleAddModuleModal = () => {

    const dispatch = useDispatch();

    const {
        isOpenModalAddProveedor,
        proveedorAdd,
        existProveedor
    } = useSelector(state => state.compras);

    const { auth } = useSelector(state => state.login);

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

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleCreateProveedor = async (e) => {

        // e.preventDefault();

        // const newProveedor = {
        //     nombre,
        //     cedula,
        //     telefono1,
        //     fax1,
        //     email,
        //     direccion,
        //     observaciones,
        //     contacto,
        //     telefonoCont,
        //     estado: true,
        //     fechaCreacion: moment(new Date()).format('DD/MM/YYYY'),
        //     idUsuarioCreacion: auth.username,
        //     cuentasBancariasProveedors: []
        // }

        // dispatch(startCreateProveedoresCompra(newProveedor));
    }

    const closeModal = (e) => {

        // e.preventDefault();

        // if (!existProveedor) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Proveedor Compras',
        //         text: 'Debe ingresar el proveedor para registrar la compra'
        //     });

        //     return;
        // }

        // // Cerrar el modal
        // dispatch(isOpenModalAddProveedorCompras(false));

        // //Clean el state de proveedores
        // dispatch(CleanProveedorAddCompras());

        // // Se setea el valor de existProveedor en false
        // dispatch(SetExistProveedorCompras(true));

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
                                            // value={nombre}
                                            // onChange={e => handleInputChangeWithDispatch(e, SetnombreProveedorAddCompras)}
                                        >
                                            <option value="" selected disabled hidden>
                                                {" "}
                                                Seleccione...{" "}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">

                                    <h5>Seleccione los permisos</h5>

                                    <div className="row mb-2 text-center">

                                        <div className="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="checkCrear" />
                                                <label class="form-check-label" for="checkCrear">
                                                    Crear
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="checkModificar" />
                                                <label class="form-check-label" for="checkModificar">
                                                    Modificar
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="checkBorrar" />
                                                <label class="form-check-label" for="checkBorrar">
                                                    Borrar
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="checkVer" />
                                                <label class="form-check-label" for="checkVer">
                                                    Ver
                                                </label>
                                            </div>
                                        </div> 

                                    </div>
                                    
                                </div>

                                <div className="col-md-2 mb-2">
                                    <hr />
                                    <button
                                        className='btn btn-success'
                                        // className={(disableInputs) ? 'btn btn-success disabled' : 'btn btn-success espacio'}
                                        // onClick={handleSaveBank}
                                    >
                                        Agregar <MdAddCircle className='iconSize' />
                                    </button>
                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <hr />
                                <div className="col-md-12 mb-3">
                                    <RoleBodyTable columns={columns} data={[]} />
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button 
                                className='btn btn-success'
                            >
                                Aceptar <IoIosAddCircle className="iconSize" />
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Cerrar <IoIosCloseCircle className="iconSize" />
                            </button>
                        </div>

                    </div>

                </div>
            </div >
        </>

    )
}
