import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';
import {
    CloseModalEditCustomer,
    SetActualizadoCustomerEditBilling,
    SetAgenteCustomerEditBilling,
    SetCorreocuentasCustomerEditBilling,
    SetCorreoFacturacionCustomerEditBilling,
    SetCorreoReciboCustomerEditBilling,
    SetDescuentoEspcialCustomerEditBilling,
    SetDireccionCustomerEditBilling,
    SetEnviaReciboCustomerEditBilling,
    SetFallecidoCustomerEditBilling,
    SetIdTipoClienteCustomerEditBilling,
    SetInactivoCustomerEditBilling,
    SetMagCustomerEditBilling,
    SetSinAgenteCustomerEditBilling,
    SetTelefonoCustomerEditBilling,
    SetTipoPrecioCustomerEditBilling,
    startEditCustomerFacturacion
} from '../../actions/billing';
import { FaMapLocationDot, FaPersonCircleQuestion, FaPhone, FaUserPen } from 'react-icons/fa6';
import { TbEditCircle, TbMailDollar } from 'react-icons/tb';
import { MdAttachEmail, MdMarkEmailUnread } from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs';
import { IoIosCloseCircle } from 'react-icons/io';

Modal.setAppElement('#root');

export const BillingEditCustomerModal = () => {
    // TODO: CREAR IMPLEMENTACION DE AGENTE
    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { agentesBilling } = useSelector(state => state.agenteVentas);
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

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        if (billings[numberScreen] === undefined) return;
        dispatch(action({ value: target.checked, number: numberScreen }));
    };

    const handleEditCustomer = (e) => {

        if (billings[numberScreen] === undefined) return;

        e.preventDefault();

        const customerEdit = {
            identificacion: billings[numberScreen].clienteFacturacionEdit.identificacion,
            idTipoIdentificacion: billings[numberScreen].clienteFacturacionEdit.idTipoCliente,
            telefono01: billings[numberScreen].clienteFacturacionEdit.telefono,
            direccion: billings[numberScreen].clienteFacturacionEdit.direccion,
            eMail: billings[numberScreen].clienteFacturacionEdit.correocuentas,
            correoComprobante: billings[numberScreen].clienteFacturacionEdit.correoFacturacion,
            agente: billings[numberScreen].clienteFacturacionEdit.agente,
            actualizado: billings[numberScreen].clienteFacturacionEdit.actualizado,
            fallecido: billings[numberScreen].clienteFacturacionEdit.fallecido,
            enviarRecibo: billings[numberScreen].clienteFacturacionEdit.enviaRecibo,
            correoRecibo: billings[numberScreen].clienteFacturacionEdit.correoRecibo,
            tipoprecio: billings[numberScreen].clienteFacturacionEdit.tipoPrecio,
            descuentoEspecial: billings[numberScreen].clienteFacturacionEdit.descuentoEspcial,
            anulado: billings[numberScreen].clienteFacturacionEdit.inactivo,
            mag: billings[numberScreen].clienteFacturacionEdit.mag,
        }

        dispatch(startEditCustomerFacturacion(customerEdit, billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen));
    };

    const closeModal = () => {
        if (billings[numberScreen] === undefined) return;
        dispatch(CloseModalEditCustomer({ number: numberScreen }));
    }

    return (


        <>
            <div className="modal fade" id="modalEditarCliente">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Editar Cliente <FaUserPen className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-md-4 mb-3">
                                    <h5>Correo Cuentas por Cobrar</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbMailDollar className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            name="correocuentas"
                                            className="form-control"
                                            placeholder="Correo de Cobros"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.correocuentas
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetCorreocuentasCustomerEditBilling)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Correo Facturacion Electronica</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <MdAttachEmail className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Correo de Facturación"
                                            name="correoFacturacion"
                                            className="form-control"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.correoFacturacion
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetCorreoFacturacionCustomerEditBilling)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            id="checkEnviaCorreo"
                                            type="checkbox"
                                            name="enviaCorreo"
                                            class="form-check-input checkP"

                                            checked={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.enviaRecibo
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetEnviaReciboCustomerEditBilling)}


                                        />
                                        <h5 className="form-check-label" for="checkEnviaCorreo">¿Enviar Recibo al Correo?</h5>
                                    </div>


                                    {
                                        (billings[numberScreen] !== undefined)
                                            ? (billings[numberScreen].clienteFacturacionEdit.enviaRecibo)
                                                ? <div className="input-group">
                                                    <span className="input-group-text">
                                                        <MdMarkEmailUnread className="iconSize" />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Correo de Recibos"
                                                        name="correoRecibo"
                                                        value={
                                                            (billings[numberScreen] !== undefined)
                                                                ? billings[numberScreen].clienteFacturacionEdit.correoRecibo
                                                                : ''
                                                        }
                                                        onChange={e => handleInputChangeWithDispatch(e, SetCorreoReciboCustomerEditBilling)}
                                                    />
                                                </div>
                                                : <div></div>
                                            : <div></div>
                                    }
                                </div>
                            </div>

                            <div className="row mb-3">

                                <div className="col-md-4 mb-3">
                                    <h5>Tipo Cliente</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPersonCircleQuestion className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                            name="idTipoCliente"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.idTipoCliente
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetIdTipoClienteCustomerEditBilling)}
                                        >
                                            <option value="0">Seleccione....</option>
                                            <option value="2">Fisico</option>
                                            <option value="3">Juridico</option>
                                            <option value="4">DIMEX</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="inline-container">
                                        <h5>Agente Asignado</h5>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                class="form-check-input checkP"

                                                id="checkSinAgente"
                                                name="sinAgente"
                                                checked={
                                                    (billings[numberScreen] !== undefined)
                                                        ? billings[numberScreen].clienteFacturacionEdit.sinAgente
                                                        : false
                                                }
                                                onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetSinAgenteCustomerEditBilling)}
                                            />
                                            <h5 className="form-check-label" for="checkSinAgente">Sin Agente</h5>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsPersonLinesFill className="iconSize" />
                                        </span>
                                        <select
                                            name="agente"
                                            className='form-select'
                                            disabled={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.sinAgente
                                                    : true
                                            }
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.agente
                                                    : 0
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetAgenteCustomerEditBilling)}
                                        >
                                            <option value={0} selected disabled hidden> Seleccione... </option>
                                            {
                                                (agentesBilling != null)
                                                    ? (agentesBilling.length === 0)
                                                        ? <option value=''>No Agentes</option>
                                                        : agentesBilling.map(agente => {
                                                            return <option key={agente.id} value={agente.id}> {agente.name} </option>
                                                        })
                                                    : <option value=''>No Agentes</option>
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Teléfono</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPhone className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Télefono del Cliente"
                                            type="text"
                                            name="telefono"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.telefono
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetTelefonoCustomerEditBilling)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-12 mb-3">
                                    <h5>Dirección</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMapLocationDot className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            placeholder="Dirección del Cliente"
                                            type="text"
                                            name="direccion"
                                            value={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.direccion
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetDireccionCustomerEditBilling)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkInactivado"
                                            class="form-check-input checkP"

                                            name="inactivado"
                                            checked={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.inactivo
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetInactivoCustomerEditBilling)}
                                        />
                                        <h5 className="form-check-label" for="checkInactivado">Inactivado</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            id="checkRegistradoMAG"
                                            type="checkbox"
                                            name="mag"
                                            class="form-check-input checkP"
                                            checked={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.mag
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetMagCustomerEditBilling)}
                                        />
                                        <h5 className="form-check-label" for="checkRegistradoMAG">Esta Registrado en el MAG</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkActualizado"
                                            name="actualizado"
                                            class="form-check-input checkP"
                                            checked={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.actualizado
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetActualizadoCustomerEditBilling)}
                                        />
                                        <h5 className="form-check-label" for="checkActualizado">Actualizado</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            id="checkFallecido"
                                            type="checkbox"
                                            name="fallecido"
                                            class="form-check-input checkP"
                                            checked={
                                                (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].clienteFacturacionEdit.fallecido
                                                    : ''
                                            }
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetFallecidoCustomerEditBilling)}
                                        />
                                        <h5 className="form-check-label" for="checkFallecido">Fallecido</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type='button'
                                className='btn btn-warning'
                                onClick={handleEditCustomer}
                                data-bs-dismiss="modal"
                            >
                                Editar <TbEditCircle className="iconSize" />
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