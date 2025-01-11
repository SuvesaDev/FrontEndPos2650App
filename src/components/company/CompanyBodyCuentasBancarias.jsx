import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyBodyCuentasBancariasTable } from './CompanyBodyCuentasBancariasTable';

import {
    CleanCuentaBancariaActualCompany,
    SetAddCuentaBancariaCompany,
    SetEditCuentaBancariaCompany,
    SetIdBancoCuentaBancariaActualCompany,
    SetIdMonedaCuentaBancariaActualCompany,
    SetIsCuentaBancariaEditCompany,
    SetNameBancoCuentaBancariaActualCompany,
    SetNameMonedaCuentaBancariaActualCompany,
    SetNumeroCuentaBancariaActualCompany
} from '../../actions/CompanyAction';
import { FaCoins, FaPiggyBank, FaSortNumericDownAlt, FaWallet } from 'react-icons/fa';
import { TbEditCircle } from "react-icons/tb";
import { FaCirclePlus } from 'react-icons/fa6';
export const CompanyBodyCuentasBancarias = () => {

    const dispatch = useDispatch();
    const {
        bancos,
        monedas,
        cuentaBancariasActual,
        disableInputs,
        empresa,
        isCuentaBancariaEdit,
        indexCuentaBancariaSeleted
    } = useSelector(state => state.company);

    const {
        numero,
        idBanco,
        idMoneda,
        nameBanco,
        nameMoneda
    } = cuentaBancariasActual;

    const { cuentasBancarias } = empresa;

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
            Header: "Moneda",
            accessor: "moneda",
        },
        {
            Header: "Opciones",
            accessor: "accion",
        },
    ];

    const handleAddCuentaBancaria = (e) => {

        if (!disableInputs) {

            if (numero === '' || idBanco === 0 || idMoneda === 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar una número, seleccionar banco y moneda.',
                });

                return;

            }

            const newCuenta = {
                numero: numero,
                banco: nameBanco,
                idBanco: idBanco,
                moneda: nameMoneda,
                idMoneda: idMoneda
            }

            // Se llama el metodo para agregar cuenta
            dispatch(SetAddCuentaBancariaCompany(newCuenta));

            // Clean del estado
            dispatch(CleanCuentaBancariaActualCompany());

        }

    }

    const handleEditCuentaBancaria = (e) => {

        if (!disableInputs) {

            if (numero === '' || idBanco === 0 || idMoneda === 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar una número, seleccionar banco y moneda.',
                });

                return;

            }

            const editCuenta = {
                numero: numero,
                banco: nameBanco,
                idBanco: idBanco,
                moneda: nameMoneda,
                idMoneda: idMoneda
            }

            // Se llama el metodo para agregar cuenta
            dispatch(SetEditCuentaBancariaCompany({
                index: parseInt(indexCuentaBancariaSeleted),
                cuenta: editCuenta
            }));

            // Se quita el modo de editar
            dispatch(SetIsCuentaBancariaEditCompany(false))

            // Clean del estado
            dispatch(CleanCuentaBancariaActualCompany());

        }

    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeBanco = ({ target }) => {

        // Se cambia el valor de idBanco
        dispatch(SetIdBancoCuentaBancariaActualCompany(target.value));

        // Se obtiene el name de Banco
        const nameBanco = bancos.find(banco => banco.id === parseInt(target.value)).banco;
        dispatch(SetNameBancoCuentaBancariaActualCompany(nameBanco));
    };

    const handleChangeMoneda = ({ target }) => {

        // Se cambia el valor de idBanco
        dispatch(SetIdMonedaCuentaBancariaActualCompany(target.value));

        // Se obtiene el name de Banco
        const nameMoneda = monedas.find(banco => banco.codMoneda === parseInt(target.value)).monedaNombre;
        dispatch(SetNameMonedaCuentaBancariaActualCompany(nameMoneda));
    };

    return (

        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Número</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaWallet className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder='Número de Cuenta Bancaria'
                            type='number'
                            name='numero'
                            disabled={disableInputs}
                            value={numero}
                            onChange={e => handleInputChangeWithDispatch(e, SetNumeroCuentaBancariaActualCompany)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Banco</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPiggyBank className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            disabled={disableInputs}
                            value={idBanco}
                            onChange={e => handleChangeBanco(e)}
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

                <div className="col-md-3 mb-3">
                    <h5>Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <select
                            className='form-select'
                            name='idMoneda'
                            disabled={disableInputs}
                            value={idMoneda}
                            onChange={e => handleChangeMoneda(e)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (monedas.length !== 0)
                                    ? monedas.map(moneda => {
                                        return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                                    })
                                    : <option value=''>No Monedas</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    {(isCuentaBancariaEdit)
                        ?
                        <>
                            <button
                                className={(disableInputs) ? 'btn btn-warning disabled' : 'btn btn-warning'}
                                onClick={handleEditCuentaBancaria}

                            >
                                Editar <TbEditCircle className="iconSize" />
                            </button>
                        </>
                        :

                        <>
                            <button
                                className={(disableInputs) ? 'btn btn-success disabled' : 'btn btn-success'}
                                onClick={handleAddCuentaBancaria}
                            >
                                Agregar <FaCirclePlus className="iconSize" />
                            </button>
                        </>
                    }
                </div>

            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <CompanyBodyCuentasBancariasTable columns={columns} data={cuentasBancarias} />
                </div>
            </div>
        </>

    )
}