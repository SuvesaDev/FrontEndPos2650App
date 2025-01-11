
import { FaMoneyBill } from "react-icons/fa"
import { FaColonSign } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"

export const CollectAdjustmentTable = () => {
    return (

        <>

            <div className="table-responsive-md tablaP">
                <table
                    className="table table-dark table-hover table-bordered text-md-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Factura</th>
                            <th>Monto Factura</th>
                            <th>Saldo Anterior</th>
                            <th>Abono</th>
                            <th>Saldo Actual</th>
                            <th>Cuenta Contable</th>
                        </tr>
                    </thead>
                    <tbody className="table-secondary">
                        <tr>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="row mb-2 text-center">
                <div className="col-md-6 mb-2">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="5"
                            name="observaciones"
                        ></textarea>
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
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Total Saldo Anterior"
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
                                            value="Total Monto de Recibido"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Saldo Actual</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Total Saldo Actual"
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
