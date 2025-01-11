import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FaBuilding, FaCalendarDay, FaPiggyBank, FaSearch, FaWallet } from 'react-icons/fa';
import { TbNumber } from "react-icons/tb";
import { GiWallet } from "react-icons/gi";
import { GenerateDepositsBodyTable } from './GenerateDepositsBodyTable';

import {
    SetDisableInputCuentaGenerateDeposits,
    SetFechaGenerateDeposits,
    SetIdBancoGenerateDeposits,
    SetIdBancoLastGenerateDeposits,
    SetIdCuentaGenerateDeposits,
    SetIdEmpresaGenerateDeposits,
    SetIdEmpresaLastGenerateDeposits,
    SetNumeroAperturaGenerateDeposits,
    SetNumeroDepositoGenerateDeposits,
    startGetAllCuentasGenerateDeposits,
    startSearchPreDepositosGenerateDeposits
} from '../../actions/GenerateDepositsAction';
import { FaHashtag } from 'react-icons/fa6';

export const GenerateDepositsBody = () => {

    const dispatch = useDispatch();
    const {
        disableInputs,
        empresas,
        deposito,
        numeroApertura,
        bancos,
        disableInputCuenta,
        cuentas,
        idEmpresaLast,
        idBancoLast,
        preDepositosSearch
    } = useSelector(state => state.generateDeposits);

    const {
        numeroDeposito,
        fecha,
        idCuenta,
        idBanco,
        montoDeposito,
        idEmpresa
    } = deposito;

    useEffect(() => {

        if (idEmpresa !== 0 && idBanco !== 0) {

            if (idEmpresa !== idEmpresaLast || idBanco !== idBancoLast) {
                dispatch(startGetAllCuentasGenerateDeposits(idEmpresa, idBanco));
                dispatch(SetDisableInputCuentaGenerateDeposits(false));
                dispatch(SetIdEmpresaLastGenerateDeposits(idEmpresa));
                dispatch(SetIdBancoLastGenerateDeposits(idBanco));
            }

        }

    }, [idEmpresa, idBanco]);

    const columns = [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
        },
        {
            Header: "Cajero",
            accessor: "cajero",
        },
        {
            Header: "Depositante",
            accessor: "depositante",
        },
        {
            Header: "Monto",
            accessor: "monto",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "Seleccionar",
            accessor: "seleccionar",
        },
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSearchPreDepositos = (e) => {

        e.preventDefault();

        if (numeroApertura !== '') {
            dispatch(startSearchPreDepositosGenerateDeposits(numeroApertura));
        }
    }

    return (

        <>

            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                </div>
                <div className="card-body">
                    <div className="row mb-2 text-center" >
                        <div className="col-md-4 mb-3">
                            <h5>Empresa</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaBuilding className="iconSize" />
                                </span>
                                <select
                                    name='idEmpresa'
                                    className='form-select'
                                    disabled={disableInputs}
                                    value={idEmpresa}
                                    onChange={e => handleInputChangeWithDispatch(e, SetIdEmpresaGenerateDeposits)}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                    {
                                        (empresas.length !== 0)
                                            ? empresas.map(empresa => {
                                                return <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                                            })
                                            : <option value=''>No Empresas</option>
                                    }
                                </select>
                            </div>
                        </div>


                        <div className="col-md-4 mb-3">
                            <h5>Banco</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPiggyBank className="iconSize" />
                                </span>
                                <select
                                    name='idBanco'
                                    className='form-select'
                                    disabled={disableInputs}
                                    value={idBanco}
                                    onChange={e => handleInputChangeWithDispatch(e, SetIdBancoGenerateDeposits)}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
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

                        <div className="col-md-4 mb-3">
                            <h5>Cuenta</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaWallet className="iconSize" />
                                </span>
                                <select
                                    name='idCuenta'
                                    className='form-select'
                                    disabled={(disableInputs) ? disableInputs : disableInputCuenta}
                                    value={idCuenta}
                                    onChange={e => handleInputChangeWithDispatch(e, SetIdCuentaGenerateDeposits)}
                                >
                                    <option value={0} selected disabled hidden> Seleccione... </option>
                                    {
                                        (cuentas.length !== 0)
                                            ? cuentas.map(cuenta => {
                                                return <option key={cuenta.id} value={cuenta.id}> {cuenta.numero} </option>
                                            })
                                            : <option value=''>No Cuentas</option>
                                    }
                                </select>

                            </div>
                        </div>
                    </div>

                    <div className="row mb-2 text-center" >
                        <div className="col-md-4 mb-3">
                            <h5>Número Depósito</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <TbNumber className="iconSize" />
                                </span>
                                <input
                                    type='text'
                                    disabled={disableInputs}
                                    name='numeroDeposito'
                                    value={numeroDeposito}
                                    className='form-control'
                                    placeholder='Número de Depósito'
                                    onChange={e => handleInputChangeWithDispatch(e, SetNumeroDepositoGenerateDeposits)}
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
                                    name='fecha'
                                    type='date'
                                    className='form-control'
                                    disabled={disableInputs}
                                    value={fecha.split('T')[0]}
                                    onChange={e => handleInputChangeWithDispatch(e, SetFechaGenerateDeposits)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h5>Número Apertura</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaHashtag className="iconSize" />
                                </span>
                                <input
                                    name='numeroApertura'
                                    type='number'
                                    className='form-control'
                                    disabled={disableInputs}
                                    value={numeroApertura}
                                    onChange={e => handleInputChangeWithDispatch(e, SetNumeroAperturaGenerateDeposits)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleSearchPreDepositos();
                                        }
                                    }}
                                />
                                <button
                                    className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                                    type="button"
                                    onClick={handleSearchPreDepositos}
                                >
                                    Buscar <FaSearch className="iconSize" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2 text-center" >
                        <hr />
                        <div className='col-md-12 mb-2'>
                            <GenerateDepositsBodyTable columns={columns} data={preDepositosSearch} />

                        </div>
                    </div>
                </div>

                <div className="card-footer bg-primary">
                    <div className='inline-containerFinal'>
                        <h5 className='tituloFooter'>Total Depósito</h5>
                        <div className="col-md-2 mb-0">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <GiWallet className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total del Depósito"
                                    value={
                                        new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(montoDeposito)
                                    }
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}
