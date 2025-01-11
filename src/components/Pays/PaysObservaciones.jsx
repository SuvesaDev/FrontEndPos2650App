import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoneyBill } from "react-icons/fa"
import { FaColonSign, FaDollarSign } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"
import { SetObservacionesAbonoPays } from '../../actions/pays';

export const PaysObservaciones = () => {

    const dispatch = useDispatch();

    const {
        disableInputs,
        moneda,
        observaciones,
        totalSaldoAnterior,
        totalMontoRecibido,
        totalSaldoActual,
    } = useSelector(state => state.pays);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const validateCurrency = (value) => {
        if (moneda == 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda == 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    }

    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-4 mb-2">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            disabled={disableInputs}
                            class="form-control"
                            rows="5"
                            name="observaciones"
                            placeholder='Anotaciones...'
                            value={observaciones}
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetObservacionesAbonoPays)
                            }
                        ></textarea>
                    </div>
                </div>
                <div className="col-md-8 mb-2">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Saldos de la cuenta</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb- text-center">
                                <div className="col-md-4 mb-2">
                                    <h5>Saldo Anterior</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            {moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                            }
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Total Saldo Anterior"
                                            disabled={true}
                                            value={validateCurrency(totalSaldoAnterior)}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-4 mb-2">
                                    <h5>Monto Recibido</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Total Monto de Recibido"
                                            disabled={true}
                                            value={validateCurrency(totalMontoRecibido)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Saldo Actual</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            {moneda == 1 ?
                                                <FaColonSign className="iconSize" />
                                                : moneda == 2 ?
                                                    <FaDollarSign className="iconSize" />
                                                    :
                                                    <FaColonSign className="iconSize" />
                                            }
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Total Saldo Actual"
                                            disabled={true}
                                            value={validateCurrency(totalSaldoActual)}
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
