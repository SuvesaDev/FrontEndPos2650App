import { useDispatch, useSelector } from "react-redux";

import { FaCalendarDay, FaCoins, FaUser } from "react-icons/fa";

import { 
    SetCantidadDiasOrdenCompra,
    SetFechaEntregaOrdenCompra, 
    SetFormaPagoContadoOrdenCompra, 
    SetFormaPagoCreditoOrdenCompra, 
    SetMonedaOrdenCompra, 
    SetNombreEntregaOrdenCompra 
} from "../../actions/ordenCompraAction";

export const PurchaseOrderBodyOpciones = () => {

    const dispatch = useDispatch();
    
    const { monedasInventory } = useSelector(state => state.monedas);
    const { DisableInputs, ordenCompra } = useSelector((state) => state.ordenCompra);
    const { 
        fechaEntrega,
        nombreEntrega,
        moneda,
        formaPagoContado,
        formaPagoCredito,
        cantidadDias 
    } = ordenCompra;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeContado = () => {
        dispatch(SetFormaPagoContadoOrdenCompra(true));
        dispatch(SetFormaPagoCreditoOrdenCompra(false));
    };

    const handleChangeCredito = () => {
        dispatch(SetFormaPagoCreditoOrdenCompra(true));
        dispatch(SetFormaPagoContadoOrdenCompra(false));
    };

    return (
        <>

            <div className="row mb-3 text-center">

                <div className="col-md-12 mb-3">

                    <div className="card">

                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Opciones de Orden</h4>
                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-3 mb-3">
                                    <h5>Fecha Entrega</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            type='date'
                                            className='form-control'
                                            placeholder='Cantidad de Días'
                                            disabled={DisableInputs}
                                            value={fechaEntrega}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetFechaEntregaOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Nombre de Persona a Entregar'
                                            disabled={DisableInputs}
                                            value={nombreEntrega}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetNombreEntregaOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select
                                            name='monedaPurchaseOrden'
                                            className="form-select"
                                            disabled={DisableInputs}
                                            value={moneda}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetMonedaOrdenCompra)
                                            }
                                        >
                                            <option value={0} selected disabled hidden> Seleccione... </option>
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

                                <div className="col-md-3 mb-3">
                                    <h5>Forma de Pago</h5>

                                    <div className="inline-containerCenter">
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioContado"
                                                class="form-check-input checkP"
                                                disabled={DisableInputs}
                                                checked={formaPagoContado}
                                                onClick={handleChangeContado}
                                            />
                                            <h5 className="form-check-label" for="radioContado">Contado</h5>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioCrédito"
                                                class="form-check-input checkP"
                                                disabled={DisableInputs}
                                                checked={formaPagoCredito}
                                                onClick={handleChangeCredito}
                                            />
                                            <h5 className="form-check-label" for="radioCrédito">Crédito</h5>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className={ (formaPagoCredito ? 'row justify-content-end' : 'row justify-content-end d-none') }>
                                <div className="col-md-3 mb-3">
                                    <h5>Días</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Cantidad de Días'
                                            disabled={DisableInputs}
                                            value={cantidadDias}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetCantidadDiasOrdenCompra)
                                            }
                                        />
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
