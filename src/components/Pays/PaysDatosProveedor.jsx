

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendar, FaCoins, FaExchangeAlt, FaHashtag, FaHornbill, FaPercentage, FaSearch, FaUser } from 'react-icons/fa';
import { TbNumber } from 'react-icons/tb';
import { SetMonedaAbonoDetallePays, SetMonedaAbonoPays, SetNumeroReciboPays, startAllProveedoresFacturasPays, startGetAllBancosPays } from '../../actions/pays';

export const PaysDatosProveedor = () => {
    const dispatch = useDispatch();

    const { disableInputs, abonoActual, numeroRecibo, cedulaProveedor,
        nombreProveedor, fecha, moneda } = useSelector(state => state.pays);

    const { monedasInventory } = useSelector(state => state.monedas);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const fechaSinTiempo = fecha.split("T")[0];

    const handleGetFacturasCompras = () => {
        dispatch(startAllProveedoresFacturasPays());
        dispatch(startGetAllBancosPays());
    };

    const handleInputDuobleChangeWithDispatch = ({ target }, action1, action2) => {
        dispatch(action1(target.value));
        dispatch(action2(target.value));
    };

    return (

        <>
            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de Proveedor y Facturación</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">

                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Código del Proveedor'
                                            disabled={true}
                                            value={cedulaProveedor}
                                        />
                                        <button
                                            type="button"
                                            className={
                                                (disableInputs)
                                                    ? 'btn btn-primary disabled'
                                                    : 'btn btn-primary'
                                            }
                                            onClick={handleGetFacturasCompras}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalBuscarProveedoresD"
                                        >
                                            <FaSearch className="iconSize" />
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
                                            className="form-control"
                                            placeholder='Nombre del Proveedor'
                                            disabled={true}
                                            value={nombreProveedor}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Recibo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Número de Recibo'
                                            disabled={disableInputs}
                                            value={numeroRecibo}
                                            onChange={(e) => handleInputChangeWithDispatch(e, SetNumeroReciboPays)}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-2 mb-3">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            disabled={true}
                                            value={fechaSinTiempo}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-2 mb-3">
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
                                                handleInputDuobleChangeWithDispatch(e, SetMonedaAbonoPays, SetMonedaAbonoDetallePays)
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
                                                    : (moneda) ?
                                                        <option value={moneda}>{moneda}</option>
                                                        : (
                                                            <option value=''>Sin Monedas</option>
                                                        )
                                            }
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="col-md-2 mb-3">
                                    <h5>Tipo Cambio</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaExchangeAlt className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Tipo de Cambio'
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
