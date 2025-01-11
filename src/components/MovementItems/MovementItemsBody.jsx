import { FaCalendar, FaHashtag, FaMoneyBill, FaPrint } from "react-icons/fa"
import { FaShop } from "react-icons/fa6"
import { GiWallet } from "react-icons/gi"
import { TbNotes } from "react-icons/tb"

export const MovementItemsBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Código del Artículo'
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Descripción del Artículo'
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Fecha Desde</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type='date'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Fecha Hasta</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type='date'
                            className='form-control'
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-1 mb-2"></div>
                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-dark">Compras <FaShop className="iconSize" /></button>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-dark">Ventas <FaMoneyBill className="iconSize" /></button>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-dark">Imprimir <FaPrint className="iconSize" /></button>
                </div>
                <div className="col-md-1 mb-2"></div>
            </div>

            <hr />
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <h4>Compras</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                    <th>Proveedor</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
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
                </div>
                <div className="card-footer bg-primary">
                    <div className='inline-containerFinal'>
                        <h5 className='tituloFooter'>Total Comprado</h5>
                        <div className="col-md-2 mb-0">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <GiWallet className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total de Compras"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <h4>Ventas</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                    <th>Proveedor</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
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
                </div>
                <div className="card-footer bg-primary">
                    <div className='inline-containerFinal'>
                        <h5 className='tituloFooter'>Total Vendido</h5>
                        <div className="col-md-2 mb-0">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <GiWallet className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total de Ventas"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
