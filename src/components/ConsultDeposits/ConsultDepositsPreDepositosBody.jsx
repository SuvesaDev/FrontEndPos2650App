import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { ConsultDepositsPreDepositosBodyTable } from './ConsultDepositsPreDepositosBodyTable';
import {
    SetCheckCajeroPreDepositoConsultDeposits,
    SetCheckDepositantePreDepositoConsultDeposits,
    SetCheckFechasPreDepositoConsultDeposits,
    SetCheckNumAperturaPreDepositoConsultDeposits,
    SetCheckNumeroPreDepositoConsultDeposits,
    SetDisableCajeroPreDepositoConsultDeposits,
    SetDisableDepositantePreDepositoConsultDeposits,
    SetDisableFechasPreDepositoConsultDeposits,
    SetDisableNumAperturaPreDepositoConsultDeposits,
    SetDisableNumeroPreDepositoConsultDeposits,
    SetSearchCajeroConsultPreDeposits,
    SetSearchDepositanteConsultPreDeposits,
    SetSearchFechaDesdeConsultPreDeposits,
    SetSearchFechaHastaConsultPreDeposits,
    SetSearchNumAperturaConsultPreDeposits,
    SetSearchNumeroConsultPreDeposits,
    startSearchPreDepositsConsultDeposits
} from '../../actions/ConsultDepositsAction';
import { FaHashtag, FaMagnifyingGlass, FaUser } from 'react-icons/fa6';
import { FaCalendar, FaPiggyBank, FaUserCheck } from 'react-icons/fa';


export const ConsultDepositsPreDepositosBody = () => {

    const dispatch = useDispatch();
    const {
        disableInputs,
        cajeros,
        checkNumeroPreDeposito,
        disableNumeroPreDeposito,
        checkNumAperturaPreDeposito,
        disableNumAperturaPreDeposito,
        checkCajeroPreDeposito,
        disableCajeroPreDeposito,
        checkDepositantePreDeposito,
        disableDepositantePreDeposito,
        checkFechasPreDeposito,
        disableFechasPreDeposito,
        optionssearchPreDepositos,
        resultSearchPreDepositos
    } = useSelector(state => state.consultDeposits);

    const {
        numero,
        numApertura,
        cajero,
        depositante,
        fechaDesde,
        fechaHasta
    } = optionssearchPreDepositos;

    const columns = [
        {
            Header: "Número",
            accessor: "numero",
        },
        {
            Header: "Cajero",
            accessor: "cajero",
        },
        {
            Header: "Monto",
            accessor: "monto",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        }
    ];

    const handleChangeCheckNumero = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroPreDepositoConsultDeposits(true));
        dispatch(SetDisableNumeroPreDepositoConsultDeposits(false));

        // Cambio num apertura
        dispatch(SetCheckNumAperturaPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumAperturaPreDepositoConsultDeposits(true));

        // Cambio cajero
        dispatch(SetCheckCajeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableCajeroPreDepositoConsultDeposits(true));

        // Cambio depositante
        dispatch(SetCheckDepositantePreDepositoConsultDeposits(false));
        dispatch(SetDisableDepositantePreDepositoConsultDeposits(true));

        // Cambio fechas
        dispatch(SetCheckFechasPreDepositoConsultDeposits(false));
        dispatch(SetDisableFechasPreDepositoConsultDeposits(true));
    }

    const handleChangeCheckNumApertura = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumeroPreDepositoConsultDeposits(true));

        // Cambio num apertura
        dispatch(SetCheckNumAperturaPreDepositoConsultDeposits(true));
        dispatch(SetDisableNumAperturaPreDepositoConsultDeposits(false));

        // Cambio cajero
        dispatch(SetCheckCajeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableCajeroPreDepositoConsultDeposits(true));

        // Cambio depositante
        dispatch(SetCheckDepositantePreDepositoConsultDeposits(false));
        dispatch(SetDisableDepositantePreDepositoConsultDeposits(true));

        // Cambio fechas
        dispatch(SetCheckFechasPreDepositoConsultDeposits(false));
        dispatch(SetDisableFechasPreDepositoConsultDeposits(true));
    }

    const handleChangeCheckCajero = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumeroPreDepositoConsultDeposits(true));

        // Cambio num apertura
        dispatch(SetCheckNumAperturaPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumAperturaPreDepositoConsultDeposits(true));

        // Cambio cajero
        dispatch(SetCheckCajeroPreDepositoConsultDeposits(true));
        dispatch(SetDisableCajeroPreDepositoConsultDeposits(false));

        // Cambio depositante
        dispatch(SetCheckDepositantePreDepositoConsultDeposits(false));
        dispatch(SetDisableDepositantePreDepositoConsultDeposits(true));

        // Cambio fechas
        dispatch(SetCheckFechasPreDepositoConsultDeposits(false));
        dispatch(SetDisableFechasPreDepositoConsultDeposits(true));
    }

    const handleChangeCheckDepositante = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumeroPreDepositoConsultDeposits(true));

        // Cambio num apertura
        dispatch(SetCheckNumAperturaPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumAperturaPreDepositoConsultDeposits(true));

        // Cambio cajero
        dispatch(SetCheckCajeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableCajeroPreDepositoConsultDeposits(true));

        // Cambio depositante
        dispatch(SetCheckDepositantePreDepositoConsultDeposits(true));
        dispatch(SetDisableDepositantePreDepositoConsultDeposits(false));

        // Cambio fechas
        dispatch(SetCheckFechasPreDepositoConsultDeposits(false));
        dispatch(SetDisableFechasPreDepositoConsultDeposits(true));
    }

    const handleChangeCheckFechas = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumeroPreDepositoConsultDeposits(true));

        // Cambio num apertura
        dispatch(SetCheckNumAperturaPreDepositoConsultDeposits(false));
        dispatch(SetDisableNumAperturaPreDepositoConsultDeposits(true));

        // Cambio cajero
        dispatch(SetCheckCajeroPreDepositoConsultDeposits(false));
        dispatch(SetDisableCajeroPreDepositoConsultDeposits(true));

        // Cambio depositante
        dispatch(SetCheckDepositantePreDepositoConsultDeposits(false));
        dispatch(SetDisableDepositantePreDepositoConsultDeposits(true));

        // Cambio fechas
        dispatch(SetCheckFechasPreDepositoConsultDeposits(true));
        dispatch(SetDisableFechasPreDepositoConsultDeposits(false));
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleClickSearchPreDeposits = (e) => {

        if (disableInputs) return;

        if (numero !== '' || numApertura !== '' || cajero !== '' || depositante !== '' || checkFechasPreDeposito) {

            e.preventDefault();

            // Busqueda por numero
            if (checkNumeroPreDeposito && !checkNumAperturaPreDeposito
                && !checkCajeroPreDeposito
                && !checkDepositantePreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero,
                    numApertura: null,
                    cajero: null,
                    depositante: null,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por num Apertura
            if (checkNumAperturaPreDeposito && !checkNumeroPreDeposito
                && !checkCajeroPreDeposito
                && !checkDepositantePreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura,
                    cajero: null,
                    depositante: null,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por cajero
            if (checkCajeroPreDeposito && !checkNumeroPreDeposito
                && !checkNumAperturaPreDeposito
                && !checkDepositantePreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: null,
                    cajero,
                    depositante: null,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por depositante
            if (checkDepositantePreDeposito && !checkNumeroPreDeposito
                && !checkNumAperturaPreDeposito
                && !checkCajeroPreDeposito
                && !checkFechasPreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: null,
                    cajero: null,
                    depositante,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por fechas
            if (checkFechasPreDeposito && !checkNumeroPreDeposito
                && !checkNumAperturaPreDeposito
                && !checkCajeroPreDeposito
                && !checkDepositantePreDeposito) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: null,
                    cajero: null,
                    depositante: null,
                    desde: fechaDesde,
                    hasta: fechaHasta
                }

                dispatch(startSearchPreDepositsConsultDeposits(searchPreDeposits));

                return;
            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor escriba un criterio de busqueda.'
            });
        }

    }

    return (
        <>

            <div className="row mb-2 text-center" >
                <div className="col-md-2 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input checkP"
                            id="txtCheckBoxNumero"
                            name="checkNumeroPreDeposito"
                            disabled={disableInputs}
                            checked={checkNumeroPreDeposito}
                            onChange={handleChangeCheckNumero}
                        />
                        <h5 className="form-check-label" for="txtCheckBoxNumero">Número</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Número de Pre-Depósito"
                            name='numero'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : disableNumeroPreDeposito}
                            value={numero}
                            onChange={e => handleInputChangeWithDispatch(e, SetSearchNumeroConsultPreDeposits)}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input checkP"
                            id="txtCheckBoxNumApertura"
                            name="checkCustomer"
                            disabled={disableInputs}
                            checked={checkNumAperturaPreDeposito}
                            onChange={handleChangeCheckNumApertura}
                        />
                        <h5 className="form-check-label" for="txtCheckBoxNumApertura">Número Apertura</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Número de Apertura"
                            name='numApertura'
                            type='number'
                            disabled={(disableInputs) ? disableInputs : disableNumAperturaPreDeposito}
                            value={numApertura}
                            onChange={e => handleInputChangeWithDispatch(e, SetSearchNumAperturaConsultPreDeposits)}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input checkP"
                            id="txtRadioButtonCajero"
                            disabled={disableInputs}
                            checked={checkCajeroPreDeposito}
                            onChange={handleChangeCheckCajero}
                        />
                        <h5 className="form-check-label" for="txtRadioButtonCajero">Cajero</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            name='cajero'
                            disabled={(disableInputs) ? disableInputs : disableCajeroPreDeposito}
                            value={cajero}
                            onChange={e => handleInputChangeWithDispatch(e, SetCheckCajeroPreDepositoConsultDeposits)}
                        >
                            <option value={''} selected disabled hidden> Seleccione... </option>
                            {
                                (cajeros.length !== 0)
                                    ? cajeros.map(cajero => {
                                        return <option key={cajero.id} value={cajero.nombre}> {cajero.nombre} </option>
                                    })
                                    : <option value=''>No Cajeros</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="txtCheckBoxDepositante"
                            name="checkCustomer"
                            class="form-check-input checkP"
                            disabled={disableInputs}
                            checked={checkDepositantePreDeposito}
                            onChange={handleChangeCheckDepositante}
                        />
                        <h5 className="form-check-label" for="txtCheckBoxDepositante">Depositante</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Nombre del Depositante"
                            name='depositante'
                            type='text'
                            disabled={(disableInputs) ? disableInputs : disableDepositantePreDeposito}
                            value={depositante}
                            onChange={e => handleInputChangeWithDispatch(e, SetSearchDepositanteConsultPreDeposits)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input checkP"
                            id="txtRadioButtonConsultDepositsDates"
                            name="checkFechasPreDeposito"
                            disabled={disableInputs}
                            checked={checkFechasPreDeposito}
                            onChange={handleChangeCheckFechas}
                        />
                        <h5 className="form-check-label" for="txtRadioButtonConsultDepositsDates">Fechas</h5>
                    </div>
                    <hr />

                    <div className='inline-container'>
                        <div className='espacio'>
                            <h5>Desde</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendar className="iconSize" />
                                </span>
                                <input
                                    type="date"
                                    name="fechaDesde"
                                    className='form-control'
                                    disabled={(disableInputs) ? disableInputs : disableFechasPreDeposito}
                                    value={fechaDesde}
                                    onChange={e => handleInputChangeWithDispatch(e, SetSearchFechaDesdeConsultPreDeposits)}
                                />
                            </div>
                        </div>
                        <div className='espacio'>
                            <h5>Hasta</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendar className="iconSize" />
                                </span>
                                <input
                                    type="date"
                                    className='form-control'
                                    name="fechaHasta"
                                    disabled={(disableInputs) ? disableInputs : disableFechasPreDeposito}
                                    value={fechaHasta}
                                    onChange={e => handleInputChangeWithDispatch(e, SetSearchFechaHastaConsultPreDeposits)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-1 mb-3'>
                    <br />
                    <button
                        className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                        onClick={handleClickSearchPreDeposits}
                    >
                        Buscar <FaMagnifyingGlass className='iconSize' />
                    </button>
                    <hr />
                </div>

            </ div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-3">
                    <ConsultDepositsPreDepositosBodyTable columns={columns} data={resultSearchPreDepositos} />

                </div>
            </div>

        </>
    )
}
