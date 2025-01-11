import { FaCoins, FaExchangeAlt, FaEye, FaHashtag, FaListOl, FaWallet } from "react-icons/fa"
import { FaCirclePlus, FaSignsPost } from "react-icons/fa6"

export const CoisnBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Código de la Moneda"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Nombre Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Nombre de la Moneda"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Valor de Compra</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaExchangeAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Valor de Compra de la Moneda"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Valor de Venta</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaExchangeAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Valor de Venta de la Moneda"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-1 mb-3"></div>
                <div className="col-md-3 mb-3">
                    <h5>Simbolo</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSignsPost className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Simbolo de la Moneda"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Cuenta Contable</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaWallet className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Cuenta Contable de la Moneda"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-success">Agregar <FaCirclePlus className="iconSize" /></button>
                </div>
                <div className="col-md-1 mb-3"></div>
            </div>

            <div className="row mb-0 text-center" >
                <div className="col-md-12 mb-0">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>

                                    <th>Nombre Moneda</th>
                                    <th>Valor Compra</th>
                                    <th>Valor Venta</th>
                                    <th>Simbolo</th>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}
