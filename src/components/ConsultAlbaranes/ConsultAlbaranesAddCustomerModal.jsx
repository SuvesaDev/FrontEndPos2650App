import { useDispatch, useSelector } from 'react-redux';
import {
    SetCedulaCustomerConsultAlbaranes,
    SetDireccionCustomerConsultAlbaranes,
    SetEmailCustomerConsultAlbaranes,
    SetIdTipoClienteCustomerConsultAlbaranes,
    SetNombreCustomerConsultAlbaranes,
    SetOpenModalAddCustomerConsultAlbaranes,
    SetTelefonoCustomerConsultAlbaranes,
    startSaveCustomerConsultAlbaranes
} from '../../actions/consultAlbaranesAction';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { FaIdCard, FaPhoneAlt, FaUser, FaUserAlt } from 'react-icons/fa';
import { FaEnvelope, FaListOl, FaLocationDot } from 'react-icons/fa6';

export const ConsultAlbaranesAddCustomerModal = () => {

    const dispatch = useDispatch();
    const { isOpenModalAddCustomer, clienteConsultAlbaranes } = useSelector(state => state.consultAlbaranes);
    const { auth } = useSelector(state => state.login);

    const {
        idTipoCliente,
        cedula,
        nombre,
        telefono,
        email,
        direccion
    } = clienteConsultAlbaranes;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSaveCustomer = async (e) => {

        e.preventDefault();

        const customer = {
            cedula,
            idTipoIdentificacion: idTipoCliente,
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
        }

        await dispatch(startSaveCustomerConsultAlbaranes(customer));
    }

    const closeModal = () => {
        dispatch(SetOpenModalAddCustomerConsultAlbaranes(false));
    }

    return (
        <>
            <div className="modal fade" id="modalCrearClienteGN" style={{ zIndex: "1052" }}>
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Agregar Cliente <FaUserAlt className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className='row mb-2 text-center'>
                                <div className="col-md-3 mb-3">
                                    <h5>Tipo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaListOl className="iconSize" />
                                        </span>
                                        <select
                                            className='form-select'
                                            name='idTipoCliente'
                                            value={idTipoCliente}
                                            onChange={e => handleInputChangeWithDispatch(e, SetIdTipoClienteCustomerConsultAlbaranes)}
                                        >
                                            <option value={0} selected disabled hidden> Seleccione... </option>
                                            <option value={2}>FISICA</option>
                                            <option value={3}>JURIDICA</option>
                                            <option value={4}>DIMEX</option>
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
                                            type="text"
                                            className="form-control"
                                            placeholder="Cédula del Cliente"
                                            name='cedula'
                                            value={cedula}
                                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaCustomerConsultAlbaranes)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del Cliente"
                                            name='nombre'
                                            value={nombre}
                                            onChange={e => handleInputChangeWithDispatch(e, SetNombreCustomerConsultAlbaranes)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Teléfono</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPhoneAlt className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Teléfono del Cliente"
                                            name='telefono'
                                            value={telefono}
                                            onChange={e => handleInputChangeWithDispatch(e, SetTelefonoCustomerConsultAlbaranes)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className="col-md-6 mb-3">
                                    <h5>E-Mail</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaEnvelope className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="E-Mail del Cliente"
                                            name='email'
                                            value={email}
                                            onChange={e => handleInputChangeWithDispatch(e, SetEmailCustomerConsultAlbaranes)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Dirección</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaLocationDot className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Dirección del Cliente"
                                            name='direccion'
                                            value={direccion}
                                            onChange={e => handleInputChangeWithDispatch(e, SetDireccionCustomerConsultAlbaranes)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type='button'
                                className="btn btn-success"
                                onClick={handleSaveCustomer}
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
                    </div>
                </div>
            </div>
        </>

    )
}