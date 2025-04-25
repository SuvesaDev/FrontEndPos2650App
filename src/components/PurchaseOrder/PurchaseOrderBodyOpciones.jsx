import { useDispatch, useSelector } from "react-redux";

import { FaCalendarDay, FaCoins, FaUser } from "react-icons/fa"

export const PurchaseOrderBodyOpciones = () => {

    const dispatch = useDispatch();
    
    const { DisableInputs } = useSelector((state) => state.ordenCompra);

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
                                    <h5>Entrega</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Cantidad de Días'
                                            disabled={DisableInputs}
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
                                        >
                                            <option value="COLON">COLON</option>
                                            <option value="DOLAR">DOLAR</option>
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
                                            />
                                            <h5 className="form-check-label" for="radioContado">Contado</h5>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioCrédito"
                                                class="form-check-input checkP"
                                                disabled={DisableInputs}
                                            />
                                            <h5 className="form-check-label" for="radioCrédito">Crédito</h5>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="row justify-content-end d-none">
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
