
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaBuilding, FaFileAlt, FaPiggyBank, FaWallet } from "react-icons/fa"
import { FaMoneyBill } from "react-icons/fa6"
import { SetBancoPays, SetCentroPagoPays, SetCuentaBancoPays, SetNumeroCuentaProveedorPays, SetNumeroDocumentoPays, SetTipoPagoPays, startGetAllCuentasPays } from '../../../actions/pays';

export const PaysBodyDatosAbono = () => {
    const dispatch = useDispatch();

    const { disableInputs, banco, cuentaBanco, centroPago, cuentaProveedor, tipoPago, bancos, disableInputCuenta, cuentas, numeroDocumento, cuentasProveedor } = useSelector(state => state.pays);
    const { auth } = useSelector(state => state.login);
    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
        dispatch(SetCentroPagoPays(auth.centro));
    };

    const handleInputChangeWithDispatchCuentas = ({ target }, action) => {
        dispatch(action(target.value));
        dispatch(startGetAllCuentasPays(target.value, 1))
        dispatch(SetCentroPagoPays(auth.centro));
    };



    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Origen de la Forma de Pago</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-md-4 mb-2">
                                    <h5>Banco</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPiggyBank className="iconSize" />
                                        </span>
                                        <select
                                            className='form-select'
                                            disabled={disableInputs}
                                            value={banco}
                                            onChange={e => handleInputChangeWithDispatchCuentas(e, SetBancoPays)}
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
                                            value={cuentaBanco}
                                            onChange={e => handleInputChangeWithDispatch(e, SetCuentaBancoPays)}
                                        >
                                            <option value={''} selected disabled hidden> Seleccione... </option>
                                            {
                                                (cuentas.length !== 0)
                                                    ? cuentas.map(cuenta => {
                                                        return <option key={cuenta.id} value={cuenta.numero}> {cuenta.numero} </option>
                                                    })
                                                    :
                                                    (cuentaBanco) ?
                                                        <option value={cuentaBanco}>{cuentaBanco}</option>
                                                        : (
                                                            <option value=''>Sin Cuentas</option>
                                                        )
                                            }
                                        </select>

                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Centro Pago</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBuilding className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            disabled={true}
                                            value={auth.centro}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className="row mb-2 text-center">
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Forma de Pago a Proveedor</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-md-4 mb-2">
                                    <h5>Tipo pago</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill className="iconSize" />
                                        </span>
                                        <select
                                            className="form-select"
                                            disabled={disableInputs}
                                            value={tipoPago}
                                            onChange={e => handleInputChangeWithDispatch(e, SetTipoPagoPays)}
                                        >
                                            <option value={''} selected disabled hidden> Seleccione... </option>
                                            <option value='CHEQUE'>CHEQUE</option>
                                            <option value='TRANSFERENCIA'>TRANSFERENCIA</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Documento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaFileAlt className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Número de Documento"
                                            value={numeroDocumento}
                                            disabled={disableInputs}
                                            onChange={e => handleInputChangeWithDispatch(e, SetNumeroDocumentoPays)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Cuenta Destino</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaWallet className="iconSize" />
                                        </span>
                                        <select
                                            className='form-select'
                                            disabled={disableInputs}
                                            value={cuentaProveedor}
                                            onChange={e => handleInputChangeWithDispatch(e, SetNumeroCuentaProveedorPays)}
                                        >
                                            <option value={''} selected disabled hidden> Seleccione... </option>
                                            {
                                                (cuentasProveedor.length !== 0)
                                                    ? cuentasProveedor.map(cuentaP => {
                                                        return <option key={cuentaP.idCuenta} value={cuentaP.numCuenta}> {cuentaP.numCuenta} </option>
                                                    })
                                                    :
                                                    (cuentaProveedor) ?
                                                    <option value={cuentaProveedor}>{cuentaProveedor}</option>
                                                    : (
                                                        <option value=''>Sin Cuentas</option>
                                                    )
                                            }

                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
