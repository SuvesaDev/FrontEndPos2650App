import { FaCalendar, FaCoins, FaHashtag, FaMoneyBill, FaUser, FaWallet } from "react-icons/fa"
import { FaColonSign } from "react-icons/fa6"
import { TbNotes, TbNumber } from "react-icons/tb"


export const CollectAdjustmentBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-8 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos del Cliente</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Código del Cliente"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-8 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del Cliente"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-md-6 mb-3">
                                    <h5>Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select className="form-select">
                                            <option value='COLON'>COLON</option>
                                            <option value='DOLAR'>DOLAR</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
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
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <h5>Tipo de Ajuste</h5>
                                    <div className="inline-containerCenter">
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioContado"
                                                class="form-check-input checkP"
                                            />
                                            <h5 className="form-check-label" for="radioContado">Nota Crédito</h5>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioCrédito"
                                                class="form-check-input checkP"
                                            />
                                            <h5 className="form-check-label" for="radioCrédito">Nota Débito</h5>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
