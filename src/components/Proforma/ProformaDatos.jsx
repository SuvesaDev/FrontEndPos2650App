import { FaCalendar, FaCalendarDay, FaEnvelope, FaIdCard, FaSearch, FaUser } from 'react-icons/fa';
import { FaCoins, FaPhone } from 'react-icons/fa6';
import { SiHappycow } from 'react-icons/si';
import { TbListNumbers } from 'react-icons/tb';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { SetCedulaClienteDataBudgets, SetContactoClienteDataBudgets, SetDisableInputsArticlesBudgets, SetFechaCotizacionsBudgets, SetIsContadoBudgets, SetIsCreditoBudgets, SetMonedaBudgets, SetMonedaNombreBudgets, SetNombreClienteDataBudgets, SetTelefonoClienteDataBudgets, SetTiempoEntregaBudgets, SetTipoCedulaClienteDataBudgets, SetValidezDiasBudgets, startSearchCustomerCedulaBudget } from '../../actions/budgetsAction';
export const ProformaDatos = () => {

    const dispatch = useDispatch();

    const { disableInputs, customerData, validezDias,
        tiempoEntrega,
        fechaCotizacion,
        moneda,
        monedaNombre, isContado, isCredito } = useSelector(state => state.budgets);

    const { monedasInventory, tiposIdentificacion } = useSelector(state => state.monedas);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleInputDuobleChangeWithDispatch = ({ target }, action1, action2) => {
        const selectedValue = target.value;
        const selectedOption = target.selectedOptions[0];
        if (selectedOption && selectedValue !== '') {
            const monedaNombre = selectedOption.text;
            dispatch(action1(selectedValue));
            dispatch(action2(monedaNombre));
            dispatch(SetDisableInputsArticlesBudgets(false))
        }
    };

    const handleMarkChangeWithDispatch = ({ target }, action1, action2) => {
        const value = target.value;
        if (value === "contado") {
            dispatch(action1(true))
            dispatch(action2(false))
        } else if (value === "credito") {
            dispatch(action1(false))
            dispatch(action2(true))
        }
    };

    const {
        codigoCliente,
        nombreCliente,
        contactoCliente,
        telefonoCliente,
        tipocedulaCliente,
        cedulaCliente } = customerData;

    const handleClickDownCedula = async (e) => {
        if (e.key === 'Enter') {
            dispatch(startSearchCustomerCedulaBudget(cedulaCliente));
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos del Cliente</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <h5>Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='clienteCedulaProforma'
                                            placeholder="Cédula del Cliente"
                                            disabled={disableInputs}
                                            value={cedulaCliente}
                                            onKeyDown={handleClickDownCedula}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetCedulaClienteDataBudgets)}
                                        />
                                        <button className={disableInputs ? ("btn btn-primary disabled espacio") : ("btn btn-primary espacio")}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalBuscarClientesBudget"
                                        >
                                            <FaSearch className='iconSize' />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Tipo Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbListNumbers className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                            disabled={disableInputs}
                                            value={tipocedulaCliente}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetTipoCedulaClienteDataBudgets)}
                                        >

                                            <option value={''} selected disabled hidden> Seleccione... </option>
                                            {
                                                (tiposIdentificacion != null)
                                                    ? (tiposIdentificacion.length === 0)
                                                        ? <option value=''>No existen Tipos Identificacion</option>
                                                        : tiposIdentificacion.map(identi => {
                                                            return <option key={identi.id} value={identi.id}> {identi.descripcion} </option>
                                                        })
                                                    : <option value=''>No existen Tipos Identificacion</option>
                                            }

                                        </select>
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
                                            className='form-control'
                                            placeholder="Nombre del Cliente"
                                            disabled={disableInputs}
                                            value={nombreCliente}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetNombreClienteDataBudgets)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <h5>Contacto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaEnvelope className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Contacto del Cliente"
                                            disabled={disableInputs}
                                            value={contactoCliente}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetContactoClienteDataBudgets)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Teléfono</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPhone className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Teléfono del Cliente"
                                            disabled={disableInputs}
                                            value={telefonoCliente}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetTelefonoClienteDataBudgets)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Condiciones de Cotización</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <h5>Validez (Días)</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder="Cantidad de días"
                                            disabled={disableInputs}
                                            value={validezDias}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetValidezDiasBudgets)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h5>Tiempo de Entrega (Días)</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <IoCalendarNumberSharp className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder="Tiempo de entrega"
                                            disabled={disableInputs}
                                            value={tiempoEntrega}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetTiempoEntregaBudgets)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type='date'
                                            className='form-control'
                                            disabled={disableInputs}
                                            value={fechaCotizacion}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetFechaCotizacionsBudgets)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h5>Tipo Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                            disabled={disableInputs}
                                            value={moneda}
                                            onChange={(e) =>
                                                handleInputDuobleChangeWithDispatch(e, SetMonedaBudgets, SetMonedaNombreBudgets)
                                            }
                                        >
                                            <option value={''} selected disabled hidden> Seleccione... </option>
                                            {
                                                (monedasInventory != null)
                                                    ? (monedasInventory.length === 0)
                                                        ? <option value=''>No Monedas</option>
                                                        : monedasInventory.map(moneda => {
                                                            return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                                                        })
                                                    : <option value=''>No Monedas</option>
                                            }
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Forma de Pago</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <hr />
                                <div className="col-md-6 mb-2">
                                    <div className="form-check">
                                        <input
                                            type='radio'
                                            className='form-check-input checkP'
                                            value="contado"
                                            id="radio1"
                                            disabled={disableInputs}
                                            checked={isContado}
                                            onChange={(e) => handleMarkChangeWithDispatch(e, SetIsContadoBudgets, SetIsCreditoBudgets)}
                                        />
                                        <label className="form-check-label" htmlFor="radio1">Contado</label>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-check">
                                        <input
                                            type='radio'
                                            className='form-check-input checkP'
                                            value="credito"
                                            id="radio2"
                                            disabled={disableInputs}
                                            checked={isCredito}
                                            onChange={(e) => handleMarkChangeWithDispatch(e, SetIsContadoBudgets, SetIsCreditoBudgets)}
                                        />
                                        <label className="form-check-label" htmlFor="radio2">Crédito</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}
