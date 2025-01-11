import { FaCalendar, FaMoneyBill, FaWallet } from "react-icons/fa"
import { FaColonSign } from "react-icons/fa6"
import { TbNotes, TbNumber } from "react-icons/tb"

export const PaysAdjustmentBody = () => {
    return (

        <>
            <div className='row mb-2 text-center'>
                <div className='col-md-4 mb-2'>
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Facturas Pendiente de Pago</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-0">
                                <div className="table-responsive-md tablaP">
                                    <table className="table table-hover text-md-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Factura</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-white">
                                            <tr>
                                                <td>Test</td>
                                                <td>Test</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-md-8 mb-2'>
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4>Datos de la Factura</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-md-3 mb-2">
                                    <h5>Factura</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNumber className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Número de Factura'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Monto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Monto de la Factura'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Saldo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Total de Saldo'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-md-3 mb-2">
                                    <h5>Ajuste </h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Ajuste de la Factura'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Saldo Actual</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Saldo Actual de la Factura'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Cuenta contable</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaWallet className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Cuenta Contable de la Factura'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Descripción de la Factura'
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-0 text-center" >
                                <div className="col-md-12 mb-2">
                                    <div className="table-responsive-md tablaP">
                                        <table
                                            className="table table-dark table-hover table-bordered text-md-center">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Factura</th>
                                                    <th>Monto Factura</th>
                                                    <th>Saldo Anterior</th>
                                                    <th>Ajuste</th>
                                                    <th>Saldo Actual</th>
                                                    <th>Grid</th>
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
                                                    <td>Test</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
