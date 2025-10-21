import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { FaEnvelope, FaIdCard, FaMapLocationDot, FaPhone, FaUser, FaUserCheck } from 'react-icons/fa6';
import { FaList } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoAddCircle } from 'react-icons/io5';

import { 
    CleanAddCustomerConsignment,
    SetcedulaAddConsignment,
    SetdireccionAddConsignment,
    SetemailAddConsignment,
    SetidTipoClienteAddConsignment, 
    SetnombreAddConsignment,
    SetOpenAddCustomerConsignment,
    SettelefonoAddConsignment,
    startSaveCustomerConsignment
} from '../../actions/ConsignmentAction';

Modal.setAppElement('#root');

export const ConsignmentAddCustomerModal = () => {

    const dispatch = useDispatch();

    const btnClose = useRef(null);

    const { auth } = useSelector(state => state.login);
    const { clienteFacturacion, openAddCustomerConsignment } = useSelector(state => state.consignment);
    const { 
        idTipoCliente,
        cedula,
        nombre,
        telefono,
        email,
        direccion
    } = clienteFacturacion;

    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSaveCustomer = async (e) => {

        e.preventDefault();

        const customer = {
            cedula,
            idTipoIdentificacion: parseInt(idTipoCliente),
            nombre,
            telefono01: telefono,
            direccion,
            eMail: email,
            correoComprobante: email,
            codMonedaCredito: 1,
            idDistrito: 1,
            idProvincia: 1,
            idCanton: 1,
            idUsuarioCreacion: auth.username,
            fechaCreacion: new Date().toISOString()
        }

        await dispatch(startSaveCustomerConsignment(customer, btnClose));
   
    }

    const handleCloseModal = (e) => {
        dispatch(CleanAddCustomerConsignment());
        dispatch(SetOpenAddCustomerConsignment(false));
    }

    return (

        <>
            <div 
                className={`modal fade ${openAddCustomerConsignment ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{ backgroundColor: openAddCustomerConsignment ? "rgba(0,0,0,0.5)" : "transparent" }}
            >
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

                                <div className="col-md-3 mb-3">
                                    <h5>Tipo Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaList className="iconSize" />
                                        </span>
                                        <select
                                            name='idTipoCliente'
                                            className='form-select'
                                            value={idTipoCliente}
                                            onChange={e => handleInputChangeWithDispatch(e, SetidTipoClienteAddConsignment)}
                                        >
                                            <option value={0} selected disabled hidden> Seleccione... </option>
                                            {
                                                (tiposIdentificacion != null && tiposIdentificacion.length > 0)
                                                    ?   tiposIdentificacion.map(tipoD => {
                                                            return <option key={tipoD.id} value={tipoD.id}> {tipoD.descripcion} </option>
                                                        })
                                                    :   <option value=''></option>
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            name='cedula'
                                            className="form-control"
                                            placeholder="Cédula del Cliente"
                                            value={cedula}
                                            onChange={e => handleInputChangeWithDispatch(e, SetcedulaAddConsignment)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
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
                                            value={nombre}
                                            onChange={e => handleInputChangeWithDispatch(e, SetnombreAddConsignment)}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
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
                                            value={telefono}
                                            onChange={e => handleInputChangeWithDispatch(e, SettelefonoAddConsignment)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-8 mb-3">
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
                                            value={email}
                                            onChange={e => handleInputChangeWithDispatch(e, SetemailAddConsignment)}
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
                                            value={direccion}
                                            onChange={e => handleInputChangeWithDispatch(e, SetdireccionAddConsignment)}
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
                                ref={btnClose}
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleCloseModal}
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