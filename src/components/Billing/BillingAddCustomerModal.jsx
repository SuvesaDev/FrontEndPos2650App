import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';

import {
    CloseModalAddCustomer,
    SetCedulaClienteFacturacionBilling,
    SetDireccionClienteFacturacionBilling,
    SetEmailClienteFacturacionBilling,
    SetIdTipoClienteClienteFacturacionBilling,
    SetNombreClienteFacturacionBilling,
    SetTelefonoClienteFacturacionBilling,
    startSaveCustomerFacturacion,
    startSearchCustomerFacturacion
} from '../../actions/billing';
import { FaEnvelope, FaIdCard, FaMapLocationDot, FaPhone, FaUser, FaUserCheck } from 'react-icons/fa6';
import { FaList, FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoAddCircle } from 'react-icons/io5';


Modal.setAppElement('#root');

export const BillingAddCustomerModal = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { auth } = useSelector(state => state.login);
    const { currentTab } = useSelector(state => state.tabs);
    const { billings } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const handleInputChangeWithDispatch = ({ target }, action) => {

        if (billings[numberScreen] === undefined) return;

        dispatch(action({ value: target.value, number: numberScreen }));
    };

    const handleSaveCustomer = async (e) => {

        if (billings[numberScreen] === undefined) return;

        e.preventDefault();

        const customer = {
            cedula: billings[numberScreen].clienteFacturacion.cedula,
            idTipoIdentificacion: billings[numberScreen].clienteFacturacion.idTipoCliente,
            nombre: billings[numberScreen].clienteFacturacion.nombre,
            telefono01: billings[numberScreen].clienteFacturacion.telefono,
            direccion: billings[numberScreen].clienteFacturacion.direccion,
            eMail: billings[numberScreen].clienteFacturacion.email,
            correoComprobante: billings[numberScreen].clienteFacturacion.email,
            codMonedaCredito: 1,
            idDistrito: 1,
            idProvincia: 1,
            idCanton: 1,
            idUsuarioCreacion: auth.username,
        }

        await dispatch(startSaveCustomerFacturacion(customer, numberScreen));
    }

    const closeModal = () => {

        if (billings[numberScreen] === undefined) return;

        dispatch(CloseModalAddCustomer({ number: numberScreen }));
    }

    return (

        <>
            <div className="modal fade" id="modalAgregarCliente">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Agregar Cliente <FaUserCheck className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <h5>Tipo Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaList className="iconSize" />
                                        </span>
                                        <select
                                            name='idTipoCliente'
                                            className='form-select'
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacion.idTipoCliente
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetIdTipoClienteClienteFacturacionBilling)}
                                        >
                                            <option value={2}>FISICA</option>
                                            <option value={3}>JURIDICA</option>
                                            <option value={4}>DIMEX</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            name='cedula'
                                            className="form-control"
                                            placeholder="Cédula del Cliente"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacion.cedula
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaClienteFacturacionBilling)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            name='nombre'
                                            className="form-control"
                                            placeholder="Nombre del Cliente"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacion.nombre
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetNombreClienteFacturacionBilling)}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-2">
                                <div className="col-md-6 mb-3">
                                    <h5>Teléfono</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPhone className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            name='telefono'
                                            className="form-control"
                                            placeholder="Teléfono del Cliente"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacion.telefono
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetTelefonoClienteFacturacionBilling)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Correo Electrónico</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaEnvelope className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            name='email'
                                            className="form-control"
                                            placeholder="Correo Electrónico del Cliente"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacion.email
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetEmailClienteFacturacionBilling)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-md-12 mb-3">
                                    <h5>Dirección</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMapLocationDot className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            name='direccion'
                                            className="form-control"
                                            placeholder="Dirección del Cliente"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacion.direccion
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetDireccionClienteFacturacionBilling)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type='button'
                                className='btn btn-success'
                                onClick={handleSaveCustomer}
                                data-bs-dismiss="modal"
                            >
                                Agregar <IoAddCircle className="iconSize" />
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
            </div>

        </>

    )
}