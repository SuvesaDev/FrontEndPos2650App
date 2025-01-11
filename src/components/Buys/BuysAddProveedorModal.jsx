import Swal from 'sweetalert2';
import Modal from 'react-modal';

import { customStyles } from '../../helpers/styleModal';
import { useSelector, useDispatch } from 'react-redux';

import {
    CleanProveedorAddCompras,
    SetExistProveedorCompras,
    SetcedulaProveedorAddCompras,
    SetcontactoProveedorAddCompras,
    SetdireccionProveedorAddCompras,
    SetemailProveedorAddCompras,
    Setfax1ProveedorAddCompras,
    SetnombreProveedorAddCompras,
    SetobservacionesProveedorAddCompras,
    Settelefono1ProveedorAddCompras,
    SettelefonoContProveedorAddCompras,
    isOpenModalAddProveedorCompras,
    startCreateProveedoresCompra
} from '../../actions/ComprasAction';
import moment from 'moment';
import { FaBuildingUn, FaIdCard, FaLocationDot, FaPhone, FaTruckFast } from 'react-icons/fa6';
import { IoIosAddCircle, IoIosCloseCircle, IoMdContact } from 'react-icons/io';
import { FaEnvelope, FaFax, FaPhoneAlt } from 'react-icons/fa';
import { TbNotes } from "react-icons/tb";

export const BuysAddProveedorModal = () => {

    const dispatch = useDispatch();

    const {
        isOpenModalAddProveedor,
        proveedorAdd,
        existProveedor
    } = useSelector(state => state.compras);

    const { auth } = useSelector(state => state.login);

    const {
        nombre,
        cedula,
        telefono1,
        fax1,
        email,
        direccion,
        observaciones,
        contacto,
        telefonoCont
    } = proveedorAdd;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleCreateProveedor = async (e) => {

        e.preventDefault();

        const newProveedor = {
            nombre,
            cedula,
            telefono1,
            fax1,
            email,
            direccion,
            observaciones,
            contacto,
            telefonoCont,
            estado: true,
            fechaCreacion: moment(new Date()),
            idUsuarioCreacion: auth.username,
            cuentasBancariasProveedors: []
        }

        dispatch(startCreateProveedoresCompra(newProveedor));
    }

    const closeModal = (e) => {

        e.preventDefault();

        if (!existProveedor) {
            Swal.fire({
                icon: 'warning',
                title: 'Proveedor Compras',
                text: 'Debe ingresar el proveedor para registrar la compra'
            });

            return;
        }

        // Cerrar el modal
        dispatch(isOpenModalAddProveedorCompras(false));

        //Clean el state de proveedores
        dispatch(CleanProveedorAddCompras());

        // Se setea el valor de existProveedor en false
        dispatch(SetExistProveedorCompras(true));

    }

    return (

        <>
            <div className="modal fade" id="modalCrearProveedor">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleCreateProveedor}>
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Crear Nuevo Proveedor <FaTruckFast className="iconSizeBtn" />
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
                                        <h5>Identificación</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaIdCard className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Identificación del Proveedor"
                                                type="text"
                                                name='identificacion'
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <h5>Nombre</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaBuildingUn className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Nombre del Proveedor"
                                                type="text"
                                                name='nombre'
                                                value={nombre}
                                                onChange={e => handleInputChangeWithDispatch(e, SetnombreProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <h5>Cédula</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaIdCard className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Cédula del Proveedor"
                                                type="text"
                                                name='cedula'
                                                value={cedula}
                                                onChange={e => handleInputChangeWithDispatch(e, SetcedulaProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <h5>Teléfono(s)</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaPhone className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Teléfono(s) del Proveedor"
                                                name='telefono1'
                                                type="text"
                                                value={telefono1}
                                                onChange={e => handleInputChangeWithDispatch(e, Settelefono1ProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2 text-center">
                                    <div className="col-md-3 mb-2">
                                        <h5>Fax(s)</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaFax className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Fax(s) del Proveedor"
                                                type='text'
                                                name='fax1'
                                                value={fax1}
                                                onChange={e => handleInputChangeWithDispatch(e, Setfax1ProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <h5>E-Mail</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaEnvelope className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="E-Mail del Proveedor"
                                                type='mail'
                                                name='email'
                                                value={email}
                                                onChange={e => handleInputChangeWithDispatch(e, SetemailProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>


                                    <div className="col-md-3 mb-2">
                                        <h5>Contacto</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <IoMdContact className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Contacto del Proveedor"
                                                type='text'
                                                name='contacto'
                                                value={contacto}
                                                onChange={e => handleInputChangeWithDispatch(e, SetcontactoProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <h5>Teléfono</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaPhoneAlt className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Contacto del Proveedor"
                                                type="text"
                                                name='telefonoCont'
                                                value={telefonoCont}
                                                onChange={e => handleInputChangeWithDispatch(e, SettelefonoContProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>

                                </div>


                                <div className="row mb-2 text-center">
                                    <div className="col-md-6 mb-2">
                                        <h5>Dirección</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaLocationDot className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Dirección del Proveedor"
                                                type="text"
                                                name='direccion'
                                                value={direccion}
                                                onChange={e => handleInputChangeWithDispatch(e, SetdireccionProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <h5>Observación</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <TbNotes className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Anotaciones Extra"
                                                type="text"
                                                name='observaciones'
                                                value={observaciones}
                                                onChange={e => handleInputChangeWithDispatch(e, SetobservacionesProveedorAddCompras)}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className='btn btn-success' type='submit'
                                >
                                    Agregar <IoIosAddCircle className="iconSize" />
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                >
                                    Cerrar <IoIosCloseCircle className="iconSize" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>

    )
}
