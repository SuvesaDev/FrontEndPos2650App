import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { TbSearch, TbSearchOff, TbNotes } from "react-icons/tb";
import { FaCalendar, FaCoins, FaColonSign, FaIdCard, FaMoneyBills, FaUser, FaUserCheck } from "react-icons/fa6";
import {
    SetCodClienteDownPayment,
    SetCodMonedaDownPayment,
    SetFormaPagoDownPayment,
    SetIsOpenModalSearchCustomersDownPayment,
    SetMonedaDownPayment,
    SetMontoDisponibleCuentaDownPayment,
    SetMontoDownPayment,
    SetMontoEntregaCuentaDownPayment,
    SetNombreDownPayment,
    startSearchOneCustomerByCedulaDownPayment
} from '../../actions/DownPaymentAction';

export const DownPaymentBody = () => {

    const dispatch = useDispatch();
    const {
        disableInputs,
        tiposMonedas,
        formasPagos,
        isSearchEntrega,
        entregaCuenta
    } = useSelector(state => state.downPayment);

    const {
        cedula,
        nombre,
        codMoneda,
        formaPago,
        monto,
        usuario,
        fecha
    } = entregaCuenta;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeMonto = ({ target }) => {
        dispatch(SetMontoDownPayment(target.value));
        dispatch(SetMontoEntregaCuentaDownPayment(target.value));
        dispatch(SetMontoDisponibleCuentaDownPayment(target.value));
    };

    const handleChangeTipoMoneda = ({ target }) => {

        dispatch(SetCodMonedaDownPayment(target.value));

        const nameMoneda = tiposMonedas.find(moneda => moneda.codMoneda === parseInt(target.value)).monedaNombre;

        if (nameMoneda !== undefined) {
            dispatch(SetMonedaDownPayment(nameMoneda));
        }
    };

    const handleSearchCustomersDownPayment = (e) => {

        if (!disableInputs) {
            e.preventDefault();
            dispatch(SetIsOpenModalSearchCustomersDownPayment(true));
        }

    }

    const handleSearchClientEnter = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (!disableInputs) {

                if (cedula.length >= 9) {

                    dispatch(startSearchOneCustomerByCedulaDownPayment(cedula));

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
            <div className="row mb-3 text-md-center">

                <div className="col-md-3 mb-3">
                    <h5>Identificacion</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Identificacion del Cliente"
                            disabled={(disableInputs) ? disableInputs : isSearchEntrega}
                            name='cedula'
                            value={cedula}
                            onKeyDown={handleSearchClientEnter}
                            onChange={e => handleInputChangeWithDispatch(e, SetCodClienteDownPayment)}
                        />
                        <button
                            class="btn btn-primary"
                            type="button"
                            className={(disableInputs) ? 'btn btn-primary disabled' : (isSearchEntrega) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                            data-bs-toggle="modal"
                            data-bs-target="#modalEntregarCuenta"
                        >
                            {disableInputs ? (
                                <TbSearchOff className="iconSize" />
                            ) : (
                                <TbSearch className="iconSize" />
                            )}
                        </button>
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
                            disabled={true}
                            name='nombre'
                            value={nombre}
                            className="form-control"
                            placeholder="Nombre del Cliente"
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreDownPayment)}
                        />
                    </div>
                </div>



                <div className="col-md-3 mb-3">
                    <h5>Tipo Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <select
                            name='codMoneda'
                            className='form-select'
                            disabled={(disableInputs) ? disableInputs : isSearchEntrega}
                            value={codMoneda}
                            onChange={handleChangeTipoMoneda}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (tiposMonedas.length !== 0)
                                    ? tiposMonedas.map(moneda => {
                                        return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                                    })
                                    : <option value=''>No Monedas</option>

                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Forma Pago</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMoneyBills className="iconSize" />
                        </span>
                        <select
                            name='formaPago'
                            className='form-select'
                            disabled={(disableInputs) ? disableInputs : isSearchEntrega}
                            value={formaPago}
                            onChange={e => handleInputChangeWithDispatch(e, SetFormaPagoDownPayment)}
                        >
                            <option value={''} selected disabled hidden> Seleccione... </option>
                            {
                                (formasPagos.length !== 0)
                                    ? formasPagos.map(formaPago => {
                                        return <option key={formaPago.codigo} value={formaPago.codigo}> {formaPago.descripcion} </option>
                                    })
                                    : <option value=''>No Formas Pago</option>

                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-md-center">
                <div className="col-md-1 mb-3"></div>
                <div className="col-md-3 mb-3">
                    <h5>Monto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaColonSign className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='monto'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : isSearchEntrega}
                            placeholder='0'
                            value={monto}
                            onChange={handleChangeMonto}
                        />
                            <input
                            className="form-control"
                            type='text'
                            disabled
                            placeholder='0'
                            value={
                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(monto)
                            }
                            onChange={handleChangeMonto}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Responsable</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <input
                            name='usuario'
                            type='text'
                            disabled={true}
                            value={usuario}
                            className="form-control"
                            placeholder='Nombre del Responsable'
                        // onChange={ e => handleInputChangeWithDispatch( e, SetClaveEntradaUsers ) }
                        />
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Fecha</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            name='fecha'
                            type='date'
                            disabled={true}
                            value={fecha.split('T')[0]}
                            className='form-control'
                        // onChange={ e => handleInputChangeWithDispatch( e, SetEmailUsers ) }
                        />
                    </div>
                </div>
                <div className="col-md-1 mb-3"></div>
            </div>

        </>


    )
}
