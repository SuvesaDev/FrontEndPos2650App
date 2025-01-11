import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendarDay, FaCashRegister, FaIdCard, FaSortNumericDownAlt, FaUser, FaUserTie } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa6';
import { TbNotes } from "react-icons/tb";
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
import { 
    SetCajeroPreDeposits, 
    SetCedulaPreDeposits, 
    SetFechaPreDeposits, 
    SetMontoPreDeposits, 
    SetNumAperturaPreDeposits, 
    SetObservacionesPreDeposits 
} from '../../actions/PreDepositsAction';

export const PreDepositsBody = () => {

    const dispatch = useDispatch();
    const {
        disableInputs,
        cajeros,
        preDeposito
    } = useSelector(state => state.preDeposits);

    const {
        fecha,
        cajero,
        nombreCajero,
        cedula,
        depositante,
        numApertura,
        monto,
        observaciones
    } = preDeposito;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeCajero = ({ target }) => {

        dispatch(SetCajeroPreDeposits(target.value));

        const cajeroSeleted = cajeros.find(cajero => cajero.nombre === target.value);

        if (cajeroSeleted !== undefined) {

            const { id, idApertura } = cajeroSeleted;

            dispatch(SetCedulaPreDeposits(id));
            dispatch(SetNumAperturaPreDeposits(idApertura));
        }
    };

    // const handleSearchCustomersDownPayment = (e) => {

    //     // if( !disableInputs ) {
    //     //     e.preventDefault();
    //     //     dispatch( SetIsOpenModalSearchCustomersDownPayment( true ) );
    //     // }

    // }

    // const handleSearchClientEnter = (e) => {

    //     // if( e.key === 'Enter' ) {

    //     //     e.preventDefault();

    //     //     if( !disableInputs ) {

    //     //         if (cedula.length >= 9) { 

    //     //             dispatch( startSearchOneCustomerByCedulaDownPayment(cedula) );

    //     //         } else {
    //     //             Swal.fire({
    //     //                 icon: 'warning',
    //     //                 title: 'Advertencia',
    //     //                 text: 'Ingrese una cédula valida para buscar.',
    //     //             });
    //     //         }
    //     //     }
    //     // }
    // };

    return (

        <>

            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                </div>
                <div className="card-body">
                    <div className="row mb-2 text-center" >
                        <div className="col-md-3 mb-3">
                            <h5>Cajero</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUserCheck className="iconSize" />
                                </span>
                                <select
                                    name='cajero'
                                    className='form-select'
                                    disabled={disableInputs}
                                    value={cajero}
                                    onChange={handleChangeCajero}
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
                            <h5>Cédula Cajero</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaIdCard className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Cédula del Cajero'
                                    disabled={true}
                                    name='cedula'
                                    value={cedula}
                                />
                            </div>
                        </div>


                        <div className="col-md-3 mb-3">
                            <h5>Número Apertura</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaSortNumericDownAlt className="iconSize" />
                                </span>
                                <input
                                    className='form-control'
                                    placeholder='Número de Apertura'
                                    type='text'
                                    disabled={true}
                                    name='numApertura'
                                    value={numApertura}
                                />
                            </div>
                        </div>


                        <div className="col-md-3 mb-3">
                            <h5>Nombre Cajero</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUser className="iconSize" />
                                </span>
                                <input
                                    className='form-control'
                                    placeholder='Nombre del Cajero'
                                    type='text'
                                    disabled={true}
                                    name='cajero'
                                    value={cajero}
                                />
                            </div>
                        </div>


                        <div className="col-md-4 mb-3">
                            <h5>Monto</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCashRegister className="iconSize" />
                                </span>
                                <input
                                    name='monto'
                                    type='number'
                                    className='form-control'
                                    disabled={disableInputs}
                                    placeholder='0'
                                    value={monto}
                                    onChange={e => handleInputChangeWithDispatch(e, SetMontoPreDeposits)}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    disabled
                                    value={
                                        new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(monto)
                                    }
                                    onChange={e => handleInputChangeWithDispatch(e, SetMontoPreDeposits)}
                                />
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5>Depositante</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUserTie className="iconSize" />
                                </span>
                                <input
                                    name='depositante'
                                    className='form-control'
                                    placeholder='Nombre del Depositante'
                                    type='text'
                                    disabled={true}
                                    value={depositante}
                                />
                            </div>
                        </div>


                        <div className="col-md-4 mb-3">
                            <h5>Fecha</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendarDay className="iconSize" />
                                </span>
                                <input
                                    className='form-control'
                                    name='fecha'
                                    type='date'
                                    disabled={disableInputs}
                                    value={fecha.split('T')[0]}
                                    onChange={e => handleInputChangeWithDispatch(e, SetFechaPreDeposits)}
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3"></div>
                        <div className="col-md-6 mb-3">
                            <h5>Observaciones</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <TbNotes className="iconSize" />
                                </span>
                                <textarea
                                    class="form-control"
                                    name='observaciones'
                                    rows="4"
                                    cols="50"
                                    disabled={disableInputs}
                                    value={observaciones}
                                    onChange={e => handleInputChangeWithDispatch(e, SetObservacionesPreDeposits)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3"></div>

                    </div>
                </div>
            </div>
        </>


    )
}
