import { useDispatch, useSelector } from "react-redux";
import {
    ActiveCredito,
    SetAbiertoCustomers,
    SetClienteMorosoCustomers,
    SetCodMonenaCreditoCustomers,
    SetDescuentoCustomers,
    SetEmpresaCustomers,
    SetMaxCreditoCustomers,
    SetOrdenCompraCustomers,
    SetPlazoCreditoCustomers,
    SetSinRestriccionCustomers,
} from "../../../actions/customers";
import { MdCreditScore } from "react-icons/md";
import { FaCoins, FaDollarSign, FaMoneyBill, FaPercentage } from "react-icons/fa";
import { FaCalendarDays, FaColonSign } from "react-icons/fa6";
import { TbAdjustmentsDollar } from "react-icons/tb";

export const CustomersBodyCreditoDescuento = () => {

    const dispatch = useDispatch();

    const { activeCredito, customer, disableInputs } = useSelector(
        (state) => state.customers
    );

    const {
        abierto,
        codMonedaCredito,
        plazoCredito,
        maxCredito,
        descuento,
        empresa,
        sinrestriccion,
        clienteMoroso,
        ordenCompra,
    } = customer;

    const { auth } = useSelector((state) => state.login);
    const { costaPets } = auth;

    const handleActiveCredito = (e) => {
        dispatch(ActiveCredito(!activeCredito));
    };

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    return (
        <>
            <div className="card">
                <div className="card-body">

                    <div className="row mb-0">

                        <div className="col-md-4 mb-0"></div>

                        <div className={costaPets ? 'col-md-4 mb-2 d-none' : 'col-md-4 mb-2'}>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkActivarCre"
                                    name="activeCredito"
                                    disabled={disableInputs}
                                    onChange={handleActiveCredito}
                                    checked={activeCredito}
                                    class="form-check-input checkP"
                                />
                                <h5 className="form-check-label" for="checkActivarCre">
                                    ¿Activar Crédito?
                                </h5>
                            </div>
                            <hr />
                        </div>

                        <div className="col-md-4 mb-0"></div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-2 mb-3">
                            <h5>Crédito</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <MdCreditScore className="iconSize" />
                                </span>
                                <select
                                    name="abierto"
                                    className="form-select"
                                    disabled={ (costaPets) ? disableInputs : !activeCredito}
                                    value={abierto ? "1" : "0"}
                                    onChange={(e) =>
                                        handleInputChangeWithDispatch(e, SetAbiertoCustomers)
                                    }
                                >
                                    <option value="0">NO</option>
                                    <option value="1">SI</option>
                                </select>
                            </div>
                        </div>

                        <div className={ costaPets ? 'col-md-2 mb-3 d-none' : 'col-md-2 mb-3' }>
                            <h5>Mondeda Crédito</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCoins className="iconSize" />
                                </span>
                                <select
                                    name="codMonedaCredito"
                                    className="form-select"
                                    disabled={!activeCredito}
                                    value={codMonedaCredito}
                                    onChange={(e) =>
                                        handleInputChangeWithDispatch(e, SetCodMonenaCreditoCustomers)
                                    }
                                >
                                    <option value="1">COLON</option>
                                    <option value="2">DOLAR</option>
                                </select>
                            </div>

                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Plazo Crédito (Días)</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendarDays className="iconSize" />
                                </span>
                                <input
                                    type="number"
                                    name="plazoCredito"
                                    className="form-control"
                                    placeholder="Cantidad de Días"
                                    disabled={ (costaPets) ? disableInputs : !activeCredito}
                                    value={plazoCredito}
                                    onChange={(e) =>
                                        handleInputChangeWithDispatch(e, SetPlazoCreditoCustomers)
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5>Límite de Crédito</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaMoneyBill className="iconSize" />
                                </span>
                                <input
                                    type="number"
                                    name="maxCredito"
                                    className="form-control"
                                    placeholder="Crédito Máximo"
                                    disabled={ (costaPets) ? disableInputs : !activeCredito}
                                    value={maxCredito}
                                    onChange={(e) =>
                                        handleInputChangeWithDispatch(e, SetMaxCreditoCustomers)
                                    }
                                />

                                {
                                    codMonedaCredito === 1 ? (
                                        <>
                                            <span className="input-group-text">
                                                <FaColonSign className="iconSize" />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                disabled
                                                value={new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(maxCredito)}
                                            />
                                        </>
                                    ) : codMonedaCredito === 2 ? (
                                        <>
                                            <span className="input-group-text">
                                                <FaDollarSign className="iconSize" />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                disabled
                                                value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(maxCredito)}
                                            />
                                        </>
                                    ) : null
                                }

                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Límite Descuento %</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    type="number"
                                    name="descuento"
                                    className="form-control"
                                    placeholder="Descuento Máximo"
                                    disabled={ (costaPets) ? disableInputs : !activeCredito}
                                    value={descuento}
                                    onChange={(e) =>
                                        handleInputChangeWithDispatch(e, SetDescuentoCustomers)
                                    }
                                />
                            </div>
                        </div>

                    </div>

                    <div className="row mb-2">
                        <div className="col-md-2 mb-0"></div>
                        <div className={ costaPets ? 'col-md-4 mb-3 d-none' : 'col-md-4 mb-3' }>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkEmpresaCustomersB"
                                    name="empresa"
                                    class="form-check-input checkP"
                                    disabled={!activeCredito}
                                    checked={empresa}
                                    onChange={(e) =>
                                        handleInputChangeCheckBoxWithDispatch(
                                            e,
                                            SetEmpresaCustomers
                                        )
                                    }
                                />
                                <h5 className="form-check-label" for="checkEmpresaCustomersB">Empresa, Asociación, Compañia...</h5>
                            </div>
                            <hr />
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkPermitirCustomersB"
                                    name="sinrestriccion"
                                    class="form-check-input checkP"
                                    disabled={ (costaPets) ? disableInputs : !activeCredito}
                                    checked={sinrestriccion}
                                    onChange={(e) =>
                                        handleInputChangeCheckBoxWithDispatch(
                                            e,
                                            SetSinRestriccionCustomers
                                        )
                                    }
                                />
                                <h5 className="form-check-label" for="checkPermitirCustomersB">Permitir la venta sin restriccion de cuenta</h5>
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-2 mb-0"></div>
                    </div>

                    <div className={ costaPets ? 'row mb-0 d-none' : 'row mb-0' }>
                        <div className="col-md-2 mb-3"></div>
                        <div className="col-md-4 mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkmorosoCustomersB"
                                    name="clienteMoroso"
                                    class="form-check-input checkP"
                                    disabled={!activeCredito}
                                    checked={clienteMoroso}
                                    onChange={(e) =>
                                        handleInputChangeCheckBoxWithDispatch(
                                            e,
                                            SetClienteMorosoCustomers
                                        )
                                    }
                                />
                                <h5 className="form-check-label textRed" for="checkmorosoCustomersB">Cliente en estado moroso</h5>
                            </div>
                            <hr />
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkordenCompraCustomersB"
                                    name="ordenCompra"
                                    class="form-check-input checkP"

                                    disabled={!activeCredito}
                                    checked={ordenCompra}
                                    onChange={(e) =>
                                        handleInputChangeCheckBoxWithDispatch(
                                            e,
                                            SetOrdenCompraCustomers
                                        )
                                    }
                                />
                                <h5 className="form-check-label textRed" for="checkordenCompraCustomersB">Obligar Orden de Compra</h5>
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-2 mb-3"></div>
                    </div>

                </div>
            </div>

        </>
    );
};
