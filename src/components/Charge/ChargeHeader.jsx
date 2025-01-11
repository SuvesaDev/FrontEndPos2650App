import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
    SetCedulaSearchCharge,
    SetCheckSearchCedulaCharge,
    SetCheckSearchFichaCharge,
    SetCheckSearchNombreCharge,
    SetNombreFichaSearchCharge,
    SetNumeroFichaSearchCharge,
    startSearchPreVenta
} from '../../actions/ChargeAction';
import { FaHashtag, FaIdCard, FaMagnifyingGlass, FaUser } from 'react-icons/fa6';

export const ChargeHeader = () => {

    const dispatch = useDispatch();
    const {
        numeroFichaSearch,
        disableInputsSearch,
        cobrar,
        nameUserCharge,
        cedulaUserCharge,
        numApertura,
        checkSearchFicha,
        checkSearchCedula,
        checkSearchNombre,
        cedulaSearch,
        nombreSearch
    } = useSelector(state => state.charge);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleCheckFicha = ({ target }) => {

        // Se cambia el valor Ficha
        dispatch(SetCheckSearchFichaCharge(target.checked));

        // Se cambia el valor de Cedula
        dispatch(SetCheckSearchCedulaCharge(false));

        // Se cambia el valor de Nombre
        dispatch(SetCheckSearchNombreCharge(false));
    };

    const handleCheckCedula = ({ target }) => {

        // Se cambia el valor Cedula
        dispatch(SetCheckSearchCedulaCharge(target.checked));

        // Se cambia el valor de Ficha
        dispatch(SetCheckSearchFichaCharge(false));

        // Se cambia el valor de Nombre
        dispatch(SetCheckSearchNombreCharge(false));
    };

    const handleCheckNombre = ({ target }) => {

        //Se cambia el valor Nombre
        dispatch(SetCheckSearchNombreCharge(target.checked));

        // Se cambia el valor de Ficha
        dispatch(SetCheckSearchFichaCharge(false));

        // Se cambia el valor de Cedula
        dispatch(SetCheckSearchCedulaCharge(false));
    };

    const handleClickSearch = (e) => {

        if (disableInputsSearch) {
            return;
        }

        if (checkSearchFicha && checkSearchCedula === false && checkSearchNombre === false) {

            if (numeroFichaSearch !== '') {
                e.preventDefault();
                dispatch(startSearchPreVenta(numeroFichaSearch, cobrar, cedulaUserCharge, nameUserCharge, numApertura, 1));
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Indique el número de Ficha'
                });
            }

        } else if (checkSearchCedula && checkSearchFicha === false && checkSearchNombre === false) {

            if (cedulaSearch !== '') {
                e.preventDefault();
                dispatch(startSearchPreVenta(cedulaSearch, cobrar, cedulaUserCharge, nameUserCharge, numApertura, 2));
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Indique la cedula del cliente'
                });
            }

        } else if (checkSearchNombre && checkSearchFicha === false && checkSearchCedula === false) {

            // if( nombreSearch !== '' ) {
            //     e.preventDefault();
            //     dispatch( startSearchPreVenta( nombreSearch, cobrar, cedulaUserCharge, nameUserCharge, numApertura, 3 ) );
            // } 

        }

    }

    return (
        <>

            <div className="row mb-0 text-center" >
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            type='checkbox'
                            id='checkFichaChargeHeader'
                            name='checkSearchFicha'
                            disabled={disableInputsSearch}
                            checked={checkSearchFicha}
                            onChange={e => handleCheckFicha(e, SetCheckSearchFichaCharge)}
                        />
                        <h5 className="form-check-label" for="checkFichaChargeHeader">Número de Ficha</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type='number'
                            min="0"
                            placeholder='0'
                            name='numeroFichaSearch'
                            className="form-control"
                            disabled={(disableInputsSearch) ? disableInputsSearch : !checkSearchFicha}
                            value={numeroFichaSearch}
                            onChange={(e) => handleInputChangeWithDispatch(e, SetNumeroFichaSearchCharge)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleClickSearch(e);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            type='checkbox'
                            id='checkCedulaChargeHeader'
                            name='checkSearchCedula'
                            disabled={disableInputsSearch}
                            checked={checkSearchCedula}
                            onChange={e => handleCheckCedula(e)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleClickSearch(e);
                                }
                            }}
                        />
                        <h5 className="form-check-label" for="checkCedulaChargeHeader">Cédula Cliente</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type='number'
                            min="0"
                            placeholder='Cédula del Cliente'
                            name='cedulaSearch'
                            className='form-control'
                            disabled={(disableInputsSearch) ? disableInputsSearch : !checkSearchCedula}
                            value={cedulaSearch}
                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaSearchCharge)}
                        />
                    </div>
                </div>



                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            class="form-check-input checkP"
                            type='checkbox'
                            id='checkNombreChargeHeader'
                            name='checkSearchNombre'
                            // disabled={ disableInputsSearch }
                            checked={checkSearchNombre}
                            onChange={e => handleCheckNombre(e)}
                        />
                        <h5 className="form-check-label" for="checkNombreChargeHeader">Nombre Cliente</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type='number'
                            min="0"
                            placeholder='Nombre del Cliente'
                            name='nombreSearch'
                            className='form-control'
                            disabled={(disableInputsSearch) ? disableInputsSearch : !checkSearchNombre}
                            value={nombreSearch}
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreFichaSearchCharge)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button
                        className={(disableInputsSearch) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                        onClick={handleClickSearch}
                    >
                        Buscar <FaMagnifyingGlass className='iconSize' />
                    </button>
                </div>

            </div>
        </>
    )
}
