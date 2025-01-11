import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";

import { FaEnvelope, FaIdCard, FaSearch, FaUser } from 'react-icons/fa';

import {
    SetActualizadoProveedores,
    SetCedulaProveedores,
    SetContactoProveedores,
    SetCuentaContableProveedores,
    SetDescripcionCuentaContableProveedores,
    SetDireccionProveedores,
    SetEmailProveedores,
    SetFax1Proveedores,
    SetIdentificacionProveedores,
    SetInhabilitadoProveedores,
    SetNombreProveedores,
    SetObservacionesProveedores,
    SetTelefono1Proveedores,
    SetTelefonoContProveedores,
    startSearchProveedorHacienda
} from "../../actions/ProveedoresAction";
import { FaIdCardClip, FaLocationDot, FaPhone, FaPiggyBank } from 'react-icons/fa6';
import { MdContacts, MdPhoneCallback } from 'react-icons/md';
import { TbNotes } from 'react-icons/tb';

export const ProvidersForm = () => {

    const dispatch = useDispatch();
    const { proveedor, disableInputs } = useSelector(state => state.proveedores);
    const {
        identificacion,
        cedula,
        nombre,
        contacto,
        telefonoCont,
        observaciones,
        telefono1,
        fax1,
        email,
        direccion,
        cuentaContable,
        descripcionCuentaContable,
        actualizado,
        inhabilitado
    } = proveedor;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    const handleSearchClientHacienda = (e) => {

        if (!disableInputs) {

            e.preventDefault();

            if (cedula.length >= 9) {

                dispatch(startSearchProveedorHacienda(cedula));

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Ingrese una cédula valida para buscar.',
                });
            }
        }
    };

    const handleSearchClientHaciendaOpcional = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (!disableInputs) {

                if (cedula.length >= 9) {

                    dispatch(startSearchProveedorHacienda(cedula));

                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'Ingrese una cédula valida para buscar.',
                    });
                }
            }
        }
    };

    return (
        <>
            <div className='row mb-3 text-center'>
                <div className="col-md-2 mb-3">
                    <h5>Identificación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Identificación del Proveedor"
                            name='identificacion'
                            disabled={true}
                            value={identificacion}
                            onChange={e => handleInputChangeWithDispatch(e, SetIdentificacionProveedores)}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Nombre del Proveedor"
                            type="text"
                            name='nombre'
                            disabled={disableInputs}
                            value={nombre}
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreProveedores)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Teléfono(s)</h5>
                    <div className='inline-container'>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaPhone className="iconSize" />
                            </span>
                            <input
                                className="form-control"
                                placeholder="Teléfonos del Proveedor"
                                name='telefono1'
                                type="text"
                                disabled={disableInputs}
                                value={telefono1}
                                onChange={e => handleInputChangeWithDispatch(e, SetTelefono1Proveedores)}
                            />
                        </div>

                        <div className="input-group espacio">
                            <span className="input-group-text">
                                <MdPhoneCallback className="iconSize" />
                            </span>
                            <input
                                className="form-control"
                                placeholder="Fax(S) del Proveedor"
                                type="text"
                                name='fax1'
                                disabled={disableInputs}
                                value={fax1}
                                onChange={e => handleInputChangeWithDispatch(e, SetFax1Proveedores)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className='inline-containerCenter'>
                        <h5>Cédula</h5>
                        <h5>Teléfono</h5>
                    </div>
                    <div className='inline-container'>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaIdCardClip className="iconSize" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cédula del Proveedor"
                                name='cedula'
                                disabled={disableInputs}
                                value={cedula}
                                onKeyDown={handleSearchClientHaciendaOpcional}
                                onChange={e => handleInputChangeWithDispatch(e, SetCedulaProveedores)}
                            />
                            <button
                                className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                                type="button"
                                onClick={handleSearchClientHacienda}
                            >
                                <FaSearch className="iconSize" />
                            </button>
                        </div>

                        <div className="input-group espacio">
                            <span className="input-group-text">
                                <FaPhone className="iconSize" />
                            </span>
                            <input
                                className="form-control"
                                placeholder="Teléfono del Proveedor"
                                type="text"
                                name='telefonoCont'
                                disabled={disableInputs}
                                value={telefonoCont}
                                onChange={e => handleInputChangeWithDispatch(e, SetTelefonoContProveedores)}
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className='row mb-3 text-center'>
                <div className="col-md-3 mb-3">
                    <h5>E-Mail</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaEnvelope className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="E-Mail del Proveedor"
                            type="text"
                            name='email'
                            disabled={disableInputs}
                            value={email}
                            onChange={e => handleInputChangeWithDispatch(e, SetEmailProveedores)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
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
                            disabled={disableInputs}
                            value={direccion}
                            onChange={e => handleInputChangeWithDispatch(e, SetDireccionProveedores)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Contacto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <MdContacts className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Contacto del Proveedor"
                            type="text"
                            name='contacto'
                            disabled={disableInputs}
                            value={contacto}
                            onChange={e => handleInputChangeWithDispatch(e, SetContactoProveedores)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Observación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Observaciones del Proveedor"
                            type="text"
                            name='observaciones'
                            disabled={disableInputs}
                            value={observaciones}
                            onChange={e => handleInputChangeWithDispatch(e, SetObservacionesProveedores)}
                        />
                    </div>
                </div>
            </div>

            <div className='row mb-3 text-center'>

                <div className="col-md-6 mb-3">
                    <h5>Cuenta Contable</h5>
                    <div className='inline-container'>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaPiggyBank className="iconSize" />
                            </span>
                            <input
                                className="form-control"
                                placeholder="Cuenta Contable 1"
                                type="text"
                                name='cuentaContable'
                                disabled={disableInputs}
                                value={cuentaContable}
                                onChange={e => handleInputChangeWithDispatch(e, SetCuentaContableProveedores)}
                            />
                        </div>

                        <div className="input-group espacio">
                            <span className="input-group-text">
                                <FaPiggyBank className="iconSize" />
                            </span>
                            <input
                                className="form-control"
                                placeholder="Cuenta Contable 2"
                                type="text"
                                name='cuenta2Providers'
                                disabled={disableInputs}
                                value={descripcionCuentaContable}
                                onChange={e => handleInputChangeWithDispatch(e, SetDescripcionCuentaContableProveedores)}
                            />
                        </div>

                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            id="checkActualizado"
                            type="checkbox"
                            name="actualizado"
                            disabled={disableInputs}
                            checked={actualizado}
                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetActualizadoProveedores)}
                        />
                        <h5 className="form-check-label" for="checkActualizado">Actualizado</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            id="checkInhabilitar"
                            type="checkbox"
                            name="inhabilitado"
                            disabled={disableInputs}
                            checked={inhabilitado}
                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetInhabilitadoProveedores)}
                        />
                        <h5 className="form-check-label" for="checkInhabilitar">Inhabilitar</h5>
                    </div>
                    <hr />
                </div>
            </div>
        </>

    )
}
