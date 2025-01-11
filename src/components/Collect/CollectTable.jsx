import { FaMoneyBill, FaMoneyBillWave } from "react-icons/fa"
import { FaColonSign, FaDollarSign } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux";
import { CollectTablePrincipal } from "./CollectTablePrincipal";

import { SetObservacionesAbonoCollect } from "../../actions/CollectAction";

export const CollectTable = () => {

    const dispatch = useDispatch();

    const {
        disableInputs,
        abonos,
        abono
    } = useSelector(state => state.collect);

    const {
        observaciones,
        totalSaldoAnterior,
        totalMontoRecibido,
        totalSaldoActual,
        moneda,
        saldoActual
    } = abono;


    const validateCurrency = (value) => {
        if (moneda == 1) {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        } else if (moneda == 2) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        } else {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
        }
    }
    const columns = [
        {
            Header: "Número Factura",
            accessor: "idFactura",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
        },
        {
            Header: "Monto Factura",
            accessor: "monto",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Saldo Anterior",
            accessor: "saldo_Ant",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Intereses",
            accessor: "intereses",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
        {
            Header: "Abono",
            accessor: "abono",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },

        {
            Header: "Saldo Actual",
            accessor: "saldo",
            Cell: ({ value }) => value ? validateCurrency(value) : validateCurrency(0),
        },
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    return (

        <>
            <div className="row mb-2 text-center">
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <CollectTablePrincipal columns={columns} data={abonos} />
                    </div>
                </div>
            </div>

            <hr />

            <div className="row mb-2 text-center">

                <div className="col-md-6 mb-2">
                    <div className="row">

                        <div className="col-md-12 mb-3">
                            <h5>Observaciones</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <TbNotes className="iconSize" />
                                </span>
                                <textarea
                                    class="form-control"
                                    rows="1"
                                    name="observaciones"
                                    disabled={disableInputs}
                                    value={observaciones}
                                    onChange={e => handleInputChangeWithDispatch(e, SetObservacionesAbonoCollect)}
                                ></textarea>
                            </div>
                        </div>
                        {/* 
                        <div className="col-md-4 mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkCheque"
                                    class="form-check-input checkP"
                                    disabled={ disableInputs }
                                />
                                <h5 className="form-check-label" for="checkCheque">Cheque</h5>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaMoneyBillWave className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número Cheque"
                                    disabled={ disableInputs }
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Tipo Cheque</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaMoneyBillWave className="iconSize" />
                                </span>
                                <select
                                    name="tipoPrecio"
                                    className="form-select"
                                    disabled={ disableInputs }
                                >
                                    <option value='1'>Cheque 1</option>
                                    <option value='2'>Cheque 2</option>
                                </select>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="col-md-6 mb-2">
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
                                            disabled={true}
                                            value={validateCurrency(totalSaldoAnterior)}
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
                                            disabled={true}
                                            value={saldoActual ? validateCurrency(saldoActual) : validateCurrency(0)}
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
                                            disabled={true}
                                            value={totalMontoRecibido ? validateCurrency(totalMontoRecibido) : validateCurrency(0)}
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
