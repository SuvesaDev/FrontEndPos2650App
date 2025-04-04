import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SiHappycow } from 'react-icons/si';
import { AiFillFileAdd, AiFillEdit } from 'react-icons/ai';
import { RiFileEditFill, RiMailAddFill } from 'react-icons/ri';
import { FaEnvelope, FaSearch, FaUser, FaStoreAlt } from 'react-icons/fa';
import { FaBuilding, FaI, FaIdCard, FaLocationDot, FaMapLocationDot, FaPhone } from "react-icons/fa6";

import {
    OpenAddCorreosModalBilling,
    OpenModalAddCustomer,
    SetIdTipoClienteClienteFacturacionBilling,
    OpenModalEditCustomer,
    OpenModalEditCartaExoneracion,
    startSearchCartaExoneracion,
    OpenModalMAGCustomer,
    OpenSearchCustomerBilling,
    SetCedulaBuscarBilling,
    SetCedulaUsuarioBilling,
    SetCorreoComprobantesBilling,
    SetDireccionBilling,
    SetIdTipoClienteBilling,
    SetNombreClienteBilling,
    SetObservacionesBilling,
    SetTelefonoBilling,
    startGetCorreosComprobanteFacturacion,
    startSearchCustomerFacturacion,
    startSearchCustomerMAG,
    SetEmpresaBilling,
    SetDatoFacturacionBilling
} from '../../actions/billing';

import { BillingAddCustomerModal } from './BillingAddCustomerModal';
import { BillingEditCustomerModal } from './BillingEditCustomerModal';
import { BillingEditCartaExoneracionModal } from './BillingEditCartaExoneracionModal';
import { BillingMAGCustomerModal } from './BillingMAGCustomerModal';
import { CustomerSearchModal } from '../customers/CustomerSearchModal';
import { OpenSearchModalCustomers } from '../../actions/customers';
import { BillingAddCorreosModal } from './BillingAddCorreosModal';
import { TbListNumbers, TbNotes } from 'react-icons/tb';

export const BillingHeaderCustomer = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    const {
        empresas,
        billings
    } = useSelector(state => state.billing);

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const handleAddUserClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (!billings[numberScreen].hasCustomerBilling) {
            dispatch(SetIdTipoClienteClienteFacturacionBilling({ value: 2, number: numberScreen }))
            dispatch(OpenModalAddCustomer({ number: numberScreen }));
        }

    }

    const handleEditCartaExoneracionClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {
            dispatch(startSearchCartaExoneracion(billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen));
            dispatch(OpenModalEditCartaExoneracion({ number: numberScreen }));
        }
    }

    const handleEditUserClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {
            dispatch(OpenModalEditCustomer({ number: numberScreen }));
        }
    }

    const handleMAGUserClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {
            dispatch(OpenModalMAGCustomer({ number: numberScreen }));
            dispatch(startSearchCustomerMAG(billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen));
        }
    }

    const handleSearchClientBilling = (e) => {

        if (billings[numberScreen] === undefined) return;

        if ((billings[numberScreen].factura.encabezado.cedula_Usuario !== '')) {

            e.preventDefault();

            dispatch(SetCedulaBuscarBilling({ value: billings[numberScreen].factura.encabezado.cedula_Usuario, number: numberScreen }));
            dispatch(startSearchCustomerFacturacion(billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen, (billings[numberScreen].factura.encabezado.Cod_Moneda != '') ? true : false));
        }else{
            dispatch( OpenSearchCustomerBilling( { value: true, number : numberScreen } ));

        }

    }

    const handleClickDown = (e) => {

        if (billings[numberScreen] === undefined) return;

        if (e.key === 'Enter') {
            dispatch(SetCedulaBuscarBilling({ value: e.target.value, number: numberScreen }));
            dispatch(startSearchCustomerFacturacion(e.target.value, numberScreen, (billings[numberScreen].factura.encabezado.Cod_Moneda != '') ? true : false));
        }
    }

    const handleAddCorreosClick = (e) => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {

            e.preventDefault();
            dispatch(OpenAddCorreosModalBilling({ value: true, number: numberScreen }));
            dispatch(startGetCorreosComprobanteFacturacion(billings[numberScreen].factura.encabezado.cod_Cliente, numberScreen));

        }
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {

        if (billings[numberScreen] === undefined) return;

        dispatch(action({ value: target.value, number: numberScreen }));
    };

    return (

        <>
            <div className="row mb-2">
                <div className="col-md-3 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            name="cedula_Usuario"
                            type='number'
                            min="0"
                            className='form-control'
                            placeholder='Cédula del Cliente'
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.cedula_Usuario
                                    : ''
                            }
                            onKeyDown={handleClickDown}
                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaUsuarioBilling)}

                        />
                        <button
                            type="button"
                            className={
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].disableInputsHeader)
                                        ? 'btn btn-primary disabled'
                                        : 'btn btn-primary'
                                    : 'btn btn-primary disabled'
                            }
                            onClick={handleSearchClientBilling}
                            data-bs-toggle={
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].factura.encabezado.cedula_Usuario === '')
                                        ? "modal"
                                        : ''
                                    : ''
                            }
                            data-bs-target={
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].factura.encabezado.cedula_Usuario === '')
                                        ? "#modalBuscarClientes"
                                        : ''
                                    : ''
                            }
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Tipo Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbListNumbers className="iconSize" />
                        </span>
                        <select
                            name="idTipoCliente"
                            className="form-select"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.idTipoCliente
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetIdTipoClienteBilling)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (tiposIdentificacion != null)
                                    ? (tiposIdentificacion.length === 0)
                                        ? <option value=''></option>
                                        : tiposIdentificacion.map(tipoD => {
                                            return <option key={tipoD.codigoFe} value={tipoD.codigoFe}> {tipoD.descripcion} </option>
                                        })
                                    : <option value=''></option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Nombre del Cliente"
                            name="nombre_Cliente"
                            autoComplete="off"
                            disabled={true}
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.nombre_Cliente
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreClienteBilling)}
                            readOnly
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <div className="inline-container" role="toolbar">
                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "btn-group mb-2 d-none" : "btn-group mb-2" :  "btn-group mb-2"}>
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling) ? 'btn btn-dark' : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditarCliente"

                            >
                                <AiFillEdit className="iconSize" />
                            </button>
                        </div>

                        <div className="btn-group mb-2">
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling) ? 'btn btn-dark' : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalConsultaMAG"

                            >
                                <SiHappycow className="iconSize" />
                            </button>
                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "btn-group mb-2 d-none" : "btn-group mb-2" :  "btn-group mb-2"}>
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling)
                                            ? 'btn btn-dark disabled'
                                            : (!billings[numberScreen].disableInputsHeader)
                                                ? 'btn btn-dark'
                                                : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalAgregarCliente"
                            >
                                <AiFillFileAdd className="iconSize" />
                            </button>


                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "btn-group mb-2 d-none" : "btn-group mb-2" :  "btn-group mb-2"}>
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling) ? 'btn btn-dark' : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalCartaExoneracion"

                            >
                                <RiMailAddFill className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "row mb-2 d-none" : "row mb-2" :  "row mb-2"}>
                <div className="col-md-4 mb-3">
                    <h5>Teléfono</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPhone className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Teléfono del Cliente"
                            name='telefono'
                            autoComplete='off'
                            type='number'
                            min="0"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.telefono
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetTelefonoBilling)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Empresa</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBuilding className="iconSize" />
                        </span>
                        <select
                            name="empresa"
                            className="form-select"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.empresa
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetEmpresaBilling)}
                        >
                            <option value={''} selected disabled hidden> Seleccione... </option>
                            {
                                (empresas != null)
                                    ? (empresas.length === 0)
                                        ? <option value=''></option>
                                        : empresas.map(empresa => {
                                            return <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                                        })
                                    : <option value=''></option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <hr />
                    <button
                        className={
                            (billings[numberScreen] !== undefined)
                                ? (billings[numberScreen].hasCustomerBilling)
                                    ? 'btn btn-primary'
                                    : 'btn btn-primary disabled'
                                : 'btn btn-primary disabled'
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalAgregaCorreos"
                    >
                        Correos  <FaEnvelope className="iconSize" />
                    </button>
                </div>
            </div>

            <div className="row mb-2">
                <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-6 mb-3 d-none" : "col-md-6 mb-3" :  "col-md-6 mb-3"}>
                    <h5>Dirección</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMapLocationDot className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dirección del Cliente"
                            name='direccion'
                            autoComplete='off'
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.direccion
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetDireccionBilling)}
                        />
                    </div>
                </div>

                <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-4 mb-3" : "col-md-4 mb-3 d-none" :  "col-md-4 mb-3 d-none"}>
                    <h5>Datos Facturacion</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaStoreAlt className="iconSize" />
                        </span>
                        <select
                            name="idDatosFacturacion"
                            className="form-select"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.idDatoFacturacion
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetDatoFacturacionBilling)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (tiposIdentificacion != null)
                                    ? (tiposIdentificacion.length === 0)
                                        ? <option value=''></option>
                                        : tiposIdentificacion.map(tipoD => {
                                            return <option key={tipoD.codigoFe} value={tipoD.codigoFe}> {tipoD.descripcion} </option>
                                        })
                                    : <option value=''></option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones Extra"
                            name='observaciones'
                            autoComplete='off'
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.observaciones
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetObservacionesBilling)}

                        />
                    </div>
                </div>
            </div>

            <BillingAddCustomerModal />

            <BillingEditCustomerModal />

            <BillingEditCartaExoneracionModal />

            <BillingMAGCustomerModal />

            <CustomerSearchModal />

            <BillingAddCorreosModal />
        </>
    )
}