import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { ConsultDepositsDepositosBodyTable } from './ConsultDepositsDepositosBodyTable';

import {
    SetCheckBancoConsultDeposits,
    SetCheckCajeroConsultDeposits,
    SetCheckFechasConsultDeposits,
    SetCheckNumeroDepositoConsultDeposits,
    SetDisableBancoConsultDeposits,
    SetDisableCajeroConsultDeposits,
    SetDisableFechasConsultDeposits,
    SetDisableNumeroDepositoConsultDeposits,
    SetSearchBancoConsultDeposits,
    SetSearchCajeroConsultDeposits,
    SetSearchFechaDesdeConsultDeposits,
    SetSearchFechaHastaConsultDeposits,
    SetSearchNumeroConsultDeposits,
    startSearchDepositsConsultDeposits
} from '../../actions/ConsultDepositsAction';
import { FaHashtag, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaCalendar, FaPiggyBank, FaUserCheck } from 'react-icons/fa';

export const ConsultDepositsDepositosBody = () => {

    const dispatch = useDispatch();
    const {
        disableInputs,
        cajeros,
        bancos,
        checkNumeroDeposito,
        disableNumeroDeposito,
        checkBancoDeposito,
        disableBancoDeposito,
        checkCajeroDeposito,
        disableCajeroDeposito,
        checkFechasDeposito,
        disableFechasDeposito,
        optionssearchDepositos,
        resultSearchDepositos,
    } = useSelector(state => state.consultDeposits);

    const {
        numero,
        banco,
        cajero,
        fechaDesde,
        fechaHasta
    } = optionssearchDepositos;

    const columns = [
        {
            Header: "Número",
            accessor: "numero",
        },
        {
            Header: "Banco",
            accessor: "banco",
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
        dispatch(SetCheckNumeroDepositoConsultDeposits(true));
        dispatch(SetDisableNumeroDepositoConsultDeposits(false));

        // Cambio banco
        dispatch(SetCheckBancoConsultDeposits(false));
        dispatch(SetDisableBancoConsultDeposits(true));

        // Cambio cajero
        dispatch(SetCheckCajeroConsultDeposits(false));
        dispatch(SetDisableCajeroConsultDeposits(true));

        // Cambio fechas
        dispatch(SetCheckFechasConsultDeposits(false));
        dispatch(SetDisableFechasConsultDeposits(true));
    }

    const handleChangeCheckBanco = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroDepositoConsultDeposits(false));
        dispatch(SetDisableNumeroDepositoConsultDeposits(true));

        // Cambio banco
        dispatch(SetCheckBancoConsultDeposits(true));
        dispatch(SetDisableBancoConsultDeposits(false));

        // Cambio cajero
        dispatch(SetCheckCajeroConsultDeposits(false));
        dispatch(SetDisableCajeroConsultDeposits(true));

        // Cambio fechas
        dispatch(SetCheckFechasConsultDeposits(false));
        dispatch(SetDisableFechasConsultDeposits(true));
    }

    const handleChangeCheckCajero = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroDepositoConsultDeposits(false));
        dispatch(SetDisableNumeroDepositoConsultDeposits(true));

        // Cambio banco
        dispatch(SetCheckBancoConsultDeposits(false));
        dispatch(SetDisableBancoConsultDeposits(true));

        // Cambio cajero
        dispatch(SetCheckCajeroConsultDeposits(true));
        dispatch(SetDisableCajeroConsultDeposits(false));

        // Cambio fechas
        dispatch(SetCheckFechasConsultDeposits(false));
        dispatch(SetDisableFechasConsultDeposits(true));
    }

    const handleChangeCheckFechas = (e) => {

        // Cambio numero
        dispatch(SetCheckNumeroDepositoConsultDeposits(false));
        dispatch(SetDisableNumeroDepositoConsultDeposits(true));

        // Cambio banco
        dispatch(SetCheckBancoConsultDeposits(false));
        dispatch(SetDisableBancoConsultDeposits(true));

        // Cambio cajero
        dispatch(SetCheckCajeroConsultDeposits(false));
        dispatch(SetDisableCajeroConsultDeposits(true));

        // Cambio fechas
        dispatch(SetCheckFechasConsultDeposits(true));
        dispatch(SetDisableFechasConsultDeposits(false));
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleClickSearchDeposits = (e) => {

        if (disableInputs) return;

        if (numero !== '' || banco !== '' || cajero !== '' || checkFechasDeposito) {

            e.preventDefault();

            // Busqueda por numero
            if (checkNumeroDeposito && !checkBancoDeposito
                && !checkCajeroDeposito
                && !checkFechasDeposito) {

                const searchDeposits = {
                    numero,
                    banco: null,
                    cajero: null,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

                return;
            }

            // Busqueda por Banco
            if (checkBancoDeposito && !checkNumeroDeposito
                && !checkCajeroDeposito
                && !checkFechasDeposito) {

                const searchDeposits = {
                    numero: null,
                    banco,
                    cajero: null,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

                return;
            }

            // Busqueda por cajero
            if (checkCajeroDeposito && !checkNumeroDeposito
                && !checkBancoDeposito
                && !checkFechasDeposito) {

                const searchDeposits = {
                    numero: null,
                    banco: null,
                    cajero,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

                return;
            }

            // Busqueda por fechas
            if (checkFechasDeposito && !checkNumeroDeposito
                && !checkBancoDeposito
                && !checkCajeroDeposito) {

                const searchDeposits = {
                    numero: null,
                    banco: null,
                    cajero: null,
                    desde: fechaDesde,
                    hasta: fechaHasta
                }

                dispatch(startSearchDepositsConsultDeposits(searchDeposits));

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
                            disabled={disableInputs}
                            checked={checkNumeroDeposito}
                            onChange={handleChangeCheckNumero}
                        />
                        <h5 className="form-check-label" for="txtCheckBoxNumero">Número</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            name='numero'
                            type='number'
                            className="form-control"
                            placeholder="Número de Depósito"
                            disabled={(disableInputs) ? disableInputs : disableNumeroDeposito}
                            value={numero}
                            onChange={e => handleInputChangeWithDispatch(e, SetSearchNumeroConsultDeposits)}
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input checkP"
                            id="txtCheckBoxNumApertura"
                            disabled={disableInputs}
                            checked={checkBancoDeposito}
                            onChange={handleChangeCheckBanco}
                        />
                        <h5 className="form-check-label" for="txtCheckBoxNumApertura">Banco</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPiggyBank className="iconSize" />
                        </span>
                        <select
                            name='banco'
                            className='form-select'
                            disabled={(disableInputs) ? disableInputs : disableBancoDeposito}
                            value={banco}
                            onChange={e => handleInputChangeWithDispatch(e, SetSearchBancoConsultDeposits)}
                        >
                            <option value={''} selected disabled hidden> Seleccione... </option>
                            {
                                (bancos.length !== 0)
                                    ? bancos.map(banco => {
                                        return <option key={banco.id} value={banco.id}> {banco.banco} </option>
                                    })
                                    : <option value=''>No Bancos</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input checkP"
                            id="txtRadioButtonCajero"
                            disabled={disableInputs}
                            checked={checkCajeroDeposito}
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
                            disabled={(disableInputs) ? disableInputs : disableCajeroDeposito}
                            value={cajero}
                            onChange={e => handleInputChangeWithDispatch(e, SetSearchCajeroConsultDeposits)}
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


                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input checkP"
                            id="txtRadioButtonConsultDepositsDates"
                            disabled={disableInputs}
                            checked={checkFechasDeposito}
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
                                    disabled={(disableInputs) ? disableInputs : disableFechasDeposito}
                                    value={fechaDesde}
                                    onChange={e => handleInputChangeWithDispatch(e, SetSearchFechaDesdeConsultDeposits)}
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
                                    name="fechaHasta"
                                    className='form-control'
                                    disabled={(disableInputs) ? disableInputs : disableFechasDeposito}
                                    value={fechaHasta}
                                    onChange={e => handleInputChangeWithDispatch(e, SetSearchFechaHastaConsultDeposits)}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='col-md-2 mb-3'>
                    <br />
                    <button
                        className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                        onClick={handleClickSearchDeposits}
                    >
                        Buscar <FaMagnifyingGlass className='iconSize' />
                    </button>
                    <hr />
                </div>

            </ div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-3">
                    <ConsultDepositsDepositosBodyTable columns={columns} data={resultSearchDepositos} />
                </div>
            </div>
        </>
    )
}
